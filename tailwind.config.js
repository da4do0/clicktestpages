/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    screens:{
      'sm-mobile': {'max': '375px'},
      'mobile': {'max': '480px'},
      'lg': {'min': '1024'}
    }
  },
  plugins: [],
}

