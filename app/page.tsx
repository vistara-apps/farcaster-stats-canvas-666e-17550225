'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  useMiniKit,
  useAddFrame,
  useOpenUrl,
  useClose,
  usePrimaryButton,
  useNotification,
  useComposeCast
} from '@coinbase/onchainkit/minikit'
import { Identity, Avatar, Name, Address } from '@coinbase/onchainkit/identity'
import { ConnectWallet, Wallet, WalletDropdown, WalletDropdownDisconnect } from '@coinbase/onchainkit/wallet'
import StatsCard from './components/StatsCard'
import AddressInput from './components/AddressInput'
import ConfiguratorPanel from './components/ConfiguratorPanel'
import LoadingCard from './components/LoadingCard'
import EmptyState from './components/EmptyState'

interface UserStats {
  address: string
  ensName?: string
  ethBalance: string
  totalTransactions: number
  firstTransactionDate: string
  lastTransactionDate: string
}

interface CardConfig {
  colorTheme: 'default' | 'ocean' | 'sunset' | 'forest'
  showAvatar: boolean
  showENS: boolean
}

export default function FarcasterStatsCanvas() {
  const { setFrameReady, isFrameReady, context } = useMiniKit()
  const [userStats, setUserStats] = useState<UserStats | null>(null)
  const [cardConfig, setCardConfig] = useState<CardConfig>({
    colorTheme: 'default',
    showAvatar: true,
    showENS: true
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [inputAddress, setInputAddress] = useState('')
  const [showConfigurator, setShowConfigurator] = useState(false)
  const [isCasting, setIsCasting] = useState(false)

  const addFrame = useAddFrame()
  const openUrl = useOpenUrl()
  const close = useClose()
  const sendNotification = useNotification()
  const { composeCast } = useComposeCast()

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady()
    }
  }, [setFrameReady, isFrameReady])

  const handleAddFrame = useCallback(async () => {
    const result = await addFrame()
    if (result) {
      console.log('Frame added:', result.url, result.token)
    }
  }, [addFrame])

  const fetchUserStats = async (address: string): Promise<UserStats> => {
    // Mock data for demo - in production, integrate with Bitquery API
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    return {
      address,
      ensName: address.endsWith('.eth') ? address : undefined,
      ethBalance: '2.45',
      totalTransactions: 127,
      firstTransactionDate: '2023-08-15',
      lastTransactionDate: '2024-01-20'
    }
  }

  const handleGenerateStats = async () => {
    if (!inputAddress.trim()) {
      setError('Please enter a valid address or ENS name')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const stats = await fetchUserStats(inputAddress.trim())
      setUserStats(stats)
    } catch (err) {
      setError('Failed to fetch stats. Please try again.')
      console.error('Error fetching stats:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCastStats = async () => {
    if (!userStats) return

    setIsCasting(true)
    try {
      const castText = `Just generated my Base on-chain stats! 📊\n\n💰 Balance: ${userStats.ethBalance} ETH\n📈 Transactions: ${userStats.totalTransactions}\n🎯 Active since: ${userStats.firstTransactionDate}\n\nGenerated with Farcaster Stats Canvas`
      
      const result = await composeCast({ text: castText })
      
      if (result) {
        await sendNotification({
          title: 'Stats Cast Successful! 🎉',
          body: 'Your Base on-chain stats have been shared to Farcaster'
        })
      }
    } catch (error) {
      console.error('Failed to cast:', error)
    } finally {
      setIsCasting(false)
    }
  }

  usePrimaryButton(
    { 
      text: userStats ? (isCasting ? 'CASTING...' : 'CAST TO FARCASTER') : 'GENERATE STATS',
      disabled: isLoading || isCasting || (!userStats && !inputAddress.trim())
    },
    userStats ? handleCastStats : handleGenerateStats
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg via-surface to-bg">
      <div className="container mx-auto px-4 py-6 max-w-[500px]">
        <header className="flex justify-between items-center mb-8">
          {context && !context.client.added && (
            <button
              onClick={handleAddFrame}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              ⭐ SAVE FRAME
            </button>
          )}
          <div className="flex space-x-4">
            <button
              onClick={() => openUrl('https://base.org')}
              className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm font-semibold border border-blue-200 hover:border-blue-300 transition-all duration-200 flex items-center space-x-2"
            >
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>BASE</span>
            </button>
            <button
              onClick={close}
              className="bg-gray-50 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold border border-gray-200 hover:border-gray-300 transition-all duration-200"
            >
              CLOSE
            </button>
          </div>
        </header>

        <main className="space-y-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Farcaster Stats Canvas
            </h1>
            <p className="text-base font-normal leading-relaxed text-gray-600">
              Turn your Base on-chain activity into shareable Farcaster casts
            </p>
          </div>

          <div className="bg-surface rounded-lg p-4 shadow-card">
            <Wallet className="mb-4">
              <ConnectWallet>
                <span className="text-sm">Connect Wallet</span>
              </ConnectWallet>
              <WalletDropdown>
                <Identity className="px-4 py-2" hasCopyAddressOnClick>
                  <Avatar className="w-6 h-6" />
                  <Name className="text-sm font-medium" />
                  <Address className="text-xs text-gray-500" />
                </Identity>
                <WalletDropdownDisconnect />
              </WalletDropdown>
            </Wallet>

            <AddressInput
              value={inputAddress}
              onChange={setInputAddress}
              placeholder="Enter Base address or ENS name"
              disabled={isLoading}
            />

            {error && (
              <div className="mt-4 p-4 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-xl animate-slide-up">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 text-sm font-bold">!</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-red-800">Oops! Something went wrong</p>
                    <p className="text-sm text-red-600 mt-1">{error}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {isLoading && <LoadingCard />}

          {!isLoading && !userStats && <EmptyState />}

          {!isLoading && userStats && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Your Stats Card</h2>
                <button
                  onClick={() => setShowConfigurator(!showConfigurator)}
                  className="bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 text-blue-700 px-4 py-2 rounded-xl text-sm font-semibold border border-blue-200 hover:border-blue-300 transition-all duration-200 flex items-center space-x-2"
                >
                  <span className="text-lg">🎨</span>
                  <span>{showConfigurator ? 'Hide Customizer' : 'Customize Card'}</span>
                </button>
              </div>

              {showConfigurator && (
                <div className="animate-slide-up">
                  <ConfiguratorPanel
                    config={cardConfig}
                    onChange={setCardConfig}
                  />
                </div>
              )}

              <StatsCard
                stats={userStats}
                config={cardConfig}
              />
            </div>
          )}
        </main>

        <footer className="mt-12 text-center space-y-4">
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>Powered by Base</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>Built with MiniKit</span>
            </div>
          </div>
          <button
            onClick={() => openUrl('https://docs.base.org/base-camp/docs/minikit/overview')}
            className="inline-flex items-center space-x-2 bg-gray-50 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-xs font-medium border border-gray-200 hover:border-gray-300 transition-all duration-200"
          >
            <span>📚</span>
            <span>Learn More About MiniKit</span>
          </button>
        </footer>
      </div>
    </div>
  )
}
