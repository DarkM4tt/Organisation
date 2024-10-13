/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        redhat: ["Red Hat Display", "sans-serif"],
      },
      colors: {
        gray: "#777777",
        midGray: "#999999",
        mid2Gray: "#EEEEEE",
        lightGray: "#AAAAAA",
        semiGray: "#BBBBBB",
        borderGray: "#DDDDDD",
        fontBlack: "#111111",
        boldCyan: "#18C4B8",
        themeBlue: "#1E293B",
        "white-10": "rgba(255, 255, 255, 0.1)",
        lightCyan: "rgba(24, 196, 184, 1)",
      },
      fontSize: {
        mxl: "32px",
      },
      width: {},
      maxWidth: {
        maxW: "480px",
      },
    },
  },
  variants: {
    extend: {
      display: ["group-hover"],
    },
  },
  plugins: [],
};
