
'use client'

import { Palette } from 'lucide-react'

interface ConfiguratorPanelProps {
  theme: string
  onThemeChange: (theme: string) => void
}

const themes = [
  { id: 'default', name: 'Default', colors: 'from-blue-500 to-cyan-400' },
  { id: 'ocean', name: 'Ocean', colors: 'from-blue-600 to-blue-400' },
  { id: 'sunset', name: 'Sunset', colors: 'from-orange-400 to-pink-500' },
  { id: 'forest', name: 'Forest', colors: 'from-green-500 to-emerald-400' },
]

export function ConfiguratorPanel({ theme, onThemeChange }: ConfiguratorPanelProps) {
  return (
    <div className="card animate-slide-up">
      <div className="flex items-center space-x-2 mb-4">
        <Palette className="w-4 h-4 text-primary" />
        <h3 className="font-semibold text-text">Customize Card</h3>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-text mb-2">Theme</label>
          <div className="grid grid-cols-2 gap-2">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => onThemeChange(t.id)}
                className={`relative p-3 rounded-md border-2 transition-all ${
                  theme === t.id ? 'border-primary' : 'border-border'
                }`}
              >
                <div className={`w-full h-8 rounded bg-gradient-to-r ${t.colors} mb-1`} />
                <div className="text-xs font-medium text-text">{t.name}</div>
                {theme === t.id && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
