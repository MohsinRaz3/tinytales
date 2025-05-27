// import type { Config } from "tailwindcss";

// const config: Config = {
//   content: [
//     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       screens: {
//         'sm': '320px',
//         'mm': '375px',
//         'ml': '425px',
//         'md': '768px',
//         'xmd': '831px',
//         'lg': '1024px',
//         'xlg': '1150px',
//         'xl': '1440px',
//         '2xl': '2560px',
//       },
//       colors: {
//         background: "var(--background)",
//         foreground: "var(--foreground)",
//       },
//       keyframes: {
//         'fade-in-out': {
//           '0%': { opacity: 0 },
//           '20%': { opacity: 1 },
//           '80%': { opacity: 1 },
//           '100%': { opacity: 0 },
//         }
//       },
//       animation: {
//         'fade-in-out': 'fade-in-out 5s ease-in-out infinite', // Adjust the timing here as needed
//       },
//     },
//   },
//   plugins: [],
// };
// export default config;
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'sm': '320px',
        'mm': '375px',
        'ml': '425px',
        'md': '768px',
        'xmd': '831px',
        'lg': '1024px',
        'xlg': '1150px',
        'xl': '1440px',
        '2xl': '2560px',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        'fade-in-out': {
          '0%': { opacity: "0" },
          '20%': { opacity: "1" },
          '80%': { opacity: "1" },
          '100%': { opacity: "0" },
        },
      },
      animation: {
        'fade-in-out': 'fade-in-out 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
