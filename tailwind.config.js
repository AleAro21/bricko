/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        textColor: "#000000",
        background: "#f5f5f7",
        footerColor: "#464A5A",
      },
      fontFamily: {
        sans: ['"Helvetica Neue"', "Arial", "sans-serif"], // Set Helvetica Neue as the default sans font
      },
    },
  },
  plugins: [],
};
