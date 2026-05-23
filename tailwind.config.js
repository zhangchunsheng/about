/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-green': '#76C92E',
        'brand-blue': '#2D62DD',
        'brand-red': '#DD2E5A',
        'brand-yellow': '#DCBD32',
        'brand-purple': '#B423D5',
        'brand-dark': '#423C43',
        'brand-teal': '#0D9AA1',
        'timeline-bg': '#EDEFF4',
        'timeline-border': '#D2D9E7',
      },
      fontFamily: {
        sans: ['lucida grande', 'tahoma', 'verdana', 'arial', 'sans-serif'],
        display: ['proxima-nova-extra-condensed-1', 'proxima-nova-extra-condensed-2', 'Helvetica Neue', 'Arial'],
      },
      screens: {
        'mobile': {'max': '600px'},
        'tablet': {'min': '601px', 'max': '880px'},
      },
      animation: {
        'spin-slow': 'div_rotate 11s linear infinite alternate',
      },
      backgroundImage: {
        'grunge': "url('/images/grunge-bg-2.png')",
      },
    },
  },
  plugins: [],
}
