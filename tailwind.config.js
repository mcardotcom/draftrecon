/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'midnight-slate': '#1E293B',
        'signal-indigo': '#6366F1',
        'cloud-gray': '#F1F5F9',
        'steel-text': '#94A3B8',
        'jet-black': '#0F172A',
        'signal-green': '#00A572',
        'error-red': '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        '2xl': '1rem',
      },
      maxWidth: {
        'content': '1200px',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: '#1E293B',
            h1: {
              fontFamily: 'Inter',
              fontWeight: '700',
            },
            h2: {
              fontFamily: 'Inter',
              fontWeight: '600',
            },
            h3: {
              fontFamily: 'Inter',
              fontWeight: '600',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 