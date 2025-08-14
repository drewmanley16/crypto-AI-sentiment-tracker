import { CryptoData } from '../types'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface CryptoGridProps {
  cryptoData: CryptoData
  selectedCrypto: string
  onCryptoSelect: (symbol: string) => void
}

export default function CryptoGrid({ cryptoData, selectedCrypto, onCryptoSelect }: CryptoGridProps) {
  const cryptos = Object.values(cryptoData).sort((a, b) => b.marketCap - a.marketCap)

  const formatPrice = (price: number) => {
    if (price < 1) return `$${price.toFixed(4)}`
    if (price < 100) return `$${price.toFixed(2)}`
    return `$${price.toLocaleString()}`
  }

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1e12) return `$${(marketCap / 1e12).toFixed(2)}T`
    if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(2)}B`
    if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(2)}M`
    return `$${marketCap.toLocaleString()}`
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {cryptos.map((crypto) => {
        const isSelected = crypto.symbol === selectedCrypto
        const isPositive = crypto.change24h > 0
        
        return (
          <div
            key={crypto.symbol}
            onClick={() => onCryptoSelect(crypto.symbol)}
            className={`crypto-card cursor-pointer transition-all duration-300 ${
              isSelected 
                ? 'ring-2 ring-accent-100 shadow-lg shadow-accent-100/20' 
                : 'hover:shadow-lg'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-accent-200 to-accent-400 rounded-full flex items-center justify-center text-dark-100 font-bold">
                  {crypto.symbol.slice(0, 2)}
                </div>
                <div>
                  <h3 className="font-semibold text-white">{crypto.symbol}</h3>
                  <p className="text-sm text-dark-500">{crypto.name}</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-semibold text-white text-lg">
                  {formatPrice(crypto.price)}
                </p>
                <div className={`flex items-center space-x-1 text-sm ${
                  isPositive ? 'text-bullish bullish' : 'text-bearish bearish'
                }`}>
                  {isPositive ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span>{isPositive ? '+' : ''}{crypto.change24h.toFixed(2)}%</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between text-sm text-dark-500">
              <span>Market Cap</span>
              <span>{formatMarketCap(crypto.marketCap)}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
