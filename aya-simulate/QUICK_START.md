# AyaSimulate - Quick Start Guide

🚀 **Get up and running in 5 minutes!**

## ⚡ Installation

```bash
# 1. Navigate to the project
cd aya-simulate

# 2. Install dependencies
npm install

# 3. Set up environment
cp .env.example .env

# 4. Build the project
npm run build
```

## 🧪 Test the Server

```bash
# Test the describe tool
npm run test:describe

# Test a simulation
npm run test:simulate balanceCheck
```

## ✅ Expected Output

### Describe Tool Test:
```json
{
  "name": "AyaSimulate",
  "version": "1.0.0",
  "description": "Transaction Simulation Tool for DeFi-Aware AI Agents",
  "capabilities": [
    "Simulate EVM-compatible transactions",
    "Estimate gas costs",
    "Decode revert reasons",
    "Multi-chain support",
    "Safe dry-run execution"
  ],
  "supportedChains": [
    {
      "id": "1",
      "name": "Ethereum Mainnet",
      "nativeCurrency": {"name": "Ether", "symbol": "ETH", "decimals": 18}
    }
    // ... more chains
  ]
}
```

### Balance Check Simulation:
```json
{
  "status": "success",
  "wouldSucceed": true,
  "gasEstimate": 31624,
  "returnData": "0x0000000000000000000000000000000000000000000000000000047222e125",
  "blockNumber": "23001002",
  "chainId": "1"
}
```

## 🎯 Using the MCP Server

### Start the Server
```bash
npm start
```

### Available Tools

#### 1. `simulate` - Simulate Transactions
```json
{
  "name": "simulate",
  "arguments": {
    "to": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    "data": "0x70a08231000000000000000000000000d8da6bf26964af9d7eed9e03e53415d37aa96045",
    "from": "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
    "chainId": "1"
  }
}
```

#### 2. `describe` - Get Server Info
```json
{
  "name": "describe",
  "arguments": {}
}
```

## 🔧 Configuration

### Environment Variables (Optional)
```env
# Use your own RPC URLs for better performance
ETHEREUM_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_API_KEY
POLYGON_RPC_URL=https://polygon-mainnet.g.alchemy.com/v2/YOUR_API_KEY

# Logging
LOG_LEVEL=info
```

### Supported Chains
- Ethereum Mainnet (1)
- Polygon (137)  
- Arbitrum One (42161)
- BNB Smart Chain (56)
- Optimism (10)
- Base (8453)

## 📚 Example Use Cases

### 1. Check Token Balance
```typescript
// Simulate checking USDC balance
{
  "to": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
  "data": "0x70a08231000000000000000000000000d8da6bf26964af9d7eed9e03e53415d37aa96045",
  "chainId": "1"
}
```

### 2. Simulate Token Transfer
```typescript
// Simulate USDC transfer (would likely fail due to insufficient balance)
{
  "to": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", 
  "data": "0xa9059cbb000000000000000000000000...",
  "from": "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
  "chainId": "1"
}
```

### 3. Simulate Uniswap Swap
```typescript
// Simulate ETH to USDC swap
{
  "to": "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
  "data": "0x7ff36ab5000000000000000000000000...",
  "value": "0x0de0b6b3a7640000", // 1 ETH
  "from": "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
  "chainId": "1"
}
```

## 🎉 Success Indicators

✅ **Server starts without errors**  
✅ **Describe tool returns server info**  
✅ **Balance check simulation succeeds**  
✅ **Gas estimation works**  
✅ **Multi-chain support enabled**

## 🆘 Quick Troubleshooting

**Build fails?**
```bash
npm run clean && npm install && npm run build
```

**RPC connection issues?**
- Check your internet connection
- The server uses free public RPCs by default
- Add your own RPC URLs in `.env` for better reliability

**Address checksum errors?**
- Make sure addresses are properly checksummed
- Use ethers.js `getAddress()` to fix checksums

## 🚀 Production Deployment

```bash
# Using PM2
npm install -g pm2
pm2 start dist/server.js --name "aya-simulate"

# Using Docker
docker build -t aya-simulate .
docker run -p 3000:3000 --env-file .env aya-simulate
```

## 📖 Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Check [INSTALL.md](INSTALL.md) for advanced installation options
- Explore more examples in `src/examples/`
- Integrate with your AI agent using the MCP protocol

---

**🎯 Ready to simulate DeFi transactions safely!**

*Built for the Aya AI Global Hackathon - Empowering AI agents with DeFi transaction simulation capabilities.*