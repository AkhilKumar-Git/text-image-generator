module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  theme: {
    extend: {
      colors: {
        'deep-blue': '#1a202c',
        'creamy-white': '#f7f7f7',
      },
      backgroundColor: {
        'deep-blue': '#1a202c',
        'creamy-white': '#f7f7f7',
      },
      textColor: {
        'deep-blue': '#1a202c',
        'creamy-white': '#f7f7f7',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

