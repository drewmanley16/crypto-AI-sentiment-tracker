export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        {/* Outer rotating ring */}
        <div className="w-16 h-16 rounded-full border-4 border-dark-400"></div>
        <div className="absolute top-0 left-0 w-16 h-16 rounded-full border-4 border-transparent border-t-accent-100 animate-spin"></div>
        
        {/* Inner pulsing dot */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-accent-100 rounded-full animate-pulse"></div>
      </div>
      
      <div className="text-center">
        <p className="text-accent-100 font-semibold text-lg">Loading Crypto Mood Data</p>
        <p className="text-dark-500 text-sm">Analyzing market sentiment...</p>
      </div>
    </div>
  )
}
