/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'selector',
  theme: {
    corePlugins: {
      container: false,
    },
    extend: {
      colors: {
        nero: {
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#6d6d6d',
          600: '#5d5d5d',
          700: '#4f4f4f',
          800: '#454545',
          900: '#3d3d3d',
          950: '#020202',
        },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '12px',
          lg: '45px',
          xl: '5rem',
          '2xl': '13rem',
        },
        maxWidth: {
          xl: '1100px',
          '2xl': '1100px'
        },
      },
      fontFamily: {
        mono: ['Courier Prime', 'monospace'],
      },

      animation: {
        fade: 'fadeIn .5s ease-in-out',
      },

      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '100%',
          '@screen sm': {
            maxWidth: '640px',
            padding: '12px',
          },
          '@screen md': {
            maxWidth: '768px',
            padding: '12px',
          },
          '@screen lg': {
            maxWidth: '1024px',
            padding: '12px',
          },
          '@screen xl': {
            maxWidth: '1110px',
            padding: '12px',
          },
          '@screen 2xl': {
            maxWidth: '1100px',
            padding: '1rem',
          },
        },
      });
    },
  ],
};
