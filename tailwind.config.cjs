/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        noto: ['Noto Sans', 'sans-serif'],
        'display': ['Noto Sans' , 'sans-serif'],
        'body': ['Noto Sans' , 'sans-serif'],
      },
      
      
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
