"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

/**
 * ThemeToggle renders a button to toggle between light and dark mode, with animation.
 */
export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  const isDark = resolvedTheme === "dark";
  return (
    <button
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="ml-2 p-2 rounded-full bg-surface-light dark:bg-surface-dark border border-primary/20 dark:border-primary-dark/30 hover:bg-primary/10 dark:hover:bg-primary-dark/10 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      type="button"
    >
      <span className="relative block w-5 h-5">
        <AnimatePresence initial={false} mode="wait">
          {isDark ? (
            <motion.span
              key="sun"
              initial={{ rotate: -90, scale: 0.7, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0.7, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 25,
                duration: 0.15,
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Sun className="w-5 h-5 text-primary" />
            </motion.span>
          ) : (
            <motion.span
              key="moon"
              initial={{ rotate: 90, scale: 0.7, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -90, scale: 0.7, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 25,
                duration: 0.15,
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Moon className="w-5 h-5 text-primary" />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </button>
  );
}
