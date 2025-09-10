/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#2563eb',
        'primary-light': 'rgba(37, 99, 235, 0.1)',
      },
      screens: {
        'xs': '480px', // Añadir breakpoint extra small
      },
    },
  },
  plugins: [],
}