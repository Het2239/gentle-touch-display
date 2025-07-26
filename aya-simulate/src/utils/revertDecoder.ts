import { ethers } from 'ethers';
import { COMMON_ERROR_SIGNATURES } from '../types/index.js';
import { logger } from './logger.js';

export interface DecodedRevertReason {
  reason: string;
  data?: string;
  decoded?: any;
}

export function decodeRevertReason(error: any): DecodedRevertReason {
  try {
    // Handle different error formats from ethers.js
    let revertData: string | undefined;
    let errorMessage = error.message || 'Unknown error';

    // Extract revert data from various error formats
    if (error.data) {
      revertData = error.data;
    } else if (error.reason && error.reason.includes('0x')) {
      const match = error.reason.match(/0x[a-fA-F0-9]+/);
      if (match) {
        revertData = match[0];
      }
    } else if (error.error?.data) {
      revertData = error.error.data;
    }

    // If we have revert data, try to decode it
    if (revertData && revertData.length > 10) {
      const decoded = decodeErrorData(revertData);
      if (decoded) {
        return {
          reason: decoded.reason,
          data: revertData,
          decoded: decoded.decoded,
        };
      }
    }

    // Try to extract human-readable error messages
    const cleanReason = extractHumanReadableReason(errorMessage);
    
    return {
      reason: cleanReason,
      data: revertData,
    };
  } catch (decodeError) {
    logger.warn('Failed to decode revert reason', { error: decodeError });
    return {
      reason: error.message || 'Transaction would revert',
      data: undefined,
    };
  }
}

function decodeErrorData(data: string): { reason: string; decoded?: any } | null {
  try {
    // Get the function selector (first 4 bytes)
    const selector = data.slice(0, 10);
    
    // Check for common error signatures
    const errorSignature = COMMON_ERROR_SIGNATURES[selector as keyof typeof COMMON_ERROR_SIGNATURES];
    
    if (errorSignature) {
      if (selector === '0x08c379a0') {
        // Standard Error(string) - decode the string parameter
        try {
          const decoded = ethers.AbiCoder.defaultAbiCoder().decode(['string'], '0x' + data.slice(10));
          return {
            reason: decoded[0],
            decoded: { type: 'Error', message: decoded[0] },
          };
        } catch {
          return { reason: 'Error(string) - decode failed' };
        }
      } else if (selector === '0x4e487b71') {
        // Panic(uint256) - decode the panic code
        try {
          const decoded = ethers.AbiCoder.defaultAbiCoder().decode(['uint256'], '0x' + data.slice(10));
          const panicCode = decoded[0].toString();
          const panicReason = getPanicReason(panicCode);
          return {
            reason: `Panic: ${panicReason} (${panicCode})`,
            decoded: { type: 'Panic', code: panicCode, reason: panicReason },
          };
        } catch {
          return { reason: 'Panic(uint256) - decode failed' };
        }
      } else {
        // Other known error signatures
        return {
          reason: `Known error: ${errorSignature}`,
          decoded: { type: 'KnownError', signature: errorSignature },
        };
      }
    }

    // Try to decode as a generic custom error
    // This is a best-effort attempt for unknown custom errors
    return {
      reason: `Custom error with selector ${selector}`,
      decoded: { type: 'CustomError', selector },
    };
  } catch (error) {
    logger.debug('Failed to decode error data', { data, error });
    return null;
  }
}

function extractHumanReadableReason(errorMessage: string): string {
  // Common patterns in error messages
  const patterns = [
    /execution reverted: (.+)/i,
    /revert (.+)/i,
    /VM Exception while processing transaction: revert (.+)/i,
    /reverted with reason string '(.+)'/i,
    /transaction failed: (.+)/i,
  ];

  for (const pattern of patterns) {
    const match = errorMessage.match(pattern);
    if (match && match[1]) {
      return match[1].trim();
    }
  }

  // Check for specific known error patterns
  if (errorMessage.includes('insufficient funds')) {
    return 'Insufficient funds for transaction';
  }
  if (errorMessage.includes('gas required exceeds allowance')) {
    return 'Gas limit too low';
  }
  if (errorMessage.includes('nonce too low')) {
    return 'Nonce too low';
  }
  if (errorMessage.includes('replacement transaction underpriced')) {
    return 'Replacement transaction underpriced';
  }

  // Return cleaned up error message
  return errorMessage.replace(/^Error: /, '').trim() || 'Transaction would revert';
}

function getPanicReason(code: string): string {
  const panicCodes: Record<string, string> = {
    '0': 'Generic panic',
    '1': 'Assertion failed',
    '17': 'Arithmetic overflow/underflow',
    '18': 'Division by zero',
    '33': 'Enum conversion error',
    '34': 'Invalid storage byte array access',
    '49': 'Pop from empty array',
    '50': 'Array index out of bounds',
    '65': 'Memory allocation overflow',
    '81': 'Zero-initialized variable of internal function type',
  };

  return panicCodes[code] || `Unknown panic code: ${code}`;
}

// Helper function to check if an error is a revert
export function isRevertError(error: any): boolean {
  const errorMessage = error.message?.toLowerCase() || '';
  return (
    errorMessage.includes('revert') ||
    errorMessage.includes('execution reverted') ||
    errorMessage.includes('transaction failed') ||
    error.code === 'CALL_EXCEPTION' ||
    error.reason?.includes('revert')
  );
}

// Helper to extract gas used from error (if available)
export function extractGasUsed(error: any): number | undefined {
  try {
    if (error.receipt?.gasUsed) {
      return Number(error.receipt.gasUsed);
    }
    if (error.transaction?.gasLimit) {
      return Number(error.transaction.gasLimit);
    }
    return undefined;
  } catch {
    return undefined;
  }
}