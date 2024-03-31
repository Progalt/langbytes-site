/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        'height': 'height',
        'no-border-color': 'olor, background-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter'
      },
      
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        // 'brand': {
        //   200: '#d2bdf9',
        //   300: '#bc9cf6',
        //   400: '#a57bf3',
        //   500: '#8f5af0',
        //   600: '#7248c0',
        // }
        // 'brand': {
        //   200: '#f0adfc',
        //   300: '#e984fa',
        //   400: '#e15bf9',
        //   500: '#da32f7',
        //   600: '#ae28c6',
        //   700: '#831e94',
        // }
        // This is a nice pink
        // 'brand': {
        //   200: '#ebb7e7',
        //   300: '#e093da',
        //   400: '#d66fce',
        //   500: '#CC4BC2',
        //   600: '#a33c9b',
        //   700: '#7a2d74'
        // }
        // Celestial Blue
        'brand': {
          200: '#a9d7f9',
          300: '#7dc2f7',
          400: '#52aef4',
          500: '#279af1',
          600: '#1f7bc1',
          700: '#175c91'
        },

        'emerald': '#59CD90',

        'dark-brand': { 
          300: '#2b2b3d',
          400: '#232333',
          500: '#13131d',
          600: '#0f0f17',
          700: '#0b0b11',
        }
  
      }
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
