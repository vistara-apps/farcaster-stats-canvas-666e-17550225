
'use client'

import { MiniKitProvider } from '@coinbase/onchainkit/minikit'
import { base } from 'wagmi/chains'
import type { ReactNode } from 'react'

export function Providers(props: { children: ReactNode }) {
  return (
    <MiniKitProvider
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY || 'demo-api-key'}
      chain={base}
      config={{
        appearance: {
          mode: 'auto',
          theme: 'base',
          name: 'Farcaster Stats Canvas',
          logo: 'https://via.placeholder.com/64x64/3B82F6/FFFFFF?text=FC',
        },
      }}
    >
      {props.children}
    </MiniKitProvider>
  )
}
