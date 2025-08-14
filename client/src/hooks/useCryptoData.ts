import { useState, useEffect } from 'react'
import axios from 'axios'
import io from 'socket.io-client'
import { CryptoData } from '../types'

const API_URL = 'http://localhost:3001'

export function useCryptoData() {
  const [cryptoData, setCryptoData] = useState<CryptoData>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Initial data fetch
    fetchCryptoData()

    // Setup socket connection for real-time updates
    const socket = io(API_URL)

    socket.on('cryptoUpdate', (data: CryptoData) => {
      setCryptoData(data)
      setLoading(false)
    })

    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error)
      setError('Failed to connect to real-time updates')
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  const fetchCryptoData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/crypto/prices`)
      if (response.data.success) {
        setCryptoData(response.data.data)
      }
      setLoading(false)
    } catch (err) {
      console.error('Error fetching crypto data:', err)
      setError('Failed to fetch crypto data')
      setLoading(false)
    }
  }

  return { cryptoData, loading, error, refetch: fetchCryptoData }
}
