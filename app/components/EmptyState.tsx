'use client'

import { Wallet, TrendingUp, Sparkles } from 'lucide-react'

export default function EmptyState() {
  return (
    <div className="text-center py-12 px-6">
      <div className="relative mb-8">
        {/* Floating Icons */}
        <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center animate-bounce">
          <Wallet className="w-4 h-4 text-blue-600" />
        </div>
        <div className="absolute -top-2 -right-6 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center animate-bounce delay-150">
          <TrendingUp className="w-3 h-3 text-purple-600" />
        </div>
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-cyan-100 rounded-full flex items-center justify-center animate-bounce delay-300">
          <Sparkles className="w-2 h-2 text-cyan-600" />
        </div>
        
        {/* Main Illustration */}
        <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-xl">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-3">
        Ready to Generate Your Stats?
      </h3>
      
      <p className="text-gray-600 mb-6 max-w-sm mx-auto leading-relaxed">
        Enter your Base address or ENS name above to create a beautiful, shareable stats card for Farcaster.
      </p>
      
      <div className="space-y-4">
        <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Real-time data</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span>Customizable themes</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            <span>Easy sharing</span>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100">
          <p className="text-sm text-gray-700 font-medium mb-2">💡 Pro Tip</p>
          <p className="text-xs text-gray-600">
            Connect your wallet above for instant access to your address, or manually enter any Base address to explore!
          </p>
        </div>
      </div>
    </div>
  )
}
