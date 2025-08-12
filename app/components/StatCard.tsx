
'use client'

import type { UserStats } from '../lib/mockData'
import { TrendingUp, Zap, Calendar, Coins } from 'lucide-react'

interface StatCardProps {
  stats: UserStats
  theme?: string
  className?: string
}

export function StatCard({ stats, theme = 'default', className = '' }: StatCardProps) {
  const getThemeStyles = () => {
    switch (theme) {
      case 'ocean':
        return 'bg-gradient-to-br from-blue-500 to-cyan-400 text-white'
      case 'sunset':
        return 'bg-gradient-to-br from-orange-400 to-pink-500 text-white'
      case 'forest':
        return 'bg-gradient-to-br from-green-500 to-emerald-400 text-white'
      default:
        return 'bg-gradient-to-br from-primary to-accent text-white'
    }
  }

  return (
    <div className={`${getThemeStyles()} rounded-lg p-6 shadow-card ${className}`}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">{stats.ensName || stats.address}</h3>
          <div className="text-xs opacity-80">Base Network</div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Coins className="w-4 h-4" />
              <span className="text-sm opacity-80">Balance</span>
            </div>
            <div className="text-2xl font-bold">{stats.ethBalance} ETH</div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm opacity-80">Transactions</span>
            </div>
            <div className="text-2xl font-bold">{stats.totalTransactions}</div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4" />
              <span className="text-sm opacity-80">Gas Used</span>
            </div>
            <div className="text-lg font-bold">{stats.totalGasUsed}</div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span className="text-sm opacity-80">First TX</span>
            </div>
            <div className="text-sm font-medium">{stats.firstTransactionDate}</div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-4">
          <div className="text-xs opacity-60 text-center">
            Generated with Farcaster Stats Canvas
          </div>
        </div>
      </div>
    </div>
  )
}
