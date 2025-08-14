import { useState, useEffect } from 'react'
import Dashboard from './components/Dashboard'
import Header from './components/Header'
import { CryptoData, SentimentData } from './types'
import { useCryptoData } from './hooks/useCryptoData'
import { useSentimentData } from './hooks/useSentimentData'

function App() {
  const { cryptoData, loading: cryptoLoading } = useCryptoData()
  const { sentimentData, loading: sentimentLoading } = useSentimentData()
  const [selectedCrypto, setSelectedCrypto] = useState<string>('BTC')

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Dashboard 
          cryptoData={cryptoData}
          sentimentData={sentimentData}
          loading={cryptoLoading || sentimentLoading}
          selectedCrypto={selectedCrypto}
          onCryptoSelect={setSelectedCrypto}
        />
      </main>
    </div>
  )
}

export default App
