export interface CryptoData {
  [symbol: string]: {
    id: string;
    symbol: string;
    name: string;
    price: number;
    change24h: number;
    marketCap: number;
    volume24h: number;
    lastUpdated: string;
  };
}

export interface SentimentData {
  [symbol: string]: {
    symbol: string;
    overall: number; // -1 to 1 range
    positive: number;
    negative: number;
    neutral: number;
    volume: number;
    trend: number; // trending sentiment
    lastUpdated: string;
    recentPosts: SocialPost[];
  };
}

export interface SocialPost {
  id: string;
  text: string;
  sentiment: number;
  timestamp: string;
  platform: 'twitter' | 'reddit';
  author: string;
  engagement: {
    likes: number;
    retweets: number;
    replies: number;
  };
}

export interface HistoricalData {
  timestamp: string;
  price: number;
  volume: number;
}

export interface SentimentHistoryData {
  timestamp: string;
  sentiment: number;
  volume: number;
  positive: number;
  negative: number;
  neutral: number;
}
