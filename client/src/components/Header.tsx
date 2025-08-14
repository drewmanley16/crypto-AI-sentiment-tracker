import { Activity, TrendingUp, BarChart3 } from 'lucide-react'

export default function Header() {
  return (
    <header className="border-b border-dark-400 bg-dark-100/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-accent-100 to-accent-300 rounded-lg flex items-center justify-center animate-glow">
                <Activity className="w-6 h-6 text-dark-100" />
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">
                  Crypto Mood Tracker
                </h1>
                <p className="text-dark-500 text-sm">
                  Real-time sentiment analysis & crypto prices
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-dark-500">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">Live Data</span>
              <div className="w-2 h-2 bg-bullish rounded-full animate-pulse"></div>
            </div>
            
            <div className="flex items-center space-x-2 text-dark-500">
              <BarChart3 className="w-4 h-4" />
              <span className="text-sm">Sentiment Analysis</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
