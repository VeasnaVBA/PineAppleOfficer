/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          50: '#faf6ee',
          100: '#f4ede0',
          200: '#ede4cf',
          300: '#e1d6be',
          400: '#d7c9ad',
          500: '#c5b494',
          600: '#aa9674',
          700: '#8c7857',
          800: '#69573d',
          900: '#3d3222',
        },
        ink: {
          DEFAULT: '#111111',
          pure: '#000000',
          soft: '#242424',
          muted: '#524d42',
          faint: '#857e72',
        },
      },
      fontFamily: {
        serif: ['var(--app-font-family)', '"Playfair Display"', 'Georgia', 'serif'],
        display: ['var(--app-font-family)', '"Bodoni Moda"', 'Georgia', 'serif'],
        sans: ['var(--app-font-family)', '"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      boxShadow: {
        'brutal': '3px 3px 0px #111111',
        'brutal-lg': '6px 6px 0px #111111',
      }
    },
  },
  plugins: [],
}
