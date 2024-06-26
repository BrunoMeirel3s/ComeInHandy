/** @type {import('tailwindcss').Config} */
export {};
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderWidth: {
        "border-left": "1px",
      },
      borderColor: {
        "border-left": "#181C2A",
      },
      width: {
        '128': '32rem',
        '256': '64rem',
        '512': '128rem'
      },
      height: {
        '128': '32rem',
        '256': '64rem',
        '512': '128rem'
      }
    },
    colors: {
      "green-100": "#50B2C0",
      "green-200": "#255D6A",
      "green-300": "#0A313C",
      "purple-100": "#8381D9",
      "purple-200": "#2A2879",
      "gray-100": "#F8F9FC",
      "gray-200": "#E6E8F2",
      "gray-300": "#D1D6E4",
      "gray-400": "#8D95AF",
      "gray-500": "#303F73",
      "gray-600": "#252D4A",
      "gray-700": "#181C2A",
      "gray-800": "#0E1116",
    },
  },
  plugins: [],
};
