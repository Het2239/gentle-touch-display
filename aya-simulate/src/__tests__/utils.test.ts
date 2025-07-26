import { describe, test, expect } from '@jest/globals';
import { getSupportedChainIds, getChainConfig } from '../config/chains.js';

describe('Chain Configuration', () => {
  test('should return supported chain IDs', () => {
    const chainIds = getSupportedChainIds();
    expect(chainIds).toContain('1'); // Ethereum mainnet
    expect(chainIds).toContain('137'); // Polygon
    expect(chainIds.length).toBeGreaterThan(0);
  });

  test('should get chain config for Ethereum', () => {
    const config = getChainConfig('1');
    expect(config.name).toBe('Ethereum Mainnet');
    expect(config.nativeCurrency.symbol).toBe('ETH');
    expect(config.nativeCurrency.decimals).toBe(18);
  });

  test('should get chain config for Polygon', () => {
    const config = getChainConfig('137');
    expect(config.name).toBe('Polygon');
    expect(config.nativeCurrency.symbol).toBe('MATIC');
    expect(config.nativeCurrency.decimals).toBe(18);
  });

  test('should throw error for unsupported chain', () => {
    expect(() => getChainConfig('999')).toThrow('Unsupported chain ID: 999');
  });
});

describe('Basic Functionality', () => {
  test('should pass basic test', () => {
    expect(1 + 1).toBe(2);
  });

  test('should handle strings', () => {
    expect('AyaSimulate').toContain('Aya');
  });
});