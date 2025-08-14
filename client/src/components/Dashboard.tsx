import { CryptoData, SentimentData } from '../types'
import CryptoGrid from './CryptoGrid'
import SentimentOverview from './SentimentOverview'
import DetailedView from './DetailedView'
import LoadingSpinner from './LoadingSpinner'

interface DashboardProps {
  cryptoData: CryptoData
  sentimentData: SentimentData
  loading: boolean
  selectedCrypto: string
  onCryptoSelect: (symbol: string) => void
}

export default function Dashboard({
  cryptoData,
  sentimentData,
  loading,
  selectedCrypto,
  onCryptoSelect,
}: DashboardProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Overview Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
            <span className="text-glow">💰</span>
            <span className="ml-2">Live Crypto Prices</span>
          </h2>
          <CryptoGrid 
            cryptoData={cryptoData}
            selectedCrypto={selectedCrypto}
            onCryptoSelect={onCryptoSelect}
          />
        </div>
        
        <div>
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
            <span className="text-glow">😊</span>
            <span className="ml-2">Market Sentiment</span>
          </h2>
          <SentimentOverview 
            sentimentData={sentimentData}
            selectedCrypto={selectedCrypto}
            onCryptoSelect={onCryptoSelect}
          />
        </div>
      </div>

      {/* Detailed Analysis Section */}
      {selectedCrypto && cryptoData[selectedCrypto] && (
        <div>
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
            <span className="text-glow">📊</span>
            <span className="ml-2">
              Detailed Analysis - {cryptoData[selectedCrypto].name} ({selectedCrypto})
            </span>
          </h2>
          <DetailedView 
            crypto={cryptoData[selectedCrypto]}
            sentiment={sentimentData[selectedCrypto]}
          />
        </div>
      )}
    </div>
  )
}
