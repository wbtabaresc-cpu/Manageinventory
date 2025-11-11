/** @type {import('tailwindcss').Config} */
export default {
  // CLAVE: Tailwind revisará estos archivos para buscar clases.
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
      },
      colors: {
        'primary': '#4f46e5', // Indigo 600
        'secondary': '#f97316', // Orange 600
        'background': '#f3f4f6', // Gray 100
      }
    },
  },
  plugins: [],
}