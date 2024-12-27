import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)'
      },
      backgroundImage: {
        gradient: 'linear-gradient(to right bottom, #03020C, #070425);'
      },
      animation: {
        'spin-slow': 'spin 1s linear infinite',
      },
    }
  },
  plugins: [require('tailwindcss-textshadow')]
};
export default config;
