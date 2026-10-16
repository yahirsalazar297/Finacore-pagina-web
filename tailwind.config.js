/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#060d18',
          900: '#0a1628',
          800: '#0f2040',
          700: '#162a54',
          600: '#1e3a6e',
        },
        brand: {
          blue: '#2563eb',
          'blue-light': '#3b82f6',
          'blue-electric': '#60a5fa',
          green: '#22c55e',
          'green-light': '#4ade80',
          'green-teal': '#10b981',
        },
        slate: {
          400: '#94a3b8',
          300: '#cbd5e1',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in-up':    'fadeInUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in-up-d1': 'fadeInUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) 150ms both',
        'fade-in-up-d2': 'fadeInUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) 300ms both',
        'fade-in-up-d3': 'fadeInUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) 450ms both',
        'fade-in-up-d4': 'fadeInUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) 620ms both',
        'fade-in-up-d5': 'fadeInUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) 800ms both',
        'float': 'float 5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(36px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':       { transform: 'translateY(-14px)' },
        },
      },
    },
  },
  plugins: [],
}
