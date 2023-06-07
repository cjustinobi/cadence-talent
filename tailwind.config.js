/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        clashDisplay: ["Clash Display", "sans-serif", "Circular Std", "sans-serif",],
      },
      fontFamily: {
        circularStd: ["Circular Std", "sans-serif",],
      },
    },
    extend: {
      colors: {
        'black-1': '#0F0F0F',
        'black-2': '#0D0D0D',
        'green-1': '#38B081',
        'blue-1': '#1F7FF0',
        'bright-grey-1': '#999999',
        'dark-grey-1': '#141414',
        'warning-1': '#9FB038',
        'cancel-1': '#B04638',
        'blue-green': ['#1F7FF0', '#38B081'],
        gradientColorStops: {
          'blue-green': ['#1F7FF0', '#38B081'],
        },
      },

      fontFamily: {
        ClashDisplay: [ 'Clash Display', 'sans-serif'],
        circularStd: ['Circular Std', 'sans-serif' ]
      }
    },
  },
  plugins: [],
}

