import { useState, useEffect } from 'react'
import axios from 'axios'
import io from 'socket.io-client'
import { SentimentData } from '../types'

const API_URL = 'http://localhost:3001'

export function useSentimentData() {
  const [sentimentData, setSentimentData] = useState<SentimentData>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Initial data fetch
    fetchSentimentData()

    // Setup socket connection for real-time updates
    const socket = io(API_URL)

    socket.on('sentimentUpdate', (data: SentimentData) => {
      setSentimentData(data)
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

  const fetchSentimentData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/sentiment/current`)
      if (response.data.success) {
        setSentimentData(response.data.data)
      }
      setLoading(false)
    } catch (err) {
      console.error('Error fetching sentiment data:', err)
      setError('Failed to fetch sentiment data')
      setLoading(false)
    }
  }

  return { sentimentData, loading, error, refetch: fetchSentimentData }
}
