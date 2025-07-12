/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          700: "#143752",
          DEFAULT: "#205781",
          dark: "#0B1E2C",
          light: "#2c7bb7",
        },
        grey: {
          500: "#C4C4C4",
        },
      },
      screens: {
        940: "940px",
      },
      fontSize: {
        "heading-xl": "64px",
        "heading-lg": "48px",
        "heading-md": "40px",
        "heading-sm": "32px",
        "heading-xs": "24px",
        "body-xl": "20px",
        "body-lg": "18px",
        "body-md": "16px",
        "body-sm": "14px",
        "body-xs": "12px",
      },
      borderRadius: {
        "radius-xs": "4px",
        "radius-sm": "8px",
        DEFAULT: "12px",
        "radius-lg": "16px",
      },
    },
  },
  plugins: [],
};
