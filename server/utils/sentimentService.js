const Sentiment = require('sentiment');

const sentiment = new Sentiment();

// Mock social media data since we don't have Twitter API access
const CRYPTO_KEYWORDS = ['bitcoin', 'btc', 'ethereum', 'eth', 'cardano', 'ada', 'polkadot', 'dot', 'solana', 'sol', 'polygon', 'matic', 'chainlink', 'link', 'uniswap', 'uni'];

async function updateSentimentData() {
  try {
    const sentimentData = {};
    
    // Generate sentiment data for each crypto
    for (const keyword of CRYPTO_KEYWORDS) {
      const symbol = getSymbolFromKeyword(keyword);
      if (symbol) {
        const posts = generateMockSocialPosts(keyword, 50);
        const analysis = analyzeSentiment(posts);
        
        sentimentData[symbol] = {
          symbol,
          overall: analysis.overall,
          positive: analysis.positive,
          negative: analysis.negative,
          neutral: analysis.neutral,
          volume: analysis.volume,
          trend: analysis.trend,
          lastUpdated: new Date().toISOString(),
          recentPosts: posts.slice(0, 10) // Only keep recent 10 posts
        };
      }
    }

    // Store globally and emit to connected clients
    global.sentimentData = sentimentData;
    
    if (global.io) {
      global.io.emit('sentimentUpdate', sentimentData);
    }

    return sentimentData;
    
  } catch (error) {
    console.error('Error updating sentiment data:', error);
    
    // Fallback to basic mock data
    const mockData = generateBasicSentimentData();
    global.sentimentData = mockData;
    
    if (global.io) {
      global.io.emit('sentimentUpdate', mockData);
    }
    
    return mockData;
  }
}

function getSymbolFromKeyword(keyword) {
  const keywordToSymbol = {
    'bitcoin': 'BTC',
    'btc': 'BTC',
    'ethereum': 'ETH',
    'eth': 'ETH',
    'cardano': 'ADA',
    'ada': 'ADA',
    'polkadot': 'DOT',
    'dot': 'DOT',
    'solana': 'SOL',
    'sol': 'SOL',
    'polygon': 'MATIC',
    'matic': 'MATIC',
    'chainlink': 'LINK',
    'link': 'LINK',
    'uniswap': 'UNI',
    'uni': 'UNI'
  };
  
  return keywordToSymbol[keyword.toLowerCase()];
}

function generateMockSocialPosts(keyword, count) {
  const posts = [];
  const templates = [
    `${keyword} is looking bullish today! 🚀 #crypto`,
    `Just bought more ${keyword}, to the moon! 🌕`,
    `${keyword} dip incoming? Time to buy more 💎🙌`,
    `Bearish on ${keyword} for now, waiting for better entry`,
    `${keyword} breaking resistance! This could be big 📈`,
    `Not feeling confident about ${keyword} right now 📉`,
    `${keyword} has strong fundamentals, holding long term`,
    `Taking profits on ${keyword}, been a good run`,
    `${keyword} news looking positive lately`,
    `Market manipulation on ${keyword}? Something feels off`,
    `${keyword} whale activity detected 🐋`,
    `DCA into ${keyword} every week, best strategy`,
    `${keyword} partnerships looking promising`,
    `Regulation fears affecting ${keyword} price`,
    `${keyword} technical analysis shows support here`,
    `Selling ${keyword} before it drops more`,
    `${keyword} community is amazing! 💪`,
    `FUD around ${keyword} is getting ridiculous`,
    `${keyword} use cases are expanding rapidly`,
    `Institutional adoption of ${keyword} growing`
  ];
  
  for (let i = 0; i < count; i++) {
    const template = templates[Math.floor(Math.random() * templates.length)];
    const timestamp = new Date(Date.now() - (Math.random() * 24 * 60 * 60 * 1000));
    
    // Analyze sentiment of the post
    const analysis = sentiment.analyze(template);
    
    posts.push({
      id: `post_${i}_${Date.now()}`,
      text: template,
      sentiment: normalizeSentiment(analysis.score),
      timestamp: timestamp.toISOString(),
      platform: Math.random() > 0.5 ? 'twitter' : 'reddit',
      author: `user${Math.floor(Math.random() * 10000)}`,
      engagement: {
        likes: Math.floor(Math.random() * 500),
        retweets: Math.floor(Math.random() * 100),
        replies: Math.floor(Math.random() * 50)
      }
    });
  }
  
  return posts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

function analyzeSentiment(posts) {
  let totalSentiment = 0;
  let positive = 0;
  let negative = 0;
  let neutral = 0;
  
  posts.forEach(post => {
    totalSentiment += post.sentiment;
    
    if (post.sentiment > 0.1) {
      positive++;
    } else if (post.sentiment < -0.1) {
      negative++;
    } else {
      neutral++;
    }
  });
  
  const overall = posts.length > 0 ? totalSentiment / posts.length : 0;
  
  // Calculate trend (simplified - based on recent vs older posts)
  const recentPosts = posts.slice(0, Math.floor(posts.length / 3));
  const olderPosts = posts.slice(Math.floor(posts.length * 2 / 3));
  
  const recentAvg = recentPosts.length > 0 ? 
    recentPosts.reduce((sum, post) => sum + post.sentiment, 0) / recentPosts.length : 0;
  const olderAvg = olderPosts.length > 0 ? 
    olderPosts.reduce((sum, post) => sum + post.sentiment, 0) / olderPosts.length : 0;
  
  const trend = recentAvg - olderAvg;
  
  return {
    overall: parseFloat(overall.toFixed(3)),
    positive,
    negative,
    neutral,
    volume: posts.length,
    trend: parseFloat(trend.toFixed(3))
  };
}

function normalizeSentiment(score) {
  // Normalize sentiment score to -1 to 1 range
  // Sentiment library typically returns scores from -10 to 10
  return Math.max(-1, Math.min(1, score / 5));
}

function generateBasicSentimentData() {
  const symbols = ['BTC', 'ETH', 'ADA', 'DOT', 'SOL', 'MATIC', 'LINK', 'UNI'];
  const sentimentData = {};
  
  symbols.forEach(symbol => {
    const overall = (Math.random() - 0.5) * 2; // -1 to 1
    const volume = Math.floor(Math.random() * 1000) + 100;
    
    sentimentData[symbol] = {
      symbol,
      overall: parseFloat(overall.toFixed(3)),
      positive: Math.floor(volume * 0.4 * Math.random()),
      negative: Math.floor(volume * 0.3 * Math.random()),
      neutral: Math.floor(volume * 0.5 * Math.random()),
      volume,
      trend: (Math.random() - 0.5) * 0.5,
      lastUpdated: new Date().toISOString(),
      recentPosts: []
    };
  });
  
  return sentimentData;
}

module.exports = {
  updateSentimentData,
  analyzeSentiment,
  generateMockSocialPosts
};
