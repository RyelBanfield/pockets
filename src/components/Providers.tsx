import type { ReactNode } from "react";

import { ClerkProvider } from "@clerk/nextjs";

import ConvexClientProvider from "@/components/ConvexClientProvider";
import { ThemeProvider } from "@/components/theme-provider";

const Providers = ({ children }: { children: ReactNode }) => (
  <ClerkProvider>
    <ConvexClientProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </ConvexClientProvider>
  </ClerkProvider>
);

export default Providers;
