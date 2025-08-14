const express = require('express');
const router = express.Router();

// Get current crypto prices and data
router.get('/prices', (req, res) => {
  try {
    res.json({
      success: true,
      data: global.cryptoData || {}
    });
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch crypto prices'
    });
  }
});

// Get historical price data for a specific crypto
router.get('/history/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    const { days = 7 } = req.query;
    
    // This would typically fetch from a database or cache
    // For now, return mock historical data
    const mockHistoricalData = generateMockHistoricalData(symbol, days);
    
    res.json({
      success: true,
      data: mockHistoricalData
    });
  } catch (error) {
    console.error('Error fetching historical data:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch historical data'
    });
  }
});

function generateMockHistoricalData(symbol, days) {
  const data = [];
  const now = new Date();
  const basePrice = getBasePriceForSymbol(symbol);
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(now.getTime() - (i * 24 * 60 * 60 * 1000));
    const volatility = Math.random() * 0.1 - 0.05; // ±5% volatility
    const price = basePrice * (1 + volatility);
    
    data.push({
      timestamp: date.toISOString(),
      price: parseFloat(price.toFixed(2)),
      volume: Math.random() * 1000000000
    });
  }
  
  return data;
}

function getBasePriceForSymbol(symbol) {
  const basePrices = {
    'BTC': 45000,
    'ETH': 2500,
    'ADA': 0.45,
    'DOT': 5.5,
    'SOL': 95,
    'MATIC': 0.85,
    'LINK': 12.5,
    'UNI': 6.2
  };
  
  return basePrices[symbol.toUpperCase()] || 100;
}

module.exports = router;
