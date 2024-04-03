/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: ["emerald"],
  },
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      purple: "#8777E2",
      "purple-light": "#F9F3FF",
      "purple-gray": "#32303B",
      white: "#FFFFFF",
    },
    extend: {},
  },
  plugins: [require("daisyui")],
};
