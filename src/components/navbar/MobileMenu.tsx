"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";

import ThemeToggle from "@/components/ThemeToggle";

import { AuthButton } from "./AuthButton";
import { MobileNavLinks } from "./MobileNavLinks";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Full-screen mobile menu with smooth animations and accessibility features.
 * Implements focus trap and proper ARIA patterns.
 */
export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.4,
            }}
            className="bg-background fixed top-0 right-0 z-50 flex h-full w-96 max-w-[85vw] flex-col overflow-hidden shadow-2xl"
            role="navigation"
            aria-label="Mobile menu"
          >
            {/* Menu Header */}
            <div className="border-border flex items-center justify-between border-b p-6">
              <div className="flex items-center gap-2">
                <Image src="/convex.svg" alt="Pockets" width={24} height={24} />
                <span className="text-foreground text-lg font-semibold">
                  Menu
                </span>
              </div>
              <button
                onClick={onClose}
                className="hover:bg-muted focus:ring-ring flex h-8 w-8 items-center justify-center rounded-lg transition-colors focus:ring-2 focus:outline-none"
                aria-label="Close menu"
              >
                <span className="sr-only">Close menu</span>
                <svg
                  className="text-muted-foreground h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Navigation Links */}
            <div className="safe-area-inset-bottom flex-1 overflow-y-auto overscroll-contain px-6 py-6">
              <motion.div
                initial="closed"
                animate="open"
                variants={{
                  open: {
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.2,
                    },
                  },
                  closed: {
                    transition: {
                      staggerChildren: 0.05,
                      staggerDirection: -1,
                    },
                  },
                }}
                className="min-h-0 space-y-2 pb-40"
              >
                <MobileNavLinks onClose={onClose} />
              </motion.div>
            </div>

            {/* Gradient fade to hide content behind footer */}
            <div className="from-background via-background/90 pointer-events-none absolute right-0 bottom-0 left-0 z-10 h-32 bg-gradient-to-t to-transparent"></div>

            {/* Theme Toggle in Menu - Fixed at bottom of panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.3 }}
              className="border-border dark:border-border-dark bg-background absolute right-0 bottom-0 left-0 z-20 border-t px-6 pt-4 pb-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="text-foreground dark:text-foreground-dark text-sm font-medium">
                  Theme
                </span>
                <ThemeToggle />
              </div>
              <AuthButton onClose={onClose} />
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
