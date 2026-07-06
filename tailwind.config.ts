import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#1C1410",      // خلفية بنية قهوة غامقة
        surface: "#2A1F17",   // خلفية البطاقات
        surface2: "#332619",
        copper: "#C97A3D",    // لون قشرة الكنافة
        pistachio: "#8FA86B", // أخضر الفستق
        cream: "#F2E8D8",     // نص فاتح
        gold: "#D4A24C",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
