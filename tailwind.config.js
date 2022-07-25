module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      borderColor: {
        dark: '#2e3336',
        'dark-user': '#262b2c',
      },
      boxShadow: {
        round: '0 0 60px -15px rgba(0, 0, 0, 0.3)',
      },
      linearGradient: {
        shine: 'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(128,186,232,0) 99%, rgba(125,185,232,0) 100%)',
      },
      backgroundColor: {
        dark: '#0e172a',
        'dark-user': '#262b2c',
      },
      backgroundImage: {
        'hero-pattern':
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='12' viewBox='0 0 20 12'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='charlie-brown' fill='%23e5e5e5' fill-opacity='0.5'%3E%3Cpath d='M9.8 12L0 2.2V.8l10 10 10-10v1.4L10.2 12h-.4zm-4 0L0 6.2V4.8L7.2 12H5.8zm8.4 0L20 6.2V4.8L12.8 12h1.4zM9.8 0l.2.2.2-.2h-.4zm-4 0L10 4.2 14.2 0h-1.4L10 2.8 7.2 0H5.8z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        'endless-pattern':
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 56 28' width='56' height='28'%3E%3Cpath fill='%23000000' fill-opacity='1' d='M56" +
          ' 26v2h-7.75c2.3-1.27 4.94-2 7.75-2zm-26 2a2 2 0 1 0-4 0h-4.09A25.98 25.98 0 0 0 0 16v-2c.67 0 1.34.02 2 .07V14a2 2 0 0 0-2-2v-2a4 4 0 0 1 3.98 3.6 28.09 28.09 0 0 1 2.8-3.86A8 8 0 0 0 0 6V4a9.99 9.99 0 0 1 8.17 4.23c.94-.95 1.96-1.83 3.03-2.63A13.98 13.98 0 0 0 0 0h7.75c2 1.1 3.73 2.63 5.1 4.45 1.12-.72 2.3-1.37 3.53-1.93A20.1 20.1 0 0 0 14.28 0h2.7c.45.56.88 1.14 1.29 1.74 1.3-.48 2.63-.87 4-1.15-.11-.2-.23-.4-.36-.59H26v.07a28.4 28.4 0 0 1 4 0V0h4.09l-.37.59c1.38.28 2.72.67 4.01 1.15.4-.6.84-1.18 1.3-1.74h2.69a20.1 20.1 0 0 0-2.1 2.52c1.23.56 2.41 1.2 3.54 1.93A16.08 16.08 0 0 1 48.25 0H56c-4.58 0-8.65 2.2-11.2 5.6 1.07.8 2.09 1.68 3.03 2.63A9.99 9.99 0 0 1 56 4v2a8 8 0 0 0-6.77 3.74c1.03 1.2 1.97 2.5 2.79 3.86A4 4 0 0 1 56 10v2a2 2 0 0 0-2 2.07 28.4 28.4 0 0 1 2-.07v2c-9.2 0-17.3 4.78-21.91 12H30zM7.75 28H0v-2c2.81 0 5.46.73 7.75 2zM56 20v2c-5.6 0-10.65 2.3-14.28 6h-2.7c4.04-4.89 10.15-8 16.98-8zm-39.03 8h-2.69C10.65 24.3 5.6 22 0 22v-2c6.83 0 12.94 3.11 16.97 8zm15.01-.4a28.09 28.09 0 0 1 2.8-3.86 8 8 0 0 0-13.55 0c1.03 1.2 1.97 2.5 2.79 3.86a4 4 0 0 1 7.96 0zm14.29-11.86c1.3-.48 2.63-.87 4-1.15a25.99 25.99 0 0 0-44.55 0c1.38.28 2.72.67 4.01 1.15a21.98 21.98 0 0 1 36.54 0zm-5.43 2.71c1.13-.72 2.3-1.37 3.54-1.93a19.98 19.98 0 0 0-32.76 0c1.23.56 2.41 1.2 3.54 1.93a15.98 15.98 0 0 1 25.68 0zm-4.67 3.78c.94-.95 1.96-1.83 3.03-2.63a13.98 13.98 0 0 0-22.4 0c1.07.8 2.09 1.68 3.03 2.63a9.99 9.99 0 0 1 16.34 0z\'%3E%3C/path%3E%3C/svg%3E")',
        'home-page-mobile': 'url(/backgrounds/home-page-mobile.svg)',
        'home-page-desktop': 'url(/backgrounds/home-page-desktop.svg)',
        'board-light-mobile': 'url(/backgrounds/board-light-mobile.svg)',
        'board-dark-mobile': 'url(/backgrounds/board-dark-mobile.svg)',
        'user-opinions-mobile': 'url(/backgrounds/user-opinions-mobile.svg)',
        'user-opinions-desktop': 'url(/backgrounds/user-opinions-desktop.svg)',
        'signin-page-desktop': 'url(/backgrounds/signin-page-desktop.svg)',
        'signin-page-mobile': 'url(/backgrounds/signin-page-mobile.svg)',
        curiosity: 'url(/backgrounds/curiosity.svg)',
      },
      textColor: {
        dark: '#0e172a',
      },
      keyframes: {
        appear: {
          '0%': {
            opacity: 0,
          },
          '100%': {
            opacity: 1,
          },
        },
        appearOpacity: {
          '0%': {
            opacity: 0,
          },
          '100%': {
            opacity: 0.9,
          },
        },
        typing: {
          '0%': {
            width: 0,
          },
          '100%': {
            width: '100%',
          },
        },
        blinkCaret: {
          '0%': {
            'border-color': 'transparent',
          },
          '50%': {
            'border-color': '#8f00f4',
          },
          '100%': {
            'border-color': 'transparent',
          },
        },
        slide: {
          '0%': {
            transform: 'translateX(-100%)',
          },
          '100%': {
            transform: 'translateX(0%)',
          },
        },
        shineSlide: {
          '0%': {
            transform: 'translateX(-100%)',
          },
          '50%': {
            transform: 'translateX(100%)',
          },
          '100%': {
            transform: 'translateX(100%)',
          },
        },
        myBounce: {
          '0%, 100%': {
            transform: 'translate(-50%, -15%)',
            'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translate(-50%, 0%)',
            'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
        gradientBackground: {
          '0%': {
            'background-position': '0% 63%',
          },
          '50%': {
            'background-position': '100% 38%',
          },
          '100%': {
            'background-position': '0% 63%',
          },
        },
        swipe: {
          '0%, 50%, 100%': {
            transform: 'rotate(0deg)',
          },
          '20%': {
            transform: 'rotate(-20deg)',
          },
        },
      },
      animation: {
        appearing: 'appear 0.5s ease-in-out',
        'appearing-short': 'appear 0.35s ease-in-out',
        'appearing-opacity': 'appearOpacity 0.35s ease-in-out',
        sliding: 'slide 7s linear',
        slidingShort: 'slide 2s linear',
        'shine-slide': 'shineSlide 2s infinite ease-in-out',
        myBounce: 'myBounce 1s infinite',
        gradientBackground: 'gradientBackground 7s ease infinite',
        typing: 'typing 5s steps(40, end), blinkCaret 1s step-end infinite',
        swipe: 'swipe 1.5s ease-in-out infinite',
      },
      fontFamily: {
        flower: ['Indie Flower', 'cursive'],
        bebas: ['Bebas Neue', 'cursive'],
        jakarta: ['Plus Jakarta Sans', 'sans-serif'],
        raleway: ['Raleway', 'sans-serif'],
        'edu-sa': ['Edu SA Beginner', 'sans-serif'],
        mukta: ['Mukta', 'sans-serif'],
        albert: ['Albert Sans', 'sans-serif'],
      },
      height: {
        'mobile-screen': 'calc(100vh - 64px)',
      },
      minHeight: {
        56: '14rem',
      },
      transitionTimingFunction: {
        'slide-in-out': 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
    },
  },
  plugins: [],
};
