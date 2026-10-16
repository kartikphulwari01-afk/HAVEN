/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        haven: {
          bg: "#F7F5FF",
          canvas: "#EDE8FD",
          surface: "#FFFFFF",
          border: "#E6DFFD",
          primary: "#7655FF",
          "primary-hover": "#6442F0",
          "primary-light": "#EDE8FD",
          "primary-subtle": "#F5F2FD",
          text: "#21183B",
          secondary: "#766D8F",
          muted: "#9E97B5",
          lime: "#DFFF68",
          pink: "#FF729E",
          cyan: "#65E7F2",
          online: "#10B981",
        },
      },
      borderRadius: {
        "3xl": "1.75rem",
        "4xl": "2rem",
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(118, 85, 255, 0.08)",
        card: "0 10px 30px -5px rgba(33, 24, 59, 0.05)",
      },
    },
  },
  plugins: [],
};
