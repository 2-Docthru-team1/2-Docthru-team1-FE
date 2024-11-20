import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    screens: {
      sm: '343px',
      md: '696px',
      lg: '1200px'
    },
    colors: {
      'primary-dark-gray': '#262626',
      'primary-light-gray': '#f1f2f5',
      'primary-beige': '#d5bda6',
      'primary-blue': '#73a8cd',
      'primary-white': '#ffffff',
      'gray-900': '#111827',
      'gray-800': '#1f2937',
      'gray-700': '#374151',
      'gray-600': '#4b5563',
      'gray-500': '#6b7280',
      'gray-400': '#9ca3af',
      'gray-300': '#D4D4D4',
      'gray-200': '#e5e7eb',
      'gray-100': '#f3f4f6',
      'gray-50': '#f9fafb',
      'error-red': '#f74747',
      'approved-blue': '#4095DE'
    },
    extend: {
      textColor: {
        DEFAULT: '#374151'
      }
    }
  },
  plugins: []
};

export default config;
