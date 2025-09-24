/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slideDown: {
          from: {
            opacity: '0',
            transform: 'translateY(-10px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        wave: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        makeItRain: {
          '0%': { opacity: '0', transform: 'translateY(0)' },
          '50%': { opacity: '1' },
          '100%': { opacity: '1', transform: 'translateY(250px)' },
        },
      },
      animation: {
        slideDown: 'slideDown 0.3s ease-out',
        wave: "wave 30s linear infinite",
        wave2: "wave 25s linear infinite",
        wave3: "wave 20s linear infinite",
        makeItRain: 'makeItRain 3s linear infinite',
      },
    },
  },
  plugins: [],
}