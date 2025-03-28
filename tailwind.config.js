/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Gunakan mode class
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Untuk App Router (Next.js 13+)
    "./pages/**/*.{js,ts,jsx,tsx}", // Untuk Pages Router (Next.js <13)
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
