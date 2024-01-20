/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        primary: {
          DEFAULT: '#23b1a9',
          50: '#fcfefe',
          100: '#ebfbfa',
          200: '#cbf5f2',
          300: '#9aebe6',
          400: '#68e1da',
          500: '#37d8ce',
          600: '#23b1a9',
          700: '#19807a',
          800: '#104f4b',
          900: '#061e1c'
        }
      }
    }
  },
  plugins: []
}
