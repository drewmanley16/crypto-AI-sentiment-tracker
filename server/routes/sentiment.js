const express = require('express');
const router = express.Router();

// Get current sentiment data
router.get('/current', (req, res) => {
  try {
    res.json({
      success: true,
      data: global.sentimentData || {}
    });
  } catch (error) {
    console.error('Error fetching sentiment data:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch sentiment data'
    });
  }
});

// Get sentiment history for a specific crypto
router.get('/history/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    const { hours = 24 } = req.query;
    
    // Generate mock sentiment history
    const mockSentimentHistory = generateMockSentimentHistory(symbol, hours);
    
    res.json({
      success: true,
      data: mockSentimentHistory
    });
  } catch (error) {
    console.error('Error fetching sentiment history:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch sentiment history'
    });
  }
});

// Get recent tweets/posts for a crypto
router.get('/posts/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    const { limit = 10 } = req.query;
    
    // Generate mock social media posts
    const mockPosts = generateMockSocialPosts(symbol, limit);
    
    res.json({
      success: true,
      data: mockPosts
    });
  } catch (error) {
    console.error('Error fetching social posts:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch social posts'
    });
  }
});

function generateMockSentimentHistory(symbol, hours) {
  const data = [];
  const now = new Date();
  
  for (let i = hours; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - (i * 60 * 60 * 1000));
    const sentiment = Math.random() * 2 - 1; // -1 to 1 range
    
    data.push({
      timestamp: timestamp.toISOString(),
      sentiment: parseFloat(sentiment.toFixed(3)),
      volume: Math.floor(Math.random() * 1000) + 100,
      positive: Math.floor(Math.random() * 50) + 20,
      negative: Math.floor(Math.random() * 30) + 10,
      neutral: Math.floor(Math.random() * 40) + 30
    });
  }
  
  return data;
}

function generateMockSocialPosts(symbol, limit) {
  const posts = [];
  const templates = [
    `${symbol} is looking bullish today! 🚀`,
    `Just bought more ${symbol}, to the moon! 🌕`,
    `${symbol} dip incoming? Time to buy more 💎`,
    `Bearish on ${symbol} for now, waiting for better entry`,
    `${symbol} breaking resistance! This could be big`,
    `Not feeling confident about ${symbol} right now`,
    `${symbol} has strong fundamentals, holding long term`,
    `Taking profits on ${symbol}, been a good run`,
    `${symbol} news looking positive lately`,
    `Market manipulation on ${symbol}? Something feels off`
  ];
  
  for (let i = 0; i < limit; i++) {
    const template = templates[Math.floor(Math.random() * templates.length)];
    const sentiment = Math.random() * 2 - 1;
    const timestamp = new Date(Date.now() - (Math.random() * 24 * 60 * 60 * 1000));
    
    posts.push({
      id: `post_${i}_${Date.now()}`,
      text: template,
      sentiment: parseFloat(sentiment.toFixed(3)),
      timestamp: timestamp.toISOString(),
      platform: Math.random() > 0.5 ? 'twitter' : 'reddit',
      author: `user${Math.floor(Math.random() * 10000)}`,
      likes: Math.floor(Math.random() * 500),
      retweets: Math.floor(Math.random() * 100)
    });
  }
  
  return posts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

module.exports = router;
