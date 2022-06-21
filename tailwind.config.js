module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern':
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='12' viewBox='0 0 20 12'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='charlie-brown' fill='%23e5e5e5' fill-opacity='0.5'%3E%3Cpath d='M9.8 12L0 2.2V.8l10 10 10-10v1.4L10.2 12h-.4zm-4 0L0 6.2V4.8L7.2 12H5.8zm8.4 0L20 6.2V4.8L12.8 12h1.4zM9.8 0l.2.2.2-.2h-.4zm-4 0L10 4.2 14.2 0h-1.4L10 2.8 7.2 0H5.8z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        'home-page-mobile': 'url(/backgrounds/home-page-mobile.svg)',
        'home-page-desktop': 'url(/backgrounds/home-page-desktop.svg)',
        'user-opinions-mobile': 'url(/backgrounds/user-opinions-mobile.svg)',
        'user-opinions-desktop': 'url(/backgrounds/user-opinions-desktop.svg)',
        'signin-page-desktop': 'url(/backgrounds/signin-page-desktop.svg)',
        'signin-page-mobile': 'url(/backgrounds/signin-page-mobile.svg)',
        curiosity: 'url(/backgrounds/curiosity.svg)',
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
      },
      animation: {
        appearing: 'appear 0.5s ease-in-out',
        'appearing-short': 'appear 0.35s ease-in-out',
        sliding: 'slide 7s linear',
        myBounce: 'myBounce 1s infinite',
        gradientBackground: 'gradientBackground 7s ease infinite',
        typing: 'typing 5s steps(40, end), blinkCaret 1s step-end infinite',
      },
      fontFamily: {
        flower: ['Indie Flower', 'cursive'],
        bebas: ['Bebas Neue', 'cursive'],
        jakarta: ['Plus Jakarta Sans', 'sans-serif'],
        raleway: ['Raleway', 'sans-serif'],
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
