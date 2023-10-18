/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "missing-poster": "url('./src/assets/no-poster.png')",
      },
    },
    fontFamily: {
      sans: "Roboto Condensed, sans-serif",
    },
  },
  plugins: [],
};
