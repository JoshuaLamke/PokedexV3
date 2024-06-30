import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
  ],
  theme: {
    extend: {
      animation: {
        wiggle: 'wiggle 0.2s ease-in-out',
        float: 'float 3s ease-in-out infinite',
        spin: 'spin 1s linear infinite',
        shake: 'shake 0.2s ease-in-out'
      },
      keyframes: {
        float: {
          '0%': { transform: 'translate(0,  0px)' },
          '50%':  { transform: 'translate(0, 10px)' },
          '100%':   { transform: 'translate(0, -0px)' },    
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(0deg) scale(1.05)' },
          '25%': { transform: 'rotate(-2deg) scale(1.05)' },
          '50%': { transform: 'rotate(2deg) scale(1.05)' },
          '75%': { transform: 'rotate(-2deg) scale(1.05)' },
        },
        shake: {
          '0%, 100%': { transform: 'translate(0,  0px) scale(1.05)' },
          '25%': { transform: 'translate(5px,  0) scale(1.05)' },
          '75%': { transform: 'translate(-5px,  0) scale(1.05)' },
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
    screens: {
      'xs': '400px',
      ...defaultTheme.screens
    },
  },
  plugins: [],
}

