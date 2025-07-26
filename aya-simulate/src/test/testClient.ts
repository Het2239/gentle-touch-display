#!/usr/bin/env node

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { logger } from '../utils/logger.js';
import { getExampleByName, SIMULATION_EXAMPLES } from '../examples/simulationExamples.js';

class AyaSimulateTestClient {
  private client: Client;
  private transport: StdioClientTransport;

  constructor() {
    // Create transport and client
    this.transport = new StdioClientTransport({
      command: 'node',
      args: ['dist/server.js'],
    });

    this.client = new Client(
      {
        name: 'aya-simulate-test-client',
        version: '1.0.0',
      },
      {
        capabilities: {},
      }
    );
  }

  async connect(): Promise<void> {
    await this.client.connect(this.transport);
    logger.info('Test client connected to AyaSimulate MCP server');
  }

  async disconnect(): Promise<void> {
    await this.client.close();
    logger.info('Test client disconnected');
  }

  async testDescribe(): Promise<any> {
    logger.info('Testing describe tool...');
    
    try {
      const result = await this.client.callTool({
        name: 'describe',
        arguments: {},
      });

      logger.info('Describe tool response:', { result: (result.content as any)[0] });
      return result;
    } catch (error: any) {
      logger.error('Describe tool failed:', { error: error.message });
      throw error;
    }
  }

  async testSimulation(exampleName: keyof typeof SIMULATION_EXAMPLES): Promise<any> {
    logger.info(`Testing simulation: ${exampleName}...`);
    
    try {
      const request = getExampleByName(exampleName);
      
      const result = await this.client.callTool({
        name: 'simulate',
        arguments: request,
      });

      logger.info(`Simulation result for ${exampleName}:`, { 
        result: JSON.parse((result.content as any)[0].text) 
      });
      return result;
    } catch (error: any) {
      logger.error(`Simulation ${exampleName} failed:`, { error: error.message });
      throw error;
    }
  }

  async testAllSimulations(): Promise<void> {
    logger.info('Testing all simulation examples...');
    
    const results: Record<string, any> = {};
    
    for (const exampleName of Object.keys(SIMULATION_EXAMPLES) as Array<keyof typeof SIMULATION_EXAMPLES>) {
      try {
        results[exampleName] = await this.testSimulation(exampleName);
        logger.info(`✅ ${exampleName} completed`);
      } catch (error: any) {
        logger.error(`❌ ${exampleName} failed:`, { error: error.message });
        results[exampleName] = { error: error.message };
      }
    }
    
    logger.info('All simulation tests completed:', { results });
  }

  async testListTools(): Promise<any> {
    logger.info('Testing list tools...');
    
    try {
      const tools = await this.client.listTools();
      logger.info('Available tools:', { tools });
      return tools;
    } catch (error: any) {
      logger.error('List tools failed:', { error: error.message });
      throw error;
    }
  }

  async runFullTest(): Promise<void> {
    logger.info('Starting full test suite...');
    
    try {
      await this.connect();
      
      // Test 1: List available tools
      await this.testListTools();
      
      // Test 2: Test describe tool
      await this.testDescribe();
      
      // Test 3: Test individual simulations
      await this.testAllSimulations();
      
      logger.info('✅ All tests completed successfully');
    } catch (error: any) {
      logger.error('❌ Test suite failed:', { error: error.message });
      throw error;
    } finally {
      await this.disconnect();
    }
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'full';
  
  const testClient = new AyaSimulateTestClient();
  
  try {
    switch (command) {
      case 'describe':
        await testClient.connect();
        await testClient.testDescribe();
        await testClient.disconnect();
        break;
        
      case 'simulate':
        const exampleName = args[1] as keyof typeof SIMULATION_EXAMPLES;
        if (!exampleName || !SIMULATION_EXAMPLES[exampleName]) {
          console.error('Please provide a valid example name:', Object.keys(SIMULATION_EXAMPLES));
          process.exit(1);
        }
        await testClient.connect();
        await testClient.testSimulation(exampleName);
        await testClient.disconnect();
        break;
        
      case 'tools':
        await testClient.connect();
        await testClient.testListTools();
        await testClient.disconnect();
        break;
        
      case 'full':
      default:
        await testClient.runFullTest();
        break;
    }
  } catch (error: any) {
    logger.error('Test execution failed:', { error: error.message });
    process.exit(1);
  }
}

// Handle process signals
process.on('SIGINT', () => {
  logger.info('Test client shutting down...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  logger.info('Test client shutting down...');
  process.exit(0);
});

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    logger.error('Fatal error:', { error: error.message });
    process.exit(1);
  });
}

export { AyaSimulateTestClient };