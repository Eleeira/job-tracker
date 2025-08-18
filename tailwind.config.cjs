// tailwind.config.cjs
module.exports = {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
theme: {
    extend: {
      screens: {
        '3xl': '1920px',
        '4xl': '2560px', // utile anche su 4K
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1536px',
          '3xl': '1920px',
          '4xl': '2560px',
        },
      },
    },
  },
  plugins: [],
};