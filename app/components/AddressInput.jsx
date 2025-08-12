'use client'

export default function AddressInput({ value, onChange, placeholder, disabled }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Base Address or ENS Name
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
      />
    </div>
  )
}
