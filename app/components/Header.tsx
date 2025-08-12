
'use client'

import type { ReactNode } from 'react'
import { Plus, X, ExternalLink } from 'lucide-react'

interface HeaderProps {
  onAddFrame?: () => void
  onClose?: () => void
  onOpenBase?: () => void
  showAddFrame?: boolean
}

export function Header({ onAddFrame, onClose, onOpenBase, showAddFrame }: HeaderProps) {
  return (
    <header className="flex justify-between items-center mb-6">
      <div className="flex items-center space-x-2">
        {showAddFrame && (
          <button
            onClick={onAddFrame}
            className="flex items-center space-x-2 bg-primary text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Save Frame</span>
          </button>
        )}
      </div>
      
      <div className="flex items-center space-x-3">
        <button
          onClick={onOpenBase}
          className="flex items-center space-x-1 text-primary text-sm font-semibold hover:text-primary/80 transition-colors"
        >
          <span>Base</span>
          <ExternalLink className="w-3 h-3" />
        </button>
        
        <button
          onClick={onClose}
          className="p-1 text-muted hover:text-text transition-colors rounded"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </header>
  )
}
