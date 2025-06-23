import "./globals.css";

import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import ConvexClientProvider from "@/src/components/ConvexClientProvider";
import Footer from "@/src/components/Footer";
import Navbar from "@/src/components/Navbar";
import { ThemeProvider } from "@/src/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexAuthNextjsServerProvider>
      <ConvexClientProvider>
        <html lang="en" suppressHydrationWarning>
          <body
            className={`${geistSans.variable} ${geistMono.variable} from-background to-eggshell-700/20 dark:from-background dark:to-delft_blue-600/10 flex min-h-screen flex-col bg-gradient-to-br antialiased`}
          >
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <header className="sticky top-0 z-50">
                <Navbar />
              </header>
              <main className="flex-shrink-0 flex-grow pt-20">{children}</main>
              <footer className="mt-auto">
                <Footer />
              </footer>
            </ThemeProvider>
          </body>
        </html>
      </ConvexClientProvider>
    </ConvexAuthNextjsServerProvider>
  );
}
