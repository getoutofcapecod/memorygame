/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'pixel': ['"Press Start 2P"', 'monospace'],
      },
      screens: {
        'xs': '375px',
      },
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      colors: {
        'retro': {
          'bg': '#1a1536',
          'primary': '#ff7a51',
          'secondary': '#2d5a6b',
          'accent': '#ffd700',
          'text': '#ffffff',
        },
        'theme': {
          'bg': 'var(--color-bg)',
          'primary': 'var(--color-primary)',
          'primary-shadow': 'var(--color-primary-shadow)',
          'secondary': 'var(--color-secondary)',
          'secondary-shadow': 'var(--color-secondary-shadow)',
          'accent': 'var(--color-accent)',
          'accent-shadow': 'var(--color-accent-shadow)',
          'button': 'var(--color-button)',
          'button-shadow': 'var(--color-button-shadow)',
          'button-hover': 'var(--color-button-hover)',
          'text': 'var(--color-text)',
          'text-shadow': 'var(--color-text-shadow)',
          'text-on-accent': 'var(--color-text-on-accent)',
          'border': 'var(--color-border)'
        }
      }
    },
  },
  plugins: [],
}
