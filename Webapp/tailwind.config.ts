import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        peach: "#EA846D",
        "peach-dark": "#D77965",
        blue: "#5B8FDF",
        "blue-dark": "#5889D3",
        green: "#A5AE6F",
        "green-dark": "#9CA267",
        mustard: "#BD7A18",
        "mustard-dark": "#A56A16",
      },
    },
  },
  plugins: [],
} satisfies Config;
