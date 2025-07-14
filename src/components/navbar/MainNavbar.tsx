"use client";

import { SignInButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";

import { HamburgerButton } from "./HamburgerButton";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";
import { useNavbar } from "./useNavbar";

/**
 * Responsive navigation bar for Pockets with animated hamburger menu.
 * Features smooth animations, full accessibility, and mobile-first design.
 */
const Navbar: React.FC = () => {
  const { isMenuOpen, toggleMenu, closeMenu } = useNavbar();
  const { isSignedIn } = useUser();

  return (
    <>
      <nav className="bg-background/95 border-border fixed top-0 left-0 z-50 w-full border-b shadow-sm backdrop-blur-xl">
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
            <div className="ml-4 flex items-center gap-2">
              <ThemeToggle />
              {!isSignedIn && (
                <SignInButton mode="modal">
                  <Button variant="outline">Sign in</Button>
                </SignInButton>
              )}
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
      <MobileMenu isOpen={isMenuOpen} onClose={closeMenu} />
    </>
  );
};

export default Navbar;
