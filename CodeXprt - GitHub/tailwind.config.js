/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
        },
      },
      colors: {
        primary: {
          900: '#1a103c',
          800: '#251454',
          700: '#2f1a6c',
          600: '#3b2184',
          500: '#47289c',
        },
        accent: {
          pink: '#FF49DB',
          purple: '#7928CA',
          blue: '#0070F3',
          cyan: '#00DFD8',
        },
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
      },
    },
  },
  plugins: [],
};
