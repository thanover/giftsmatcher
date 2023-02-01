/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width: {
        personCard: "16rem",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("flowbite/plugin")],
  darkMode: "class",
};
