/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        "15vh": "15vh",
        "20vh": "20vh",
        "80vh": "80vh",
        "85vh": "85vh"
      },
      boxShadow: {
        "custom": "-5px 5px 15px rgb(40,40,40)",
      },
    },
  },
  plugins: [],
};
