# AyaSimulate Installation Guide

This guide will walk you through installing and running the AyaSimulate MCP server.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 18+** - [Download from nodejs.org](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **Git** - [Download from git-scm.com](https://git-scm.com/)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/aya-ai/aya-simulate.git
cd aya-simulate
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

```bash
# Copy the example environment file
cp .env.example .env

# Edit the .env file with your RPC URLs
nano .env  # or use your preferred editor
```

**Required Environment Variables:**

```env
# At minimum, set your Ethereum RPC URL
ETHEREUM_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_API_KEY

# Optional: Add other chains
POLYGON_RPC_URL=https://polygon-mainnet.g.alchemy.com/v2/YOUR_API_KEY
ARBITRUM_RPC_URL=https://arb-mainnet.g.alchemy.com/v2/YOUR_API_KEY
```

### 4. Build and Run

```bash
# Build the TypeScript code
npm run build

# Start the server
npm start
```

## 🔧 Development Setup

For development with auto-reload:

```bash
# Install development dependencies
npm install

# Run in development mode
npm run dev
```

## 🧪 Testing the Installation

### Test with the built-in client:

```bash
# Test all functionality
npm run test:client

# Test specific simulation
npm run test:simulate uniswapSwap

# Test describe tool
npm run test:describe
```

### Manual testing:

```bash
# Start the server in one terminal
npm start

# In another terminal, you can send MCP requests
echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/list", "params": {}}' | node dist/server.js
```

## 🌐 RPC Provider Setup

### Option 1: Alchemy (Recommended)

1. Sign up at [alchemy.com](https://alchemy.com)
2. Create a new app for each network you want to support
3. Copy the HTTP URLs to your `.env` file

```env
ETHEREUM_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_API_KEY
POLYGON_RPC_URL=https://polygon-mainnet.g.alchemy.com/v2/YOUR_API_KEY
```

### Option 2: Infura

1. Sign up at [infura.io](https://infura.io)
2. Create a new project
3. Use the endpoints in your `.env` file

```env
ETHEREUM_RPC_URL=https://mainnet.infura.io/v3/YOUR_PROJECT_ID
POLYGON_RPC_URL=https://polygon-mainnet.infura.io/v3/YOUR_PROJECT_ID
```

### Option 3: Public RPCs (Free, but limited)

```env
ETHEREUM_RPC_URL=https://eth.llamarpc.com
POLYGON_RPC_URL=https://polygon.llamarpc.com
ARBITRUM_RPC_URL=https://arb1.arbitrum.io/rpc
BSC_RPC_URL=https://bsc-dataseed.binance.org/
```

## 🐳 Docker Installation (Alternative)

If you prefer Docker:

```bash
# Build the Docker image
docker build -t aya-simulate .

# Run the container
docker run -p 3000:3000 --env-file .env aya-simulate
```

## 📦 Production Deployment

### Option 1: PM2 (Recommended for VPS)

```bash
# Install PM2 globally
npm install -g pm2

# Build the project
npm run build

# Start with PM2
pm2 start dist/server.js --name "aya-simulate"

# Save PM2 configuration
pm2 save
pm2 startup
```

### Option 2: Systemd Service

Create a systemd service file:

```bash
sudo nano /etc/systemd/system/aya-simulate.service
```

```ini
[Unit]
Description=AyaSimulate MCP Server
After=network.target

[Service]
Type=simple
User=your-user
WorkingDirectory=/path/to/aya-simulate
ExecStart=/usr/bin/node dist/server.js
Restart=always
RestartSec=10
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

Enable and start the service:

```bash
sudo systemctl enable aya-simulate
sudo systemctl start aya-simulate
sudo systemctl status aya-simulate
```

### Option 3: Cloud Platforms

#### Railway
1. Connect your GitHub repository to Railway
2. Set environment variables in the Railway dashboard
3. Deploy automatically

#### Render
1. Create a new Web Service on Render
2. Connect your repository
3. Set the build command: `npm run build`
4. Set the start command: `npm start`

#### Heroku
```bash
# Install Heroku CLI
# Create a new app
heroku create your-app-name

# Set environment variables
heroku config:set ETHEREUM_RPC_URL=your_rpc_url

# Deploy
git push heroku main
```

## 🔍 Troubleshooting

### Common Issues

**Issue: "Cannot find module" errors**
```bash
# Solution: Rebuild the project
npm run clean
npm run build
```

**Issue: "Connection refused" to RPC**
```bash
# Solution: Check your RPC URLs in .env
# Test the RPC URL manually:
curl -X POST -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}' \
  YOUR_RPC_URL
```

**Issue: "Gas estimation failed"**
- This is often expected for transactions that would fail
- Check the decoded error message for the reason

**Issue: High memory usage**
```bash
# Solution: Restart the server periodically or use PM2
pm2 restart aya-simulate
```

### Debug Mode

Enable debug logging:

```bash
# Set log level to debug
export LOG_LEVEL=debug
npm start
```

### Health Check

Test if the server is running correctly:

```bash
# Test the describe tool
npm run test:describe

# Check server logs
tail -f logs/combined.log
```

## 📊 Monitoring

### Log Files

The server creates log files in the `logs/` directory:
- `combined.log` - All log messages
- `error.log` - Error messages only

### Performance Monitoring

For production, consider:
- Setting up log rotation
- Monitoring memory usage
- Setting up alerts for failures

```bash
# Log rotation with logrotate
sudo nano /etc/logrotate.d/aya-simulate
```

```
/path/to/aya-simulate/logs/*.log {
    daily
    missingok
    rotate 7
    compress
    notifempty
    create 0644 your-user your-group
}
```

## 🔧 Configuration

### Environment Variables Reference

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `ETHEREUM_RPC_URL` | Ethereum mainnet RPC URL | LlamaRPC | No |
| `POLYGON_RPC_URL` | Polygon RPC URL | LlamaRPC | No |
| `ARBITRUM_RPC_URL` | Arbitrum RPC URL | Official | No |
| `BSC_RPC_URL` | BSC RPC URL | Binance | No |
| `OPTIMISM_RPC_URL` | Optimism RPC URL | Official | No |
| `BASE_RPC_URL` | Base RPC URL | Official | No |
| `PORT` | Server port | 3000 | No |
| `NODE_ENV` | Environment | development | No |
| `LOG_LEVEL` | Logging level | info | No |

### Performance Tuning

For high-throughput scenarios:

```env
# Increase Node.js memory limit
NODE_OPTIONS=--max-old-space-size=4096

# Adjust log level for production
LOG_LEVEL=warn
```

## 🆘 Getting Help

If you encounter issues:

1. Check the [troubleshooting section](#troubleshooting)
2. Review the logs in `logs/error.log`
3. Test with the built-in examples: `npm run test:client`
4. Open an issue on GitHub with:
   - Your operating system
   - Node.js version (`node --version`)
   - Error messages from logs
   - Steps to reproduce

## ✅ Verification Checklist

After installation, verify everything works:

- [ ] Server starts without errors
- [ ] Can list available tools
- [ ] Describe tool returns server information
- [ ] Can simulate a simple transaction
- [ ] Logs are being written to `logs/` directory
- [ ] All required environment variables are set

Congratulations! Your AyaSimulate MCP server is now ready to help AI agents simulate DeFi transactions safely.