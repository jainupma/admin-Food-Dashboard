/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Roboto Serif', 'serif'],
        accent: ['Cormorant Upright', 'serif'],
      },
    },
  },
  plugins: [],
}