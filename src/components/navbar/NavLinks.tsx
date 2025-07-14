"use client";

import Link from "next/link";

import { navigationLinks } from "./constants";

export const NavLinks: React.FC = () => {
  const linkClass =
    "font-medium px-4 py-2 text-foreground hover:text-primary focus:text-primary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg hover:bg-muted";

  return (
    <>
      {navigationLinks.map((link) => (
        <Link key={link.href} href={link.href} className={linkClass}>
          {link.label}
        </Link>
      ))}
    </>
  );
};
