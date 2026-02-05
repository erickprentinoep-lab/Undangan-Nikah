/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'batak-red': '#5c0909', // Deep Maroon
        'batak-red-light': '#a61c1c', // Traditional Red
        'batak-gold': '#d4af37', // Gold
        'batak-dark': '#1a1a1a', // Charcoal
      },
      fontFamily: {
        'serif': ['"Playfair Display"', 'serif'],
        'sans': ['"Lato"', 'sans-serif'],
      },
      backgroundImage: {
        'ulos-pattern': "url('../images/ulos-pattern.png')", // Placeholder
      }
    },
  },
  plugins: [],
}
