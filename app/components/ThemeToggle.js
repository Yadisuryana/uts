"use client";

import { useTheme } from "@/app/context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      className="fixed bottom-4 left-4 z-50 px-4 py-2 rounded-lg shadow-md transition-all duration-300
          bg-gray-800 text-white hover:bg-gray-700 dark:bg-yellow-400 dark:text-black dark:hover:bg-yellow-300
          flex items-center gap-2"
    >
      <span className="text-xl">{theme === "dark" ? "☀️" : "🌙"}</span>
      <span className="hidden md:inline">
        {theme === "dark" ? "Light Mode" : "Dark Mode"}
      </span>
    </button>
  );
}
