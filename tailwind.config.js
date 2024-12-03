/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "high": "#001520",
        "medium": "#59b5e6",
        "light": "#0093e7"
      }
    },
  },
  plugins: [],
}