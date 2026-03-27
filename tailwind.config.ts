import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#FFFFFF',
        foreground: '#212226',
        accent: '#0E34F4',
        'accent-light': '#EBF0FF',
        border: '#E5E7EB',
        muted: '#6B7280',
        dark: '#212226',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      fontSize: {
        display: ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
        'display-sm': ['2.25rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
      },
      maxWidth: {
        content: '72rem',
      },
      borderRadius: {
        card: '1rem',
      },
    },
  },
  plugins: [],
}

export default config
