/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
      },
      textColor:{
        'navItem':'#111011',
        'heading-bold-black':'#010001',
        'paragraph-primary':'#6a6868'
      },
      backgroundColor:{
        'button-black':'#010001',
        'hero-bg':'#f3f0f0',
        'product-card': '#f1eeec',
      }
    },
  },
  plugins: [],
}