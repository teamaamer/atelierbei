module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#F8F6F3',
        blush: '#EAD6D9',
        beige: '#EFEAE4',
        gold: '#C8A96A',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        sans: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
