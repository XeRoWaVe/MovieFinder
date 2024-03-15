/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'hero-pattern': "url('./public/assets/dopaminebg.jpg')",
      }),
    },
  },
  plugins: [],
}

