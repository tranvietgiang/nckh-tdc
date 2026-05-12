/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {   
       colors: {
      tdc: {
        primary: "#1E63C6",
        hover: "#174EA6",
        light: "#F3F6FB",
      },
    },},
  },
  plugins: [],
};
