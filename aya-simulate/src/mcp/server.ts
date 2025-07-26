import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  CallToolResult,
  Tool,
} from '@modelcontextprotocol/sdk/types.js';
import { SimulateRequestSchema, SimulationResult, SimulationError } from '../types/index.js';
import { performEthCall } from '../utils/ethCall.js';
import { getSupportedChainIds, getChainConfig } from '../config/chains.js';
import { logger } from '../utils/logger.js';

export class AyaSimulateMCPServer {
  private server: Server;

  constructor() {
    this.server = new Server(
      {
        name: 'aya-simulate',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();
    this.setupErrorHandling();
  }

  private setupToolHandlers(): void {
    // Register the simulate tool
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'simulate',
            description: 'Simulates an Ethereum transaction to check if it would succeed, estimate gas, and decode any revert reasons',
            inputSchema: {
              type: 'object',
              properties: {
                to: {
                  type: 'string',
                  pattern: '^0x[a-fA-F0-9]{40}$',
                  description: 'The contract address to call',
                },
                data: {
                  type: 'string',
                  pattern: '^0x[a-fA-F0-9]*$',
                  description: 'The encoded function call data',
                },
                from: {
                  type: 'string',
                  pattern: '^0x[a-fA-F0-9]{40}$',
                  description: 'The address to simulate the call from (optional)',
                },
                value: {
                  type: 'string',
                  pattern: '^0x[a-fA-F0-9]*$',
                  description: 'The amount of ETH to send with the transaction (optional)',
                },
                chainId: {
                  type: 'string',
                  enum: getSupportedChainIds(),
                  default: '1',
                  description: 'The chain ID to simulate on',
                },
                blockNumber: {
                  type: 'string',
                  description: 'The block number to simulate at (optional, defaults to latest)',
                },
              },
              required: ['to', 'data'],
            },
          },
          {
            name: 'describe',
            description: 'Returns information about the AyaSimulate tool and supported chains',
            inputSchema: {
              type: 'object',
              properties: {},
            },
          },
        ],
      };
    });

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'simulate':
            return await this.handleSimulate(args);
          case 'describe':
            return await this.handleDescribe();
          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error: any) {
        logger.error(`Tool call failed: ${name}`, { error: error.message, args });
        throw error;
      }
    });
  }

  private async handleSimulate(args: any): Promise<CallToolResult> {
    try {
      // Validate the request
      const validatedRequest = SimulateRequestSchema.parse(args);
      
      logger.info('Processing simulation request', {
        to: validatedRequest.to,
        chainId: validatedRequest.chainId,
        from: validatedRequest.from,
      });

      // Perform the simulation
      const result = await performEthCall(validatedRequest);

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
        isError: false,
      };
    } catch (error: any) {
      logger.error('Simulation failed', { error: error.message, args });
      
      if (error instanceof SimulationError) {
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                status: 'error',
                wouldSucceed: false,
                reason: error.message,
                code: error.code,
                data: error.data,
              }, null, 2),
            },
          ],
          isError: true,
        };
      }

      throw error;
    }
  }

  private async handleDescribe(): Promise<CallToolResult> {
    const supportedChains = getSupportedChainIds();
    
    const description = {
      name: 'AyaSimulate',
      version: '1.0.0',
      description: 'Transaction Simulation Tool for DeFi-Aware AI Agents',
      capabilities: [
        'Simulate EVM-compatible transactions',
        'Estimate gas costs',
        'Decode revert reasons',
        'Multi-chain support',
        'Safe dry-run execution',
      ],
      supportedChains: supportedChains.map(chainId => {
        const config = getChainConfig(chainId);
        return {
          id: chainId,
          name: config.name,
          nativeCurrency: config.nativeCurrency,
        };
      }),
      methods: [
        {
          name: 'simulate',
          description: 'Simulates a transaction and returns success/failure status, gas estimate, and decoded results',
          parameters: [
            'to: Contract address (required)',
            'data: Encoded function call (required)',
            'from: Sender address (optional)',
            'value: ETH amount (optional)',
            'chainId: Target chain (optional, default: 1)',
            'blockNumber: Block to simulate at (optional)',
          ],
        },
      ],
      examples: [
        {
          description: 'Simulate a Uniswap token swap',
          request: {
            method: 'simulate',
            params: {
              to: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
              data: '0x38ed1739000000000000000000000000000000000000000000000000016345785d8a0000...',
              from: '0x742d35Cc6634C0532925a3b8D0c9e3d4a0b3c8f3',
              chainId: '1',
            },
          },
        },
        {
          description: 'Simulate an ERC20 token approval',
          request: {
            method: 'simulate',
            params: {
              to: '0xA0b86a33E6441c41b8b7C8A7F4d5A6b8d9c9e3d4',
              data: '0x095ea7b3000000000000000000000000742d35cc6634c0532925a3b8d0c9e3d4a0b3c8f3...',
              from: '0x742d35Cc6634C0532925a3b8D0c9e3d4a0b3c8f3',
              chainId: '1',
            },
          },
        },
      ],
    };

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(description, null, 2),
        },
      ],
      isError: false,
    };
  }

  private setupErrorHandling(): void {
    this.server.onerror = (error) => {
      logger.error('MCP Server error', { error: error.message });
    };

    process.on('SIGINT', async () => {
      logger.info('Shutting down MCP server...');
      await this.server.close();
      process.exit(0);
    });
  }

  public async start(): Promise<void> {
    const transport = process.env.MCP_TRANSPORT || 'stdio';
    
    if (transport === 'stdio') {
      const { StdioServerTransport } = await import('@modelcontextprotocol/sdk/server/stdio.js');
      const transport = new StdioServerTransport();
      await this.server.connect(transport);
      logger.info('AyaSimulate MCP server started with stdio transport');
    } else {
      throw new Error(`Unsupported transport: ${transport}`);
    }
  }

  public async stop(): Promise<void> {
    await this.server.close();
    logger.info('AyaSimulate MCP server stopped');
  }
}