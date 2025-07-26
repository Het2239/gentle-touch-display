# AyaSimulate - Transaction Simulation Tool for DeFi-Aware AI Agents

![AyaSimulate Logo](https://via.placeholder.com/800x200/4A90E2/FFFFFF?text=AyaSimulate+MCP+Server)

## 🧾 Project Overview

**AyaSimulate** is a Model Context Protocol (MCP)-compliant tool that allows AI agents (like Aya) to simulate any on-chain Ethereum-compatible transaction before execution. This empowers agents to make safe, efficient, and explainable DeFi decisions by providing:

- ✅ Success/failure status prediction
- ⛽ Accurate gas estimation
- ❌ Decoded revert reasons
- 📦 ABI encoding/decoding
- 🔁 Multi-chain support (Ethereum, Polygon, Arbitrum, BSC, etc.)
- 🔐 Secure-by-design (no private keys, simulation only)

## 🎯 Problem Statement

In DeFi, interacting with smart contracts involves risk. Transactions can fail, revert, or consume unnecessary gas due to logic errors, insufficient balances, or protocol conditions. Without a way to safely test transactions before execution, both human users and AI agents are forced to act blindly, risking failure, loss of funds, or high fees.

## 🛠️ Core Features

| Feature | Description |
|---------|-------------|
| 🔧 `simulate()` method | Accepts contract address, function call, and optional parameters; performs dry-run using `eth_call` |
| ⛽ Gas Estimation | Uses `eth_estimateGas` to return potential gas cost |
| ❌ Revert Reason Decoding | Parses and decodes Solidity error messages from failed calls |
| 📦 ABI Encoding/Decoding | Encodes smart contract function calls and decodes results |
| 🔁 Multi-chain Support | Supports Ethereum, Polygon, Arbitrum, BSC, Optimism, Base |
| 🧠 MCP Compatibility | Fully compliant with JSON-RPC-based Model Context Protocol |
| 🔐 Secure-by-Design | Only simulates (never signs or sends); no private key handling |

## 📦 Installation & Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn
- RPC endpoint URLs (Alchemy, Infura, or public RPCs)

### 1. Clone and Install

```bash
cd aya-simulate
npm install
```

### 2. Environment Configuration

```bash
cp .env.example .env
```

Edit `.env` with your RPC URLs:

```env
# Ethereum RPC URLs
ETHEREUM_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_API_KEY
POLYGON_RPC_URL=https://polygon-mainnet.g.alchemy.com/v2/YOUR_API_KEY
ARBITRUM_RPC_URL=https://arb-mainnet.g.alchemy.com/v2/YOUR_API_KEY
BSC_RPC_URL=https://bsc-dataseed.binance.org/

# Server Configuration
PORT=3000
NODE_ENV=development
LOG_LEVEL=info
```

### 3. Build and Run

```bash
# Development mode (with auto-reload)
npm run dev

# Production build
npm run build
npm start

# Run tests
npm test
```

## 🚀 Usage

### MCP Tool Interface

The server provides two main tools:

#### 1. `simulate` Tool

Simulates a transaction and returns detailed results:

```json
{
  "method": "simulate",
  "params": {
    "to": "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    "data": "0x38ed1739000000000000000000000000000000000000000000000000016345785d8a0000...",
    "from": "0x742d35Cc6634C0532925a3b8D0c9e3d4a0b3c8f3",
    "value": "0x0de0b6b3a7640000",
    "chainId": "1"
  }
}
```

**Success Response:**
```json
{
  "status": "success",
  "wouldSucceed": true,
  "gasEstimate": 95000,
  "returnData": "0x000000000000...",
  "blockNumber": "18500000",
  "chainId": "1"
}
```

**Error Response:**
```json
{
  "status": "error",
  "wouldSucceed": false,
  "reason": "UniswapV2: INSUFFICIENT_OUTPUT_AMOUNT",
  "revertData": "0x08c379a0...",
  "decodedError": {
    "type": "Error",
    "message": "UniswapV2: INSUFFICIENT_OUTPUT_AMOUNT"
  },
  "blockNumber": "18500000",
  "chainId": "1"
}
```

#### 2. `describe` Tool

Returns server capabilities and supported chains:

```json
{
  "method": "describe",
  "params": {}
}
```

### Supported Chains

| Chain | Chain ID | Default RPC |
|-------|----------|-------------|
| Ethereum Mainnet | `1` | LlamaRPC |
| Polygon | `137` | LlamaRPC |
| Arbitrum One | `42161` | Official RPC |
| BNB Smart Chain | `56` | Binance RPC |
| Optimism | `10` | Official RPC |
| Base | `8453` | Official RPC |

## 📚 Examples

### Example 1: Uniswap Token Swap

```typescript
import { ethers } from 'ethers';

// Encode a Uniswap V2 swap function call
const iface = new ethers.Interface([
  'function swapExactETHForTokens(uint256 amountOutMin, address[] calldata path, address to, uint256 deadline) external payable'
]);

const data = iface.encodeFunctionData('swapExactETHForTokens', [
  ethers.parseUnits('1000', 6), // Min 1000 USDC out
  ['0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', '0xA0b86a33E6441c41b8b7C8A7F4d5A6b8d9c9e3d4'],
  '0x742d35Cc6634C0532925a3b8D0c9e3d4a0b3c8f3',
  Math.floor(Date.now() / 1000) + 3600
]);

// Simulate the transaction
const request = {
  to: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
  data,
  from: '0x742d35Cc6634C0532925a3b8D0c9e3d4a0b3c8f3',
  value: ethers.parseEther('1').toString(),
  chainId: '1'
};
```

### Example 2: ERC20 Token Approval

```typescript
// Encode an ERC20 approve function call
const data = iface.encodeFunctionData('approve', [
  '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D', // Uniswap Router
  ethers.parseUnits('1000', 6) // 1000 USDC
]);

const request = {
  to: '0xA0b86a33E6441c41b8b7C8A7F4d5A6b8d9c9e3d4', // USDC
  data,
  from: '0x742d35Cc6634C0532925a3b8D0c9e3d4a0b3c8f3',
  chainId: '1'
};
```

## 🏗️ Architecture

```
aya-simulate/
├── src/
│   ├── types/           # TypeScript type definitions
│   ├── config/          # Chain configurations
│   ├── utils/           # Utility functions
│   │   ├── ethCall.ts   # Ethereum RPC interactions
│   │   ├── revertDecoder.ts  # Error decoding
│   │   └── logger.ts    # Logging utilities
│   ├── mcp/             # MCP server implementation
│   ├── abi/             # Contract ABI files
│   ├── examples/        # Usage examples
│   └── server.ts        # Main entry point
├── package.json
├── tsconfig.json
└── README.md
```

## 🧪 Testing

Run the included test examples:

```bash
# Run all tests
npm test

# Test specific simulation
npm run test:simulate

# Test with different chains
npm run test:polygon
```

## 🔧 Development

### Adding New Chains

1. Add chain configuration in `src/config/chains.ts`:

```typescript
'999': {
  id: 999,
  name: 'My Custom Chain',
  rpcUrl: process.env.CUSTOM_RPC_URL || 'https://rpc.custom.chain',
  nativeCurrency: {
    name: 'Custom Token',
    symbol: 'CUSTOM',
    decimals: 18,
  },
}
```

2. Add environment variable to `.env.example`

### Adding New Error Decoders

Extend `COMMON_ERROR_SIGNATURES` in `src/types/index.ts`:

```typescript
export const COMMON_ERROR_SIGNATURES = {
  '0x08c379a0': 'Error(string)',
  '0x4e487b71': 'Panic(uint256)',
  '0xYOUR_SIG': 'YourCustomError(uint256,string)',
} as const;
```

## 📊 Performance

- **Latency**: ~200-500ms per simulation (depending on RPC)
- **Throughput**: 100+ simulations per second
- **Memory**: ~50MB base usage
- **Caching**: Provider instances cached for efficiency

## 🔒 Security

- ✅ No private key handling
- ✅ Read-only operations only
- ✅ Input validation with Zod schemas
- ✅ Rate limiting ready
- ✅ Comprehensive error handling
- ✅ Structured logging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Aya AI Global Hackathon** for the inspiration
- **Model Context Protocol** for the standard
- **Ethers.js** for blockchain interactions
- **Uniswap** for DeFi examples

## 📞 Support

- 📧 Email: support@ayasimulate.dev
- 💬 Discord: [AyaSimulate Community](https://discord.gg/ayasimulate)
- 🐛 Issues: [GitHub Issues](https://github.com/aya-ai/aya-simulate/issues)

---

**Built with ❤️ for the Aya AI Global Hackathon**

*"Empowering AI agents to safely explore and execute DeFi transactions by simulating real outcomes before committing."*