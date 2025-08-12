
'use client'

import type { ReactNode } from 'react'
import { Loader2 } from 'lucide-react'

interface PrimaryButtonProps {
  children: ReactNode
  onClick?: () => void
  loading?: boolean
  disabled?: boolean
  variant?: 'generate' | 'cast'
  className?: string
}

export function PrimaryButton({ 
  children, 
  onClick, 
  loading = false, 
  disabled = false, 
  variant = 'generate',
  className = ''
}: PrimaryButtonProps) {
  const baseClasses = variant === 'cast' ? 'btn-accent' : 'btn-primary'
  
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {!loading && children}
    </button>
  )
}
