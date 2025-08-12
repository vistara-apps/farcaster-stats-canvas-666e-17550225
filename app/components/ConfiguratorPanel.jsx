'use client'

export default function ConfiguratorPanel({ config, onChange }) {
  const colorThemes = [
    { id: 'default', name: 'Default', colors: 'from-blue-600 to-purple-600' },
    { id: 'ocean', name: 'Ocean', colors: 'from-blue-500 to-cyan-400' },
    { id: 'sunset', name: 'Sunset', colors: 'from-orange-500 to-pink-500' },
    { id: 'forest', name: 'Forest', colors: 'from-green-600 to-emerald-500' }
  ]

  const updateConfig = (key, value) => {
    onChange({ ...config, [key]: value })
  }

  return (
    <div className="bg-surface rounded-lg p-4 shadow-card border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Customize Your Card</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Color Theme
          </label>
          <div className="grid grid-cols-2 gap-2">
            {colorThemes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => updateConfig('colorTheme', theme.id)}
                className={`p-3 rounded-lg border-2 transition-all duration-fast ${
                  config.colorTheme === theme.id
                    ? 'border-blue-500 ring-2 ring-blue-200'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`w-full h-6 bg-gradient-to-r ${theme.colors} rounded mb-2`}></div>
                <p className="text-xs font-medium text-gray-700">{theme.name}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">Show Avatar</label>
            <button
              onClick={() => updateConfig('showAvatar', !config.showAvatar)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-fast ${
                config.showAvatar ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-fast ${
                  config.showAvatar ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">Show ENS Name</label>
            <button
              onClick={() => updateConfig('showENS', !config.showENS)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-fast ${
                config.showENS ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-fast ${
                  config.showENS ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
