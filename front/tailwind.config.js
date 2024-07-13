/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "custom": "-5px 5px 15px rgb(40,40,40)",
      },
    },
  },
  plugins: [],
};
