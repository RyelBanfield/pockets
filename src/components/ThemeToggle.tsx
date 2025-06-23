"use client";
import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Button } from "./ui/button";

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
    <Button
      variant="outline"
      size="icon"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="hover:bg-muted focus:ring-ring h-11 w-11 rounded-lg transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      type="button"
    >
      <span className="relative block h-5 w-5">
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
              <Sun className="text-foreground h-5 w-5" />
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
              <Moon className="text-foreground h-5 w-5" />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </Button>
  );
}
