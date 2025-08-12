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
        <header className="flex justify-between items-center mb-6">
          {context && !context.client.added && (
            <button
              onClick={handleAddFrame}
              className="bg-primary text-white px-3 py-1 rounded-md text-sm hover:bg-primary/90 transition-colors duration-fast"
            >
              SAVE FRAME
            </button>
          )}
          <div className="flex space-x-3">
            <button
              onClick={() => openUrl('https://base.org')}
              className="text-primary text-sm font-semibold hover:text-primary/80 transition-colors duration-fast"
            >
              BASE
            </button>
            <button
              onClick={close}
              className="text-gray-600 text-sm font-semibold hover:text-gray-800 transition-colors duration-fast"
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
              <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}
          </div>

          {userStats && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Your Stats Card</h2>
                <button
                  onClick={() => setShowConfigurator(!showConfigurator)}
                  className="text-sm text-primary hover:text-primary/80 font-medium transition-colors duration-fast"
                >
                  {showConfigurator ? 'Hide' : 'Customize'}
                </button>
              </div>

              {showConfigurator && (
                <ConfiguratorPanel
                  config={cardConfig}
                  onChange={setCardConfig}
                />
              )}

              <StatsCard
                stats={userStats}
                config={cardConfig}
              />
            </div>
          )}

          {isLoading && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="mt-2 text-sm text-gray-600">Fetching your Base stats...</p>
            </div>
          )}
        </main>

        <footer className="mt-8 text-center">
          <button
            onClick={() => openUrl('https://docs.base.org/base-camp/docs/minikit/overview')}
            className="text-xs text-gray-500 hover:text-gray-700 transition-colors duration-fast"
          >
            BUILT WITH MINIKIT
          </button>
        </footer>
      </div>
    </div>
  )
}
