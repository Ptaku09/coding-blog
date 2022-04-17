module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        appear: {
          '0%': {
            opacity: 0,
          },
          '100%': {
            opacity: 1,
          },
        },
      },
      animation: {
        appearing: 'appear 0.5s ease-in-out',
        'appearing-short': 'appear 0.35s ease-in-out',
      },
      fontFamily: {
        flower: ['Indie Flower', 'cursive'],
        bebas: ['Bebas Neue', 'cursive'],
        jakarta: ['Plus Jakarta Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
