#!/usr/bin/env node

import dotenv from 'dotenv';
import { AyaSimulateMCPServer } from './mcp/server.js';
import { logger } from './utils/logger.js';

// Load environment variables
dotenv.config();

async function main() {
  try {
    logger.info('Starting AyaSimulate MCP Server...');
    
    // Validate required environment variables
    const requiredEnvVars = ['ETHEREUM_RPC_URL'];
    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
    
    if (missingVars.length > 0) {
      logger.warn(`Missing environment variables: ${missingVars.join(', ')}. Using default RPC URLs.`);
    }

    // Create and start the MCP server
    const server = new AyaSimulateMCPServer();
    await server.start();

    logger.info('AyaSimulate MCP Server is running and ready to accept requests');

    // Keep the process alive
    process.on('SIGTERM', async () => {
      logger.info('Received SIGTERM, shutting down gracefully...');
      await server.stop();
      process.exit(0);
    });

    process.on('SIGINT', async () => {
      logger.info('Received SIGINT, shutting down gracefully...');
      await server.stop();
      process.exit(0);
    });

  } catch (error: any) {
    logger.error('Failed to start AyaSimulate MCP Server', { error: error.message });
    process.exit(1);
  }
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', { promise, reason });
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', { error: error.message, stack: error.stack });
  process.exit(1);
});

// Start the server
main().catch((error) => {
  logger.error('Fatal error during startup:', { error: error.message });
  process.exit(1);
});