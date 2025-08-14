import { SocialPost } from '../types'
import { Heart, MessageCircle, Repeat } from 'lucide-react'

interface SocialFeedProps {
  posts: SocialPost[]
}

export default function SocialFeed({ posts }: SocialFeedProps) {
  const getSentimentColor = (sentiment: number) => {
    if (sentiment > 0.2) return 'text-bullish'
    if (sentiment < -0.2) return 'text-bearish'
    return 'text-dark-500'
  }

  const getSentimentEmoji = (sentiment: number) => {
    if (sentiment > 0.5) return '🚀'
    if (sentiment > 0.2) return '😊'
    if (sentiment > -0.2) return '😐'
    if (sentiment > -0.5) return '😞'
    return '💀'
  }

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date()
    const postTime = new Date(timestamp)
    const diffMs = now.getTime() - postTime.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffMinutes = Math.floor(diffMs / (1000 * 60))

    if (diffHours > 0) {
      return `${diffHours}h ago`
    } else if (diffMinutes > 0) {
      return `${diffMinutes}m ago`
    } else {
      return 'Just now'
    }
  }

  const getPlatformIcon = (platform: string) => {
    return platform === 'twitter' ? '🐦' : '🤖'
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center text-dark-500 py-8">
        No recent social media posts available
      </div>
    )
  }

  return (
    <div className="space-y-4 max-h-96 overflow-y-auto">
      {posts.slice(0, 10).map((post) => (
        <div
          key={post.id}
          className="bg-dark-200/50 border border-dark-400 rounded-lg p-4 hover:bg-dark-200/70 transition-colors"
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center space-x-2">
              <span className="text-sm">{getPlatformIcon(post.platform)}</span>
              <span className="text-dark-500 text-sm">@{post.author}</span>
              <span className="text-dark-600 text-xs">•</span>
              <span className="text-dark-600 text-xs">{formatTimeAgo(post.timestamp)}</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <span className="text-sm">{getSentimentEmoji(post.sentiment)}</span>
              <span className={`text-xs font-medium ${getSentimentColor(post.sentiment)}`}>
                {(post.sentiment * 100).toFixed(0)}%
              </span>
            </div>
          </div>
          
          <p className="text-white text-sm leading-relaxed mb-3">
            {post.text}
          </p>
          
          <div className="flex items-center space-x-4 text-dark-500">
            <div className="flex items-center space-x-1 text-xs">
              <Heart className="w-3 h-3" />
              <span>{post.engagement.likes}</span>
            </div>
            <div className="flex items-center space-x-1 text-xs">
              <Repeat className="w-3 h-3" />
              <span>{post.engagement.retweets}</span>
            </div>
            <div className="flex items-center space-x-1 text-xs">
              <MessageCircle className="w-3 h-3" />
              <span>{post.engagement.replies}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
