/** @type {import('tailwindcss').Config} */

const svgToDataUri = require("mini-svg-data-uri");
 
const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

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

        // 'dark-brand': { 
        //   300: '#2b2b3d',
        //   400: '#232333',
        //   500: '#13131d',
        //   600: '#0f0f17',
        //   700: '#0b0b11',
        // }

        'dark-brand': { 
          300: '#454545',
          400: '#2d2d2d',
          500: '#161616',
          600: '#121212',
          700: '#0b0b0b',
        },

        'background-base': '#000000',
        'background': '#000000',
        // 'background': '#000000',
        // Also used for borders
        'background-hover': '#2d2d2d',
        // 'code-background': '#141414',
        'code-background': '#000000' 
  
      }
    },
  },
  plugins: [
    require("@tailwindcss/forms"),

    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "bg-grid": (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          "bg-grid-small": (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          "bg-dot": (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
      );
    },

  ],
};
