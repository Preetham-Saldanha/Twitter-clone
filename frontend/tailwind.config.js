/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [  "./pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors:{
        twitter:"#00ADED"
      },
      fontFamily:{
        roboto:['Roboto', 'sans-serif']
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
