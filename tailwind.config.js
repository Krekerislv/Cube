/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./index.html"],
  theme: {
    colors: {
      'primary': {
        'white': '#F2F2F2',
        'gray': {
          'light': '#A4A4A6',
          'mid': '#404040',
          'dark': '#262626',
        },
        'black': '#0D0D0D',
        'blue': {
          'lighter': '#08678C',
          'light': '#074973',
          'mid': '#032859',
          'dark': '#011C40',
          'darker': '#011126',
        }
      },
      'secondary': {

      }
    }
  },
  plugins: [],
}
