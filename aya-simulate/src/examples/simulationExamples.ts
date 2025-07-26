import { ethers } from 'ethers';
import { SimulateRequest } from '../types/index.js';

// Example addresses (using well-known Ethereum mainnet addresses)
export const ADDRESSES = {
  UNISWAP_V2_ROUTER: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
  USDC: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', // Real USDC address
  WETH: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  DAI: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  SAMPLE_USER: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', // Vitalik's address
};

/**
 * Example 1: Simulate a Uniswap V2 token swap
 * This simulates swapping 1 ETH for USDC tokens
 */
export function createUniswapSwapExample(): SimulateRequest {
  const iface = new ethers.Interface([
    'function swapExactETHForTokens(uint256 amountOutMin, address[] calldata path, address to, uint256 deadline) external payable returns (uint256[] memory amounts)'
  ]);

  const data = iface.encodeFunctionData('swapExactETHForTokens', [
    ethers.parseUnits('1000', 6), // Minimum 1000 USDC out
    [ADDRESSES.WETH, ADDRESSES.USDC], // ETH -> USDC path
    ADDRESSES.SAMPLE_USER, // Recipient
    Math.floor(Date.now() / 1000) + 3600, // 1 hour deadline
  ]);

  return {
    to: ADDRESSES.UNISWAP_V2_ROUTER,
    data,
    from: ADDRESSES.SAMPLE_USER,
    value: ethers.parseEther('1').toString(), // 1 ETH
    chainId: '1',
  };
}

/**
 * Example 2: Simulate an ERC20 token approval
 * This simulates approving the Uniswap router to spend USDC tokens
 */
export function createTokenApprovalExample(): SimulateRequest {
  const iface = new ethers.Interface([
    'function approve(address spender, uint256 amount) external returns (bool)'
  ]);

  const data = iface.encodeFunctionData('approve', [
    ADDRESSES.UNISWAP_V2_ROUTER,
    ethers.parseUnits('1000', 6), // Approve 1000 USDC
  ]);

  return {
    to: ADDRESSES.USDC,
    data,
    from: ADDRESSES.SAMPLE_USER,
    chainId: '1',
  };
}

/**
 * Example 3: Simulate a token transfer that might fail
 * This simulates transferring more tokens than the user has
 */
export function createFailingTransferExample(): SimulateRequest {
  const iface = new ethers.Interface([
    'function transfer(address to, uint256 amount) external returns (bool)'
  ]);

  const data = iface.encodeFunctionData('transfer', [
    '0x0000000000000000000000000000000000000001', // Random recipient
    ethers.parseUnits('1000000', 18), // Very large amount (likely to fail)
  ]);

  return {
    to: ADDRESSES.DAI,
    data,
    from: ADDRESSES.SAMPLE_USER,
    chainId: '1',
  };
}

/**
 * Example 4: Simulate adding liquidity to Uniswap V2
 * This simulates adding ETH/USDC liquidity
 */
export function createAddLiquidityExample(): SimulateRequest {
  const iface = new ethers.Interface([
    'function addLiquidityETH(address token, uint256 amountTokenDesired, uint256 amountTokenMin, uint256 amountETHMin, address to, uint256 deadline) external payable returns (uint256 amountToken, uint256 amountETH, uint256 liquidity)'
  ]);

  const data = iface.encodeFunctionData('addLiquidityETH', [
    ADDRESSES.USDC,
    ethers.parseUnits('1000', 6), // 1000 USDC
    ethers.parseUnits('950', 6), // Min 950 USDC
    ethers.parseEther('0.45'), // Min 0.45 ETH
    ADDRESSES.SAMPLE_USER,
    Math.floor(Date.now() / 1000) + 3600, // 1 hour deadline
  ]);

  return {
    to: ADDRESSES.UNISWAP_V2_ROUTER,
    data,
    from: ADDRESSES.SAMPLE_USER,
    value: ethers.parseEther('0.5').toString(), // 0.5 ETH
    chainId: '1',
  };
}

/**
 * Example 5: Simulate a view function call (balance check)
 * This simulates checking the USDC balance of an address
 */
export function createBalanceCheckExample(): SimulateRequest {
  const iface = new ethers.Interface([
    'function balanceOf(address account) external view returns (uint256)'
  ]);

  const data = iface.encodeFunctionData('balanceOf', [
    ADDRESSES.SAMPLE_USER,
  ]);

  return {
    to: ADDRESSES.USDC,
    data,
    from: ADDRESSES.SAMPLE_USER,
    chainId: '1',
  };
}

/**
 * Example 6: Simulate on Polygon network
 * This simulates a token transfer on Polygon
 */
export function createPolygonTransferExample(): SimulateRequest {
  const iface = new ethers.Interface([
    'function transfer(address to, uint256 amount) external returns (bool)'
  ]);

  const data = iface.encodeFunctionData('transfer', [
    '0x0000000000000000000000000000000000000001',
    ethers.parseUnits('10', 18), // 10 tokens
  ]);

  return {
    to: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', // USDC on Polygon
    data,
    from: ADDRESSES.SAMPLE_USER,
    chainId: '137', // Polygon
  };
}

// Collection of all examples
export const SIMULATION_EXAMPLES = {
  uniswapSwap: createUniswapSwapExample,
  tokenApproval: createTokenApprovalExample,
  failingTransfer: createFailingTransferExample,
  addLiquidity: createAddLiquidityExample,
  balanceCheck: createBalanceCheckExample,
  polygonTransfer: createPolygonTransferExample,
};

// Helper function to get a random example
export function getRandomExample(): SimulateRequest {
  const examples = Object.values(SIMULATION_EXAMPLES);
  const randomIndex = Math.floor(Math.random() * examples.length);
  return examples[randomIndex]();
}

// Helper function to get example by name
export function getExampleByName(name: keyof typeof SIMULATION_EXAMPLES): SimulateRequest {
  const exampleFn = SIMULATION_EXAMPLES[name];
  if (!exampleFn) {
    throw new Error(`Unknown example: ${name}`);
  }
  return exampleFn();
}