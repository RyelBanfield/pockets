"use client";

import { motion } from "motion/react";

import { Button } from "@/components/ui/button";

interface HamburgerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isOpen: boolean;
  onClick: () => void;
}

/**
 * Animated hamburger button that transforms from 3 lines to X.
 * Follows mobile accessibility best practices with 44px touch target.
 */
export const HamburgerButton: React.FC<HamburgerButtonProps> = ({
  isOpen,
  onClick,
  ...props
}) => {
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
};
