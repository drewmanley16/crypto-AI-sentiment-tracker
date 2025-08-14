const axios = require('axios');

// Popular cryptocurrencies to track
const CRYPTO_SYMBOLS = ['bitcoin', 'ethereum', 'cardano', 'polkadot', 'solana', 'polygon', 'chainlink', 'uniswap'];

async function updateCryptoPrices() {
  try {
    // Using CoinGecko API (free tier)
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
      params: {
        ids: CRYPTO_SYMBOLS.join(','),
        vs_currencies: 'usd',
        include_24hr_change: true,
        include_market_cap: true,
        include_24hr_vol: true
      }
    });

    const cryptoData = {};
    
    // Transform the data to match our frontend expectations
    Object.keys(response.data).forEach(id => {
      const data = response.data[id];
      const symbol = getSymbolFromId(id);
      
      cryptoData[symbol] = {
        id,
        symbol: symbol.toUpperCase(),
        name: getNameFromId(id),
        price: data.usd,
        change24h: data.usd_24h_change || 0,
        marketCap: data.usd_market_cap || 0,
        volume24h: data.usd_24h_vol || 0,
        lastUpdated: new Date().toISOString()
      };
    });

    // Store globally and emit to connected clients
    global.cryptoData = cryptoData;
    
    if (global.io) {
      global.io.emit('cryptoUpdate', cryptoData);
    }

    return cryptoData;
    
  } catch (error) {
    console.error('Error fetching crypto prices from API:', error.message);
    
    // Fallback to mock data if API fails
    const mockData = generateMockCryptoData();
    global.cryptoData = mockData;
    
    if (global.io) {
      global.io.emit('cryptoUpdate', mockData);
    }
    
    return mockData;
  }
}

function getSymbolFromId(id) {
  const idToSymbol = {
    'bitcoin': 'BTC',
    'ethereum': 'ETH',
    'cardano': 'ADA',
    'polkadot': 'DOT',
    'solana': 'SOL',
    'polygon': 'MATIC',
    'chainlink': 'LINK',
    'uniswap': 'UNI'
  };
  
  return idToSymbol[id] || id.toUpperCase();
}

function getNameFromId(id) {
  const idToName = {
    'bitcoin': 'Bitcoin',
    'ethereum': 'Ethereum',
    'cardano': 'Cardano',
    'polkadot': 'Polkadot',
    'solana': 'Solana',
    'polygon': 'Polygon',
    'chainlink': 'Chainlink',
    'uniswap': 'Uniswap'
  };
  
  return idToName[id] || id.charAt(0).toUpperCase() + id.slice(1);
}

function generateMockCryptoData() {
  const mockData = {};
  
  const cryptos = [
    { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', basePrice: 45000 },
    { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', basePrice: 2500 },
    { id: 'cardano', symbol: 'ADA', name: 'Cardano', basePrice: 0.45 },
    { id: 'polkadot', symbol: 'DOT', name: 'Polkadot', basePrice: 5.5 },
    { id: 'solana', symbol: 'SOL', name: 'Solana', basePrice: 95 },
    { id: 'polygon', symbol: 'MATIC', name: 'Polygon', basePrice: 0.85 },
    { id: 'chainlink', symbol: 'LINK', name: 'Chainlink', basePrice: 12.5 },
    { id: 'uniswap', symbol: 'UNI', name: 'Uniswap', basePrice: 6.2 }
  ];
  
  cryptos.forEach(crypto => {
    const volatility = (Math.random() - 0.5) * 0.1; // ±5% change
    const price = crypto.basePrice * (1 + volatility);
    const change24h = volatility * 100;
    
    mockData[crypto.symbol] = {
      id: crypto.id,
      symbol: crypto.symbol,
      name: crypto.name,
      price: parseFloat(price.toFixed(crypto.basePrice < 1 ? 4 : 2)),
      change24h: parseFloat(change24h.toFixed(2)),
      marketCap: Math.random() * 100000000000,
      volume24h: Math.random() * 10000000000,
      lastUpdated: new Date().toISOString()
    };
  });
  
  return mockData;
}

module.exports = {
  updateCryptoPrices,
  generateMockCryptoData
};
