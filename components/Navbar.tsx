"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

/**
 * Responsive, accessible navigation bar for Pockets.
 * Includes animated hamburger menu for mobile.
 */
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Lock scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Keyboard navigation: close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Skip to main content
  // (Add id="main-content" to your main content container)

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-surface-light dark:bg-surface-dark border-b border-primary/10 dark:border-primary-dark/20 shadow-sm">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only absolute left-2 top-2 bg-primary text-white rounded px-2 py-1 z-50"
      >
        Skip to main content
      </a>
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3 md:py-2">
        <Link href="/" className="flex items-center gap-2 focus:outline-none">
          <Image src="/convex.svg" alt="Pockets Logo" width={32} height={32} />
          <span className="font-bold text-lg text-primary">Pockets</span>
        </Link>
        {/* Desktop nav */}
        <div className="hidden md:flex gap-6 items-center">
          <NavLinks />
        </div>
        {/* Hamburger */}
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 relative z-50 focus:outline-none group"
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`block h-0.5 w-6 rounded bg-primary transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`}
          ></span>
          <span
            className={`block h-0.5 w-6 rounded bg-primary transition-all duration-300 my-1 ${open ? "opacity-0" : ""}`}
          ></span>
          <span
            className={`block h-0.5 w-6 rounded bg-primary transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`}
          ></span>
        </button>
        {/* Mobile menu */}
        <div
          ref={menuRef}
          id="mobile-menu"
          aria-hidden={!open}
          className={`fixed inset-0 bg-black/40 dark:bg-black/60 transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        >
          <div
            className={`absolute top-0 right-0 h-full w-64 bg-surface-light dark:bg-surface-dark shadow-lg transform transition-transform duration-400 ease-in-out ${open ? "translate-x-0" : "translate-x-full"}`}
            tabIndex={-1}
            role="menu"
            aria-label="Main menu"
          >
            <nav
              className="flex flex-col gap-6 mt-20 px-8"
              onClick={() => setOpen(false)}
            >
              <NavLinks mobile />
            </nav>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLinks({ mobile }: { mobile?: boolean }) {
  const linkClass =
    "text-foreground-light dark:text-foreground-dark font-medium hover:text-primary focus:text-primary transition-colors focus:outline-none px-1 py-2" +
    (mobile ? " text-lg" : "");
  return (
    <>
      <Link href="/" className={linkClass} tabIndex={0} role="menuitem">
        Dashboard
      </Link>
      <Link href="/expenses" className={linkClass} tabIndex={0} role="menuitem">
        Expenses
      </Link>
      <Link href="/budgets" className={linkClass} tabIndex={0} role="menuitem">
        Budgets
      </Link>
      <Link href="/insights" className={linkClass} tabIndex={0} role="menuitem">
        Insights
      </Link>
      <Link href="/account" className={linkClass} tabIndex={0} role="menuitem">
        Account
      </Link>
    </>
  );
}
