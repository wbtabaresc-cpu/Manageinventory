/** @type {import('tailwindcss').Config} */
export default {  
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['"Segoe UI"', 'Inter', 'sans-serif'],
      },
      colors: {
        'primary': '#007bff',
        'red-custom': '#e62f38',
        'light-blue': '#cce0ff',
        'dark-gray': 'rgba(24, 24, 24, 0.553)',
      }
    },
  },
  plugins: [],
}
