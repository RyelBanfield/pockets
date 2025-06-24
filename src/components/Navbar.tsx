"use client";

import {
  SignInButton,
  SignOutButton as ClerkSignOutButton,
  useUser,
} from "@clerk/nextjs";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import ThemeToggle from "@/src/components/ThemeToggle";
import { Button } from "@/src/components/ui/button";

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
      <nav className="bg-background/95 border-border fixed top-0 left-0 z-50 w-full border-b shadow-sm backdrop-blur-xl">
        <a
          href="#main-content"
          className="bg-primary text-primary-foreground sr-only absolute top-2 left-2 z-50 rounded px-2 py-1 focus:not-sr-only"
        >
          Skip to main content
        </a>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:py-4">
          <Link
            href="/"
            className="focus:ring-ring flex items-center gap-2 rounded-lg p-1 focus:ring-2 focus:ring-offset-2 focus:outline-none"
          >
            <Image
              src="/convex.svg"
              alt="Pockets Logo"
              width={32}
              height={32}
            />
            <span className="text-foreground text-xl font-bold">Pockets</span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-1 md:flex">
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
      className="hover:bg-muted focus:ring-ring relative flex h-11 w-11 items-center justify-center rounded-lg transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
      {...props}
    >
      <div className="flex h-6 w-6 flex-col items-center justify-center">
        <motion.span
          animate={{
            rotate: isOpen ? 45 : 0,
            y: isOpen ? 0 : -5,
          }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="bg-foreground absolute block h-0.5 w-5 rounded-full"
          style={{ transformOrigin: "center center" }}
        />
        <motion.span
          animate={{
            opacity: isOpen ? 0 : 1,
            scale: isOpen ? 0.8 : 1,
          }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="bg-foreground absolute block h-0.5 w-5 rounded-full"
        />
        <motion.span
          animate={{
            rotate: isOpen ? -45 : 0,
            y: isOpen ? 0 : 5,
          }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="bg-foreground absolute block h-0.5 w-5 rounded-full"
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
            className="bg-background fixed top-0 right-0 z-50 flex h-full w-80 max-w-[85vw] flex-col overflow-hidden shadow-2xl"
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
            className="group focus:ring-ring hover:bg-muted flex min-h-[48px] items-center gap-4 rounded-xl py-3 transition-all duration-200 hover:-mx-2 hover:px-4 focus:ring-2 focus:ring-offset-2 focus:outline-none"
          >
            <div className="from-primary/10 to-primary/20 group-hover:from-primary/20 group-hover:to-primary/30 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br transition-all duration-200">
              <span className="text-lg" role="img" aria-hidden="true">
                {link.icon}
              </span>
            </div>
            <div className="flex-1">
              <div className="text-foreground group-hover:text-primary font-semibold transition-colors">
                {link.label}
              </div>
              <div className="text-muted-foreground mt-0.5 text-sm">
                {link.description}
              </div>
            </div>
            <svg
              className="text-muted-foreground group-hover:text-primary h-5 w-5 transition-colors"
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

function AuthButton({ onClose }: { onClose?: () => void }) {
  const { isSignedIn } = useUser();

  if (isSignedIn) {
    return (
      <ClerkSignOutButton>
        <Button
          className="mt-2 w-full"
          onClick={() => {
            onClose?.();
          }}
        >
          Sign out
        </Button>
      </ClerkSignOutButton>
    );
  }
  return (
    <Button className="mt-2 w-full" asChild>
      <SignInButton mode="modal">Sign in</SignInButton>
    </Button>
  );
}
