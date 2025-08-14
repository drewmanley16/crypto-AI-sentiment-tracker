import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { CryptoData, SentimentData, HistoricalData, SentimentHistoryData } from '../types'
import SocialFeed from './SocialFeed'
import axios from 'axios'

interface DetailedViewProps {
  crypto: CryptoData[keyof CryptoData]
  sentiment: SentimentData[keyof SentimentData]
}

const API_URL = 'http://localhost:3001'

export default function DetailedView({ crypto, sentiment }: DetailedViewProps) {
  const [priceHistory, setPriceHistory] = useState<HistoricalData[]>([])
  const [sentimentHistory, setSentimentHistory] = useState<SentimentHistoryData[]>([])
  const [timeframe, setTimeframe] = useState<'1D' | '7D' | '30D'>('7D')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (crypto) {
      fetchHistoricalData()
    }
  }, [crypto.symbol, timeframe])

  const fetchHistoricalData = async () => {
    setLoading(true)
    try {
      const days = timeframe === '1D' ? 1 : timeframe === '7D' ? 7 : 30
      
      const [priceResponse, sentimentResponse] = await Promise.all([
        axios.get(`${API_URL}/api/crypto/history/${crypto.symbol}?days=${days}`),
        axios.get(`${API_URL}/api/sentiment/history/${crypto.symbol}?hours=${days * 24}`)
      ])

      if (priceResponse.data.success) {
        setPriceHistory(priceResponse.data.data)
      }
      
      if (sentimentResponse.data.success) {
        setSentimentHistory(sentimentResponse.data.data)
      }
    } catch (error) {
      console.error('Error fetching historical data:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return timeframe === '1D' 
      ? date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const formatPrice = (value: number) => {
    if (value < 1) return `$${value.toFixed(4)}`
    if (value < 100) return `$${value.toFixed(2)}`
    return `$${value.toLocaleString()}`
  }

  return (
    <div className="space-y-6">
      {/* Time Frame Selector */}
      <div className="flex space-x-2">
        {(['1D', '7D', '30D'] as const).map((tf) => (
          <button
            key={tf}
            onClick={() => setTimeframe(tf)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              timeframe === tf
                ? 'bg-accent-100 text-dark-100'
                : 'bg-dark-200 text-dark-500 hover:text-white hover:bg-dark-300'
            }`}
          >
            {tf}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Price Chart */}
        <div className="crypto-card">
          <h3 className="text-lg font-semibold text-white mb-4">Price History</h3>
          {loading ? (
            <div className="h-64 flex items-center justify-center">
              <div className="text-dark-500">Loading chart...</div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={priceHistory}>
                <defs>
                  <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00f5ff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00f5ff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
                <XAxis 
                  dataKey="timestamp" 
                  tickFormatter={formatDate}
                  stroke="#737373"
                />
                <YAxis 
                  tickFormatter={formatPrice}
                  stroke="#737373"
                />
                <Tooltip 
                  formatter={([value]: [number]) => [formatPrice(value), 'Price']}
                  labelFormatter={(label) => formatDate(label)}
                  contentStyle={{
                    backgroundColor: '#2d2d2d',
                    border: '1px solid #404040',
                    borderRadius: '8px',
                    color: '#ffffff'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="#00f5ff"
                  strokeWidth={2}
                  fill="url(#priceGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Sentiment Chart */}
        <div className="crypto-card">
          <h3 className="text-lg font-semibold text-white mb-4">Sentiment History</h3>
          {loading ? (
            <div className="h-64 flex items-center justify-center">
              <div className="text-dark-500">Loading chart...</div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={sentimentHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
                <XAxis 
                  dataKey="timestamp" 
                  tickFormatter={formatDate}
                  stroke="#737373"
                />
                <YAxis 
                  domain={[-1, 1]}
                  stroke="#737373"
                />
                <Tooltip 
                  formatter={([value]: [number]) => [(value * 100).toFixed(1) + '%', 'Sentiment']}
                  labelFormatter={(label) => formatDate(label)}
                  contentStyle={{
                    backgroundColor: '#2d2d2d',
                    border: '1px solid #404040',
                    borderRadius: '8px',
                    color: '#ffffff'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="sentiment"
                  stroke="#00ff88"
                  strokeWidth={2}
                  dot={{ fill: '#00ff88', r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Social Media Feed */}
      {sentiment && sentiment.recentPosts && (
        <div className="crypto-card">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Social Sentiment</h3>
          <SocialFeed posts={sentiment.recentPosts} />
        </div>
      )}
    </div>
  )
}
