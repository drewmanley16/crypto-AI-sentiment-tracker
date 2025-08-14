import { SentimentData } from '../types'
import { Smile, Frown, Meh, TrendingUp, TrendingDown } from 'lucide-react'

interface SentimentOverviewProps {
  sentimentData: SentimentData
  selectedCrypto: string
  onCryptoSelect: (symbol: string) => void
}

export default function SentimentOverview({ 
  sentimentData, 
  selectedCrypto, 
  onCryptoSelect 
}: SentimentOverviewProps) {
  const sentiments = Object.values(sentimentData).sort((a, b) => b.volume - a.volume)

  const getSentimentIcon = (sentiment: number) => {
    if (sentiment > 0.2) return <Smile className="w-5 h-5 text-bullish" />
    if (sentiment < -0.2) return <Frown className="w-5 h-5 text-bearish" />
    return <Meh className="w-5 h-5 text-dark-500" />
  }

  const getSentimentColor = (sentiment: number) => {
    if (sentiment > 0.2) return 'text-bullish'
    if (sentiment < -0.2) return 'text-bearish'
    return 'text-dark-500'
  }

  const getSentimentLabel = (sentiment: number) => {
    if (sentiment > 0.5) return 'Very Bullish'
    if (sentiment > 0.2) return 'Bullish'
    if (sentiment > -0.2) return 'Neutral'
    if (sentiment > -0.5) return 'Bearish'
    return 'Very Bearish'
  }

  const formatSentimentScore = (score: number) => {
    return (score * 100).toFixed(1)
  }

  return (
    <div className="space-y-4">
      {sentiments.map((sentiment) => {
        const isSelected = sentiment.symbol === selectedCrypto
        const isPositiveTrend = sentiment.trend > 0
        
        return (
          <div
            key={sentiment.symbol}
            onClick={() => onCryptoSelect(sentiment.symbol)}
            className={`crypto-card cursor-pointer transition-all duration-300 ${
              isSelected 
                ? 'ring-2 ring-accent-100 shadow-lg shadow-accent-100/20' 
                : 'hover:shadow-lg'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-accent-200 to-accent-400 rounded-full flex items-center justify-center text-dark-100 font-bold">
                  {sentiment.symbol.slice(0, 2)}
                </div>
                <div>
                  <h3 className="font-semibold text-white">{sentiment.symbol}</h3>
                  <div className="flex items-center space-x-1">
                    {getSentimentIcon(sentiment.overall)}
                    <span className={`text-sm ${getSentimentColor(sentiment.overall)}`}>
                      {getSentimentLabel(sentiment.overall)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <p className={`font-semibold text-lg ${getSentimentColor(sentiment.overall)}`}>
                  {formatSentimentScore(sentiment.overall)}
                </p>
                <div className={`flex items-center space-x-1 text-sm ${
                  isPositiveTrend ? 'text-bullish' : 'text-bearish'
                }`}>
                  {isPositiveTrend ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span>{isPositiveTrend ? '+' : ''}{(sentiment.trend * 100).toFixed(1)}%</span>
                </div>
              </div>
            </div>
            
            {/* Sentiment Distribution */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-dark-500">
                <span>Positive: {sentiment.positive}</span>
                <span>Neutral: {sentiment.neutral}</span>
                <span>Negative: {sentiment.negative}</span>
              </div>
              
              <div className="w-full h-2 bg-dark-300 rounded-full overflow-hidden">
                <div className="h-full flex">
                  <div 
                    className="bg-bullish"
                    style={{ 
                      width: `${(sentiment.positive / sentiment.volume) * 100}%` 
                    }}
                  />
                  <div 
                    className="bg-dark-500"
                    style={{ 
                      width: `${(sentiment.neutral / sentiment.volume) * 100}%` 
                    }}
                  />
                  <div 
                    className="bg-bearish"
                    style={{ 
                      width: `${(sentiment.negative / sentiment.volume) * 100}%` 
                    }}
                  />
                </div>
              </div>
              
              <div className="flex justify-between text-xs text-dark-500">
                <span>Volume: {sentiment.volume}</span>
                <span>Updated: {new Date(sentiment.lastUpdated).toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
