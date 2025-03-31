// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './**/*.vue'],
  theme: {
    extend: {},
  },
  plugins: [require('tailwindcss-primeui')]
}
