'use client'

import { Search, Wallet } from 'lucide-react'

export default function AddressInput({ value, onChange, placeholder, disabled }) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-gray-800 flex items-center space-x-2">
        <Wallet className="w-4 h-4 text-blue-600" />
        <span>Base Address or ENS Name</span>
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed transition-all duration-200 hover:border-gray-300"
        />
        {value && (
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        )}
      </div>
      <p className="text-xs text-gray-500 flex items-center space-x-1">
        <span>💡</span>
        <span>Try: 0x1234...abcd or vitalik.eth</span>
      </p>
    </div>
  )
}
