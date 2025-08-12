'use client'

export default function StatsCard({ stats, config }) {
  const getThemeColors = (theme) => {
    switch (theme) {
      case 'ocean':
        return {
          bg: 'from-blue-500 to-cyan-400',
          text: 'text-white',
          accent: 'text-cyan-100'
        }
      case 'sunset':
        return {
          bg: 'from-orange-500 to-pink-500',
          text: 'text-white',
          accent: 'text-orange-100'
        }
      case 'forest':
        return {
          bg: 'from-green-600 to-emerald-500',
          text: 'text-white',
          accent: 'text-green-100'
        }
      default:
        return {
          bg: 'from-blue-600 to-purple-600',
          text: 'text-white',
          accent: 'text-blue-100'
        }
    }
  }

  const theme = getThemeColors(config.colorTheme)

  return (
    <div className={`bg-gradient-to-br ${theme.bg} rounded-lg p-6 shadow-card`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          {config.showAvatar && (
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-lg font-bold text-white">
                {stats.ensName ? stats.ensName[0].toUpperCase() : stats.address.slice(2, 4).toUpperCase()}
              </span>
            </div>
          )}
          <div>
            {config.showENS && stats.ensName && (
              <h3 className={`text-lg font-bold ${theme.text}`}>{stats.ensName}</h3>
            )}
            <p className={`text-sm ${theme.accent} font-mono`}>
              {stats.address.slice(0, 6)}...{stats.address.slice(-4)}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className={`text-2xl font-bold ${theme.text}`}>{stats.ethBalance} ETH</p>
          <p className={`text-sm ${theme.accent}`}>Balance</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/10 rounded-lg p-4">
          <p className={`text-2xl font-bold ${theme.text}`}>{stats.totalTransactions}</p>
          <p className={`text-sm ${theme.accent}`}>Total Transactions</p>
        </div>
        <div className="bg-white/10 rounded-lg p-4">
          <p className={`text-sm font-semibold ${theme.text}`}>
            {new Date(stats.firstTransactionDate).toLocaleDateString()}
          </p>
          <p className={`text-sm ${theme.accent}`}>First Transaction</p>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-white/20">
        <div className="flex justify-between items-center">
          <p className={`text-sm ${theme.accent}`}>Last Activity</p>
          <p className={`text-sm font-medium ${theme.text}`}>
            {new Date(stats.lastTransactionDate).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className={`text-xs ${theme.accent}`}>Generated with Farcaster Stats Canvas</p>
      </div>
    </div>
  )
}
