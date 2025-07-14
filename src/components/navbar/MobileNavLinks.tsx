"use client";

import { useUser } from "@clerk/nextjs";
import { Lock } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

import { navigationLinks } from "./constants";

interface MobileNavLinksProps {
  onClose: () => void;
}

/**
 * Mobile navigation links with enhanced styling and animations.
 * Features large touch targets and smooth hover effects.
 */
export const MobileNavLinks: React.FC<MobileNavLinksProps> = ({ onClose }) => {
  const { isSignedIn } = useUser();
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

  // Only show links that are public or (if logged in) authOnly
  const visibleLinks = navigationLinks.filter(
    (link) => !link.authOnly || isSignedIn,
  );

  if (visibleLinks.length === 0) {
    // Optionally show a message for logged-out users
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="bg-muted mb-4 flex h-14 w-14 items-center justify-center rounded-full">
          <Lock className="text-muted-foreground h-8 w-8" />
        </div>
        <div className="text-foreground mb-1 text-lg font-semibold">
          You&apos;re not signed in
        </div>
        <div className="text-muted-foreground mb-2 text-base">
          Sign in to access your dashboard and menu options.
        </div>
      </div>
    );
  }

  return (
    <>
      {visibleLinks.map((link, index) => (
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
};
