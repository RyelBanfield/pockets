import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import ConvexClientProvider from "@/components/ConvexClientProvider";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pockets – Personal Finance for Couples",
  description:
    "Pockets is a simple, collaborative personal finance app for couples. Track expenses, manage budgets, and achieve your financial goals together with real-time updates and a modern, intuitive design.",
  icons: {
    icon: "/convex.svg",
  },
};

// Compose all providers in a single component for clarity
const Providers = ({ children }: { children: React.ReactNode }) => (
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

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html lang="en" suppressHydrationWarning>
    <body
      className={`${inter.className} from-background to-eggshell-700/20 dark:from-background dark:to-delft_blue-600/10 flex min-h-screen flex-col bg-gradient-to-br antialiased`}
    >
      <Providers>
        <header className="sticky top-0 z-50">
          <Navbar />
        </header>
        <main className="flex flex-shrink-0 flex-grow pt-20">{children}</main>
        <footer className="mt-auto">
          <Footer />
        </footer>
      </Providers>
    </body>
  </html>
);

export default RootLayout;
