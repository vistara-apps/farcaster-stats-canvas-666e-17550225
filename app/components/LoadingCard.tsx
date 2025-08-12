'use client'

export default function LoadingCard() {
  return (
    <div className="relative bg-gradient-to-br from-blue-700 via-indigo-600 to-purple-600 rounded-2xl p-6 shadow-2xl overflow-hidden animate-pulse">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
      </div>
      
      {/* Header Section */}
      <div className="relative flex items-start justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30"></div>
          <div className="flex-1">
            <div className="h-6 bg-white/20 rounded-full w-32 mb-2"></div>
            <div className="h-4 bg-white/10 rounded-full w-24"></div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="h-8 bg-white/20 rounded w-20 mb-1"></div>
          <div className="h-4 bg-white/10 rounded w-16"></div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="relative grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
          <div className="h-4 bg-white/20 rounded w-20 mb-2"></div>
          <div className="h-6 bg-white/30 rounded w-16 mb-1"></div>
          <div className="h-3 bg-white/10 rounded w-12"></div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
          <div className="h-4 bg-white/20 rounded w-16 mb-2"></div>
          <div className="h-5 bg-white/30 rounded w-20 mb-1"></div>
          <div className="h-3 bg-white/10 rounded w-14"></div>
        </div>
      </div>

      {/* Activity Section */}
      <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 mb-6">
        <div className="flex justify-between items-center mb-3">
          <div className="h-4 bg-white/20 rounded w-24"></div>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        </div>
        <div className="flex justify-between items-center mb-3">
          <div className="h-4 bg-white/20 rounded w-20"></div>
          <div className="h-4 bg-white/20 rounded w-16"></div>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2 mb-2">
          <div className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full w-1/3"></div>
        </div>
        <div className="h-3 bg-white/10 rounded w-24 mx-auto"></div>
      </div>

      {/* Footer */}
      <div className="relative text-center">
        <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
          <div className="h-3 bg-white/20 rounded w-32"></div>
        </div>
      </div>
      
      {/* Loading Indicator */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <p className="text-gray-800 font-medium">Fetching your Base stats...</p>
          </div>
        </div>
      </div>
    </div>
  )
}
