/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        main : "rgba(236, 72, 153, 1.00)" ,
        second : "#ff008cff"
      }
    },
  },
  plugins: [],
}

