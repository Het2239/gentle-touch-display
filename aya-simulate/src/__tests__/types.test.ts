import { describe, test, expect } from '@jest/globals';
import { SimulateRequestSchema, SimulationError, ChainError } from '../types/index.js';

describe('Type Validation', () => {
  test('should validate correct simulate request', () => {
    const validRequest = {
      to: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      data: '0x70a08231000000000000000000000000d8da6bf26964af9d7eed9e03e53415d37aa96045',
      from: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
      chainId: '1'
    };

    const result = SimulateRequestSchema.safeParse(validRequest);
    expect(result.success).toBe(true);
  });

  test('should reject invalid Ethereum address', () => {
    const invalidRequest = {
      to: '0xinvalid',
      data: '0x70a08231000000000000000000000000d8da6bf26964af9d7eed9e03e53415d37aa96045',
      chainId: '1'
    };

    const result = SimulateRequestSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);
  });

  test('should reject invalid hex data', () => {
    const invalidRequest = {
      to: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      data: 'invalid-hex',
      chainId: '1'
    };

    const result = SimulateRequestSchema.safeParse(invalidRequest);
    expect(result.success).toBe(false);
  });

  test('should use default chainId when not provided', () => {
    const request = {
      to: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      data: '0x70a08231000000000000000000000000d8da6bf26964af9d7eed9e03e53415d37aa96045'
    };

    const result = SimulateRequestSchema.parse(request);
    expect(result.chainId).toBe('1');
  });

  test('should handle optional fields', () => {
    const minimalRequest = {
      to: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      data: '0x70a08231000000000000000000000000d8da6bf26964af9d7eed9e03e53415d37aa96045'
    };

    const result = SimulateRequestSchema.parse(minimalRequest);
    expect(result.to).toBe(minimalRequest.to);
    expect(result.data).toBe(minimalRequest.data);
    expect(result.from).toBeUndefined();
    expect(result.value).toBeUndefined();
  });
});

describe('Error Classes', () => {
  test('should create SimulationError with correct properties', () => {
    const error = new SimulationError('Test error', 'TEST_CODE', { extra: 'data' });
    
    expect(error.message).toBe('Test error');
    expect(error.code).toBe('TEST_CODE');
    expect(error.data).toEqual({ extra: 'data' });
    expect(error.name).toBe('SimulationError');
    expect(error instanceof Error).toBe(true);
  });

  test('should create ChainError with correct properties', () => {
    const error = new ChainError('Chain not supported', '999');
    
    expect(error.message).toBe('Chain not supported');
    expect(error.chainId).toBe('999');
    expect(error.name).toBe('ChainError');
    expect(error instanceof Error).toBe(true);
  });
});