import React from "react";

export default function Footer() {
  return (
    <footer className="w-full py-4 text-center text-xs text-muted-foreground">
      &copy; {new Date().getFullYear()} Pockets. All rights reserved.
    </footer>
  );
}
