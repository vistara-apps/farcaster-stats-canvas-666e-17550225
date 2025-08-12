'use client'

import { TrendingUp, Calendar, Wallet, Activity } from 'lucide-react'

export default function StatsCard({ stats, config }) {
  const getThemeColors = (theme) => {
    switch (theme) {
      case 'ocean':
        return {
          bg: 'from-blue-600 via-blue-500 to-cyan-400',
          text: 'text-white',
          accent: 'text-cyan-100',
          highlight: 'bg-cyan-400/20',
          border: 'border-cyan-300/30'
        }
      case 'sunset':
        return {
          bg: 'from-orange-600 via-pink-500 to-rose-400',
          text: 'text-white',
          accent: 'text-orange-100',
          highlight: 'bg-orange-400/20',
          border: 'border-orange-300/30'
        }
      case 'forest':
        return {
          bg: 'from-emerald-700 via-green-600 to-teal-500',
          text: 'text-white',
          accent: 'text-emerald-100',
          highlight: 'bg-emerald-400/20',
          border: 'border-emerald-300/30'
        }
      case 'cosmic':
        return {
          bg: 'from-purple-700 via-violet-600 to-indigo-500',
          text: 'text-white',
          accent: 'text-purple-100',
          highlight: 'bg-purple-400/20',
          border: 'border-purple-300/30'
        }
      case 'fire':
        return {
          bg: 'from-red-600 via-orange-500 to-yellow-400',
          text: 'text-white',
          accent: 'text-red-100',
          highlight: 'bg-red-400/20',
          border: 'border-red-300/30'
        }
      default:
        return {
          bg: 'from-blue-700 via-indigo-600 to-purple-600',
          text: 'text-white',
          accent: 'text-blue-100',
          highlight: 'bg-blue-400/20',
          border: 'border-blue-300/30'
        }
    }
  }

  const theme = getThemeColors(config.colorTheme)
  
  // Calculate days since first transaction
  const daysSinceFirst = Math.floor(
    (new Date() - new Date(stats.firstTransactionDate)) / (1000 * 60 * 60 * 24)
  )
  
  // Calculate average transactions per day
  const avgTxPerDay = daysSinceFirst > 0 ? (stats.totalTransactions / daysSinceFirst).toFixed(1) : '0'

  return (
    <div className={`relative bg-gradient-to-br ${theme.bg} rounded-2xl p-6 shadow-2xl overflow-hidden animate-scale-up`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
      </div>
      
      {/* Header Section */}
      <div className="relative flex items-start justify-between mb-8">
        <div className="flex items-center space-x-4">
          {config.showAvatar && (
            <div className="relative">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                <span className="text-xl font-bold text-white">
                  {stats.ensName ? stats.ensName[0].toUpperCase() : stats.address.slice(2, 4).toUpperCase()}
                </span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
                <Activity className="w-3 h-3 text-white" />
              </div>
            </div>
          )}
          <div className="flex-1">
            {config.showENS && stats.ensName && (
              <h3 className={`text-xl font-bold ${theme.text} mb-1`}>{stats.ensName}</h3>
            )}
            <p className={`text-sm ${theme.accent} font-mono bg-white/10 px-3 py-1 rounded-full inline-block`}>
              {stats.address.slice(0, 6)}...{stats.address.slice(-4)}
            </p>
          </div>
        </div>
        
        {/* Balance Display */}
        <div className="text-right">
          <div className="flex items-center justify-end space-x-2 mb-1">
            <Wallet className={`w-5 h-5 ${theme.accent}`} />
            <p className={`text-3xl font-bold ${theme.text}`}>{stats.ethBalance}</p>
          </div>
          <p className={`text-sm ${theme.accent} uppercase tracking-wide`}>ETH Balance</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="relative grid grid-cols-2 gap-4 mb-6">
        <div className={`${theme.highlight} backdrop-blur-sm rounded-xl p-4 ${theme.border} border`}>
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className={`w-5 h-5 ${theme.accent}`} />
            <p className={`text-sm ${theme.accent} uppercase tracking-wide`}>Total Txns</p>
          </div>
          <p className={`text-2xl font-bold ${theme.text}`}>{stats.totalTransactions.toLocaleString()}</p>
          <p className={`text-xs ${theme.accent} mt-1`}>{avgTxPerDay} avg/day</p>
        </div>
        
        <div className={`${theme.highlight} backdrop-blur-sm rounded-xl p-4 ${theme.border} border`}>
          <div className="flex items-center space-x-2 mb-2">
            <Calendar className={`w-5 h-5 ${theme.accent}`} />
            <p className={`text-sm ${theme.accent} uppercase tracking-wide`}>First Txn</p>
          </div>
          <p className={`text-sm font-semibold ${theme.text}`}>
            {new Date(stats.firstTransactionDate).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric',
              year: 'numeric'
            })}
          </p>
          <p className={`text-xs ${theme.accent} mt-1`}>{daysSinceFirst} days ago</p>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className={`relative ${theme.highlight} backdrop-blur-sm rounded-xl p-4 ${theme.border} border mb-6`}>
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center space-x-2">
            <Activity className={`w-4 h-4 ${theme.accent}`} />
            <p className={`text-sm ${theme.accent} uppercase tracking-wide`}>Recent Activity</p>
          </div>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        </div>
        <div className="flex justify-between items-center">
          <p className={`text-sm font-medium ${theme.text}`}>Last Transaction</p>
          <p className={`text-sm font-semibold ${theme.text}`}>
            {new Date(stats.lastTransactionDate).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric'
            })}
          </p>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-3 w-full bg-white/10 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full transition-all duration-1000"
            style={{ width: `${Math.min((stats.totalTransactions / 200) * 100, 100)}%` }}
          ></div>
        </div>
        <p className={`text-xs ${theme.accent} mt-2 text-center`}>
          Activity Level: {stats.totalTransactions > 100 ? 'High' : stats.totalTransactions > 50 ? 'Medium' : 'Getting Started'}
        </p>
      </div>

      {/* Footer */}
      <div className="relative text-center">
        <div className={`inline-flex items-center space-x-2 ${theme.highlight} backdrop-blur-sm px-4 py-2 rounded-full ${theme.border} border`}>
          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
          <p className={`text-xs ${theme.accent} font-medium`}>Generated with Farcaster Stats Canvas</p>
        </div>
      </div>
    </div>
  )
}
