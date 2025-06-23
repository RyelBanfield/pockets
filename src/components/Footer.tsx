import React from "react";

export default function Footer() {
  return (
    <footer className="text-muted-foreground w-full py-4 text-center text-xs">
      &copy; {new Date().getFullYear()} Pockets. All rights reserved.
    </footer>
  );
}
