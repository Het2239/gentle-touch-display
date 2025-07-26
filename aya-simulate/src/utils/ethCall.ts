import { ethers } from 'ethers';
import { getChainConfig } from '../config/chains.js';
import { SimulateRequest, SimulationResult, SimulationError } from '../types/index.js';
import { decodeRevertReason } from './revertDecoder.js';
import { logger } from './logger.js';

// Cache providers to avoid recreating them
const providerCache = new Map<string, ethers.JsonRpcProvider>();

function getProvider(chainId: string): ethers.JsonRpcProvider {
  if (!providerCache.has(chainId)) {
    const chainConfig = getChainConfig(chainId);
    const provider = new ethers.JsonRpcProvider(chainConfig.rpcUrl);
    providerCache.set(chainId, provider);
  }
  return providerCache.get(chainId)!;
}

export async function performEthCall(request: SimulateRequest): Promise<SimulationResult> {
  const { to, data, from, value, chainId, blockNumber } = request;
  
  try {
    const provider = getProvider(chainId);
    const chainConfig = getChainConfig(chainId);
    
    // Get current block number if not specified
    const currentBlock = blockNumber || 'latest';
    const blockNum = await provider.getBlockNumber();
    
    logger.info(`Simulating transaction on ${chainConfig.name}`, {
      to,
      from,
      value,
      blockNumber: currentBlock,
      dataLength: data.length,
    });

    // Prepare transaction object
    const txRequest: ethers.TransactionRequest = {
      to,
      data,
      from: from || '0x0000000000000000000000000000000000000000',
      value: value || '0x0',
    };

    // First, try to estimate gas
    let gasEstimate: number;
    try {
      const gasResult = await provider.estimateGas(txRequest);
      gasEstimate = Number(gasResult);
      logger.debug(`Gas estimation successful: ${gasEstimate}`);
    } catch (gasError: any) {
      logger.warn('Gas estimation failed, will try call anyway', { error: gasError.message });
      gasEstimate = 0; // We'll still try the call
    }

    // Perform the actual call simulation
    try {
      const result = await provider.call(txRequest);
      
      logger.info('Transaction simulation successful', {
        returnDataLength: result.length,
        gasEstimate,
      });

      return {
        status: 'success',
        wouldSucceed: true,
        gasEstimate,
        returnData: result,
        blockNumber: blockNum.toString(),
        chainId,
      };
    } catch (callError: any) {
      logger.warn('Transaction call failed', { error: callError.message });
      
      // Try to decode the revert reason
      const decodedReason = decodeRevertReason(callError);
      
      return {
        status: 'error',
        wouldSucceed: false,
        reason: decodedReason.reason,
        revertData: decodedReason.data,
        decodedError: decodedReason.decoded,
        gasEstimate: gasEstimate > 0 ? gasEstimate : undefined,
        blockNumber: blockNum.toString(),
        chainId,
      } as SimulationResult;
    }
  } catch (error: any) {
    logger.error('Simulation failed with unexpected error', { error: error.message });
    
    throw new SimulationError(
      `Simulation failed: ${error.message}`,
      'SIMULATION_ERROR',
      { chainId, originalError: error.message }
    );
  }
}

export async function getBlockNumber(chainId: string): Promise<number> {
  try {
    const provider = getProvider(chainId);
    return await provider.getBlockNumber();
  } catch (error: any) {
    logger.error('Failed to get block number', { chainId, error: error.message });
    throw new SimulationError(
      `Failed to get block number: ${error.message}`,
      'BLOCK_NUMBER_ERROR',
      { chainId }
    );
  }
}

export async function getBalance(address: string, chainId: string): Promise<bigint> {
  try {
    const provider = getProvider(chainId);
    return await provider.getBalance(address);
  } catch (error: any) {
    logger.error('Failed to get balance', { address, chainId, error: error.message });
    throw new SimulationError(
      `Failed to get balance: ${error.message}`,
      'BALANCE_ERROR',
      { address, chainId }
    );
  }
}