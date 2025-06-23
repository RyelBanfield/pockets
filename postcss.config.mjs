const config = {
  plugins: ["@tailwindcss/postcss"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6366F1", // Indigo-500
          dark: "#4F46E5", // Indigo-600
        },
        secondary: {
          DEFAULT: "#10B981", // Emerald-500
          dark: "#059669", // Emerald-600
        },
        background: {
          light: "#F8FAFC", // Slate-50
          dark: "#0F172A", // Slate-900
        },
        surface: {
          light: "#FFFFFF",
          dark: "#1E293B", // Slate-800
        },
        foreground: {
          light: "#1E293B", // Slate-800
          dark: "#F1F5F9", // Slate-100
        },
        error: "#F43F5E", // Rose-500
        warning: "#F59E42", // Amber-400
        info: "#0EA5E9", // Sky-500
      },
    },
  },
};

export default config;
