"use client";
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * ThemeProvider wraps next-themes for dark mode support.
 * @param children React children
 * @param props next-themes provider props
 */
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
