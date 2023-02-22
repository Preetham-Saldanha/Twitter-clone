/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [  "./pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors:{
        twitter:"#00ADED"
      },
      animation:{
rollLeft: 'rollLeft 500ms ease-in-out '
      },
      keyframes:{
rollLeft: {
  // '0%, 100%': { transform: 'rotate(-3deg)' },
  // '50%': { transform: 'rotate(3deg)' },
  '0%':{
    transform:'translate(4px)',
    opacity:'0%'
  },
  '50%':{
    transform:'translate(-10px)',
    opacity:'50%'
  },
  '100%':{
    transform:'translate(0px)',
    opacity:'100%'
  }
}
      },

      fontFamily:{
        roboto:[ 'sans-serif','Roboto']
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
