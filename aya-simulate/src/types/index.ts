import { z } from 'zod';

// Chain configuration
export interface ChainConfig {
  id: number;
  name: string;
  rpcUrl: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
}

// Simulation request schema
export const SimulateRequestSchema = z.object({
  to: z.string().regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid Ethereum address'),
  data: z.string().regex(/^0x[a-fA-F0-9]*$/, 'Invalid hex data'),
  from: z.string().regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid Ethereum address').optional(),
  value: z.string().regex(/^0x[a-fA-F0-9]*$/, 'Invalid hex value').optional(),
  chainId: z.string().default('1'),
  blockNumber: z.string().optional(),
});

export type SimulateRequest = z.infer<typeof SimulateRequestSchema>;

// Simulation response types
export interface SimulationSuccess {
  status: 'success';
  wouldSucceed: true;
  gasEstimate: number;
  returnData: string;
  decodedReturnData?: any;
  blockNumber: string;
  chainId: string;
}

export interface SimulationError {
  status: 'error';
  wouldSucceed: false;
  reason: string;
  revertData?: string;
  decodedError?: any;
  gasEstimate?: number;
  blockNumber: string;
  chainId: string;
}

export type SimulationResult = SimulationSuccess | SimulationError;

// MCP Tool interfaces
export interface MCPTool {
  name: string;
  description: string;
  inputSchema: any;
}

export interface MCPRequest {
  method: string;
  params: any;
  id?: string | number;
  jsonrpc?: string;
}

export interface MCPResponse {
  result?: any;
  error?: {
    code: number;
    message: string;
    data?: any;
  };
  id?: string | number;
  jsonrpc?: string;
}

// Error types
export class SimulationError extends Error {
  constructor(
    message: string,
    public code: string,
    public data?: any
  ) {
    super(message);
    this.name = 'SimulationError';
  }
}

export class ChainError extends Error {
  constructor(
    message: string,
    public chainId: string
  ) {
    super(message);
    this.name = 'ChainError';
  }
}

// ABI-related types
export interface ABIFunction {
  name: string;
  type: string;
  inputs: ABIInput[];
  outputs: ABIOutput[];
  stateMutability: string;
}

export interface ABIInput {
  name: string;
  type: string;
  indexed?: boolean;
}

export interface ABIOutput {
  name: string;
  type: string;
}

// Common error signatures for decoding
export const COMMON_ERROR_SIGNATURES = {
  '0x08c379a0': 'Error(string)', // Standard revert
  '0x4e487b71': 'Panic(uint256)', // Panic
  '0xf4844814': 'InsufficientBalance(uint256,uint256)', // Custom error example
} as const;