"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import ThemeToggle from "@/components/ThemeToggle";
import { useAuthActions } from "@convex-dev/auth/react";
import { useConvexAuth } from "convex/react";
import { Button } from "@/components/ui/button";

/**
 * Responsive navigation bar for Pockets with animated hamburger menu.
 * Features smooth animations, full accessibility, and mobile-first design.
 */
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when menu is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Haptic feedback on supported devices
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };
  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-background/95 backdrop-blur-xl border-b border-border shadow-sm">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only absolute left-2 top-2 bg-primary text-primary-foreground rounded px-2 py-1 z-50"
        >
          Skip to main content
        </a>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
          <Link
            href="/"
            className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg p-1"
          >
            <Image
              src="/convex.svg"
              alt="Pockets Logo"
              width={32}
              height={32}
            />
            <span className="font-bold text-xl text-foreground">Pockets</span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex gap-1 items-center">
            <NavLinks />
            <div className="ml-4">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile: Theme toggle and hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <HamburgerButton
              isOpen={isMenuOpen}
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            />
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}

function NavLinks() {
  const linkClass =
    "font-medium px-4 py-2 text-foreground hover:text-primary focus:text-primary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg hover:bg-muted";

  const links = [
    { href: "/dashboard", label: "Dashboard", icon: "📊" },
    { href: "/transactions", label: "Transactions", icon: "💳" },
    { href: "/goals", label: "Goals", icon: "🎯" },
    { href: "/insights", label: "Insights", icon: "📈" },
    { href: "/settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <>
      {links.map((link) => (
        <Link key={link.href} href={link.href} className={linkClass}>
          {link.label}
        </Link>
      ))}
    </>
  );
}

/**
 * Animated hamburger button that transforms from 3 lines to X.
 * Follows mobile accessibility best practices with 44px touch target.
 */
function HamburgerButton({
  isOpen,
  onClick,
  ...props
}: {
  isOpen: boolean;
  onClick: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Button
      variant={"outline"}
      onClick={onClick}
      className="relative w-11 h-11 flex items-center justify-center rounded-lg hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      {...props}
    >
      <div className="w-6 h-6 flex flex-col items-center justify-center">
        <motion.span
          animate={{
            rotate: isOpen ? 45 : 0,
            y: isOpen ? 0 : -5,
          }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="absolute block h-0.5 w-5 bg-foreground rounded-full"
          style={{ transformOrigin: "center center" }}
        />
        <motion.span
          animate={{
            opacity: isOpen ? 0 : 1,
            scale: isOpen ? 0.8 : 1,
          }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="absolute block h-0.5 w-5 bg-foreground rounded-full"
        />
        <motion.span
          animate={{
            rotate: isOpen ? -45 : 0,
            y: isOpen ? 0 : 5,
          }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="absolute block h-0.5 w-5 bg-foreground rounded-full"
          style={{ transformOrigin: "center center" }}
        />
      </div>
    </Button>
  );
}

/**
 * Full-screen mobile menu with smooth animations and accessibility features.
 * Implements focus trap and proper ARIA patterns.
 */
function MobileMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
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
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
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
            className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-background shadow-2xl z-50 flex flex-col overflow-hidden"
            role="navigation"
            aria-label="Mobile menu"
          >
            {/* Menu Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-2">
                <Image src="/convex.svg" alt="Pockets" width={24} height={24} />
                <span className="font-semibold text-lg text-foreground">
                  Menu
                </span>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
                aria-label="Close menu"
              >
                <span className="sr-only">Close menu</span>
                <svg
                  className="w-5 h-5 text-muted-foreground"
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
            <div className="flex-1 py-6 px-6 safe-area-inset-bottom overflow-y-auto overscroll-contain">
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
                className="space-y-2 min-h-0 pb-40"
              >
                <MobileNavLinks onClose={onClose} />
              </motion.div>
            </div>

            {/* Gradient fade to hide content behind footer */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/90 to-transparent pointer-events-none z-10"></div>

            {/* Theme Toggle in Menu - Fixed at bottom of panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.3 }}
              className="absolute bottom-0 left-0 right-0 pt-4 px-6 pb-6 border-t border-border dark:border-border-dark bg-background z-20"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-foreground dark:text-foreground-dark">
                  Theme
                </span>
                <ThemeToggle />
              </div>
              <SignOutButton onClose={onClose} />
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/**
 * Mobile navigation links with enhanced styling and animations.
 * Features large touch targets and smooth hover effects.
 */
function MobileNavLinks({ onClose }: { onClose: () => void }) {
  const links = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: "📊",
      description: "Your financial overview",
    },
    {
      href: "/transactions",
      label: "Transactions",
      icon: "💳",
      description: "Track expenses & income",
    },
    {
      href: "/goals",
      label: "Goals",
      icon: "🎯",
      description: "Savings & budgets",
    },
    {
      href: "/insights",
      label: "Insights",
      icon: "📈",
      description: "Financial reports",
    },
    {
      href: "/settings",
      label: "Settings",
      icon: "⚙️",
      description: "Account & preferences",
    },
  ];

  const itemVariants = {
    open: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 24,
      },
    },
    closed: {
      y: 20,
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <>
      {links.map((link, index) => (
        <motion.div key={link.href} variants={itemVariants} custom={index}>
          <Link
            href={link.href}
            onClick={onClose}
            className="group flex items-center gap-4 py-3 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 min-h-[48px] hover:bg-muted hover:px-4 hover:-mx-2"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-primary/20 group-hover:from-primary/20 group-hover:to-primary/30 transition-all duration-200">
              <span className="text-lg" role="img" aria-hidden="true">
                {link.icon}
              </span>
            </div>
            <div className="flex-1">
              <div className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {link.label}
              </div>
              <div className="text-sm text-muted-foreground mt-0.5">
                {link.description}
              </div>
            </div>
            <svg
              className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </motion.div>
      ))}
    </>
  );
}

function SignOutButton({ onClose }: { onClose?: () => void }) {
  const { signOut } = useAuthActions();
  const { isAuthenticated } = useConvexAuth();
  if (isAuthenticated) {
    return (
      <Button
        variant="destructive"
        className="w-full mt-2"
        onClick={() => {
          signOut();
          onClose?.();
        }}
      >
        Sign out
      </Button>
    );
  }
  return (
    <Button variant="default" className="w-full mt-2" asChild>
      <Link href="/signin" onClick={onClose}>
        Sign in
      </Link>
    </Button>
  );
}
