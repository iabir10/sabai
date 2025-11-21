/** @type {import('tailwindcss').Config} */
export default {
  // CRITICAL: Ensure Tailwind scans all files that contain class names
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // You can add 'Inter' if you want a specific modern font:
        // sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}