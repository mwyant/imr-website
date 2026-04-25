/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'deep-space': '#0B0D17',
        'blueprint-blue': '#1B263B',
        'lunar-gray': '#D0D6F9',
        'mission-orange': '#FF5F1F',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
