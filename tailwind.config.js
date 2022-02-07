module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
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
