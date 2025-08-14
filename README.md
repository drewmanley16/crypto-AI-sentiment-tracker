# 🚀 Crypto Mood Tracker

A modern, full-stack web application that combines real-time cryptocurrency prices with social media sentiment analysis. Built with a sleek, dark theme and featuring live updates, interactive charts, and comprehensive market analysis.

![Crypto Mood Tracker](https://via.placeholder.com/800x400/0a0a0a/00f5ff?text=Crypto+Mood+Tracker)

## ✨ Features

### 🔴 Live Data
- **Real-time Crypto Prices**: Live price updates for major cryptocurrencies using CoinGecko API
- **WebSocket Integration**: Instant updates without page refresh
- **Market Data**: 24h price changes, market cap, and trading volume

### 😊 Sentiment Analysis
- **Social Media Monitoring**: Analyzes sentiment from Twitter/X and Reddit posts
- **Real-time Sentiment Scoring**: -100 to +100 sentiment scale
- **Trend Analysis**: Tracks sentiment changes over time
- **Volume Metrics**: Number of mentions and engagement data

### 📊 Data Visualization
- **Interactive Charts**: Price history and sentiment trends using Recharts
- **Multiple Timeframes**: 1D, 7D, and 30D view options
- **Gradient Visualizations**: Beautiful area charts with custom styling

### 🌟 Modern UI/UX
- **Sleek Dark Theme**: Cyberpunk-inspired design with neon accents
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Smooth Animations**: Hover effects, loading states, and transitions
- **Glassmorphism Effects**: Modern card designs with backdrop blur

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Recharts** for data visualization
- **Lucide React** for icons
- **Socket.IO Client** for real-time updates

### Backend
- **Node.js** with Express
- **Socket.IO** for WebSocket connections
- **Axios** for API requests
- **node-cron** for scheduled tasks
- **Sentiment** library for text analysis

### APIs & Services
- **CoinGecko API** for cryptocurrency data
- **Twitter API v2** (optional - currently using mock data)
- **Mock Social Data** for demonstration

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd crypto-mood-tracker
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Environment Setup**
   ```bash
   cp .env.example .env
   # Edit .env with your API keys (optional for basic functionality)
   ```

5. **Start the development servers**

   **Option 1: Run both servers separately**
   ```bash
   # Terminal 1 - Backend server
   npm run server
   
   # Terminal 2 - Frontend development server
   npm run client
   ```

   **Option 2: Production mode**
   ```bash
   # Build and run
   npm run build
   npm start
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

## 📁 Project Structure

```
crypto-mood-tracker/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── types.ts        # TypeScript definitions
│   │   ├── App.tsx         # Main app component
│   │   └── index.css       # Global styles
│   ├── tailwind.config.js  # Tailwind configuration
│   └── package.json
├── server/                 # Node.js backend
│   ├── routes/             # API routes
│   ├── utils/              # Service utilities
│   └── index.js            # Main server file
├── .env                    # Environment variables
├── package.json            # Root package.json
└── README.md
```

## 🔧 Configuration

### Environment Variables

```env
PORT=3001
NODE_ENV=development

# Twitter API (Optional - currently using mock data)
TWITTER_BEARER_TOKEN=your_twitter_bearer_token_here
TWITTER_API_KEY=your_twitter_api_key_here
TWITTER_API_SECRET=your_twitter_api_secret_here

# CoinGecko API (Free tier doesn't require key)
# COINGECKO_API_KEY=your_coingecko_api_key_here
```

### Supported Cryptocurrencies

- Bitcoin (BTC)
- Ethereum (ETH)
- Cardano (ADA)
- Polkadot (DOT)
- Solana (SOL)
- Polygon (MATIC)
- Chainlink (LINK)
- Uniswap (UNI)

## 📊 API Endpoints

### Crypto Data
- `GET /api/crypto/prices` - Current prices for all cryptocurrencies
- `GET /api/crypto/history/:symbol` - Historical price data

### Sentiment Data
- `GET /api/sentiment/current` - Current sentiment for all cryptocurrencies
- `GET /api/sentiment/history/:symbol` - Historical sentiment data
- `GET /api/sentiment/posts/:symbol` - Recent social media posts

### WebSocket Events
- `cryptoUpdate` - Real-time price updates
- `sentimentUpdate` - Real-time sentiment updates

## 🎨 Design Features

### Color Palette
- **Background**: Deep blacks (#0a0a0a, #1a1a1a)
- **Accent**: Cyan (#00f5ff, #00d9ff)
- **Bullish**: Green (#00ff88)
- **Bearish**: Red (#ff4757)

### Custom Components
- **Glowing Cards**: Subtle neon glow effects
- **Loading Animations**: Smooth spinner with pulsing elements
- **Interactive Charts**: Hover effects and tooltips
- **Gradient Text**: Cyan gradient headings

## 🔄 Real-time Updates

The application features comprehensive real-time functionality:

1. **Price Updates**: Every 30 seconds from CoinGecko API
2. **Sentiment Updates**: Every 5 minutes with fresh social data
3. **WebSocket Push**: Instant updates to all connected clients
4. **Automatic Reconnection**: Handles connection drops gracefully

## 🧪 Development

### Available Scripts

```bash
npm run dev          # Start backend in development
npm run client       # Start frontend development server
npm run build        # Build frontend for production
npm run start        # Start production server
npm test             # Run tests (to be implemented)
```

### Adding New Features

1. **New Cryptocurrency**: Add to `CRYPTO_SYMBOLS` in `cryptoService.js`
2. **New Chart Type**: Extend `DetailedView.tsx` with Recharts components
3. **Additional APIs**: Create new service files in `server/utils/`

## 🔒 Security & Privacy

- No sensitive data storage
- API keys secured in environment variables
- Rate limiting on external API calls
- No user authentication required (public data only)

## 📈 Performance

- **Frontend**: Vite for fast HMR and optimized builds
- **Backend**: Express with efficient caching
- **Charts**: Recharts with optimized re-renders
- **Real-time**: Socket.IO with connection pooling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [CoinGecko](https://coingecko.com) for cryptocurrency data
- [Recharts](https://recharts.org/) for beautiful charts
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide](https://lucide.dev/) for icons

---

**Built with ❤️ and ☕ by [Your Name]**

*Making crypto sentiment analysis accessible and beautiful.*
