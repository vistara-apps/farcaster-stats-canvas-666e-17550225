
export interface UserStats {
  address: string
  ensName?: string
  ethBalance: string
  totalTransactions: number
  totalGasUsed: string
  firstTransactionDate: string
  lastTransactionDate: string
  topTokens: Array<{
    symbol: string
    balance: string
    value: string
  }>
}

export function generateMockStats(addressOrUsername: string): UserStats {
  // Mock data generator - in production, integrate with Bitquery API
  const isAddress = addressOrUsername.startsWith('0x')
  const address = isAddress ? addressOrUsername : `0x${Math.random().toString(16).substr(2, 40)}`
  
  return {
    address,
    ensName: isAddress ? undefined : `${addressOrUsername}.eth`,
    ethBalance: (Math.random() * 10 + 0.1).toFixed(3),
    totalTransactions: Math.floor(Math.random() * 500 + 50),
    totalGasUsed: `${(Math.random() * 0.5 + 0.1).toFixed(3)} ETH`,
    firstTransactionDate: '2024-01-15',
    lastTransactionDate: '2024-03-10',
    topTokens: [
      { symbol: 'USDC', balance: '1,234.56', value: '$1,234.56' },
      { symbol: 'DAI', balance: '567.89', value: '$567.89' },
      { symbol: 'WETH', balance: '2.34', value: '$5,678.90' },
    ]
  }
}

export interface CardTemplate {
  id: string
  name: string
  description: string
  templateConfig: {
    colorScheme: string
    layout: string
    includedMetrics: string[]
  }
}

export const defaultTemplates: CardTemplate[] = [
  {
    id: 'default',
    name: 'Classic',
    description: 'Clean and professional design',
    templateConfig: {
      colorScheme: 'blue',
      layout: 'grid',
      includedMetrics: ['balance', 'transactions', 'gasUsed', 'firstTx']
    }
  },
  {
    id: 'ocean',
    name: 'Ocean',
    description: 'Blue gradient theme',
    templateConfig: {
      colorScheme: 'ocean',
      layout: 'grid',
      includedMetrics: ['balance', 'transactions', 'gasUsed', 'firstTx']
    }
  },
  {
    id: 'sunset',
    name: 'Sunset',
    description: 'Warm orange and pink gradients',
    templateConfig: {
      colorScheme: 'sunset',
      layout: 'grid',
      includedMetrics: ['balance', 'transactions', 'gasUsed', 'firstTx']
    }
  },
  {
    id: 'forest',
    name: 'Forest',
    description: 'Green nature-inspired theme',
    templateConfig: {
      colorScheme: 'forest',
      layout: 'grid',
      includedMetrics: ['balance', 'transactions', 'gasUsed', 'firstTx']
    }
  }
]
