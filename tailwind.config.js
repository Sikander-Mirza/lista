// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Urbanist: ['Urbanist', 'system-ui', 'sans-serif'],
        Poppins: ['Poppins', 'system-ui', 'sans-serif'],
        Inter: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}