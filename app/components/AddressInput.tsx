
'use client'

import { Search } from 'lucide-react'

interface AddressInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function AddressInput({ value, onChange, placeholder }: AddressInputProps) {
  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted">
        <Search className="w-4 h-4" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input-field w-full pl-10"
      />
    </div>
  )
}
