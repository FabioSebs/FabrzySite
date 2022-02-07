module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'glow-red': '10px 15px 30px rgba(255,0,0, .3)',
        'glow-blue': '10px 15px 30px rgba(0,0,255, .5)',
        'glow-purple': '10px 15px 30px rgba(102, 51, 153, .5)'
      }
    },
    keyframes: {
      fadeIn: {
        "0%": { opacity: 0 },
        "100%": { opacity: 1 }
      },
      fadeOut: {
        "0%": { opacity: 1 },
        "100%": { opacity: 0 }
      }
    },
    animation: {
      fadeIn: "fadeIn 1s ease-in",
      fadeOut: "fadeOut 1s ease-out"
    }
  },
  plugins: [],
}
