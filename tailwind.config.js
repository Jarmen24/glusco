/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand_blue: "#0B1956",
        brand_lightblue: "#E9F3FF",
        brand_purple: "#D3B3DC",
        brand_lightpurple: "#E8D9EE",
        brand_offwhite: "#F8F3ED",
        brand_vibrantblue: "#446CC3",
        brand_beige: "#F8F3ED",
      },
    },
  },
  plugins: [],
};
