
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(210, 90%, 50%)',
        accent: 'hsl(160, 80%, 45%)',
        bg: 'hsl(210, 30%, 98%)',
        surface: 'hsl(210, 30%, 100%)',
        text: 'hsl(210, 30%, 15%)',
        muted: 'hsl(210, 20%, 60%)',
        border: 'hsl(210, 20%, 90%)',
      },
      spacing: {
        sm: '8px',
        md: '12px',
        lg: '20px',
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '16px',
      },
      boxShadow: {
        card: '0 4px 12px hsla(0, 0%, 0%, 0.08)',
        glow: '0 0 20px hsla(210, 90%, 50%, 0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 0.25s cubic-bezier(0.25, 0.1, 0.25, 1)',
        'slide-up': 'slideUp 0.25s cubic-bezier(0.25, 0.1, 0.25, 1)',
        'scale-up': 'scaleUp 0.15s cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
    },
  },
  plugins: [],
}
