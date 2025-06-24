"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { useConvexAuth } from "convex/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/src/components/ui/button";

export default function SignIn() {
  const { signIn } = useAuthActions();
  const { isAuthenticated, isLoading } = useConvexAuth();
  const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Redirect to home if already authenticated
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, isLoading, router]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center pt-24">
        <div className="flex w-full max-w-md flex-col items-center gap-8 p-8">
          <div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2"></div>
          <p className="text-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render sign-in form if already authenticated
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center pt-24">
      <div className="flex w-full max-w-md flex-col gap-8 p-8">
        <div className="flex flex-col items-center gap-2">
          <Image
            src="/convex.svg"
            alt="Pockets Logo"
            width={48}
            height={48}
            className="mb-2"
          />
          <h1 className="text-foreground text-3xl font-bold">Pockets</h1>
          <p className="text-muted-foreground text-center text-base">
            {flow === "signIn"
              ? "Welcome back! Sign in to manage your finances together."
              : "Create your account to start managing your finances as a couple."}
          </p>
        </div>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);

            const email = formData.get("email") as string;
            const password = formData.get("password") as string;

            void signIn("password", {
              email,
              password,
              flow,
            }).catch((error) => {
              console.error("Sign-in error:", error);
              setError(error.message || "An error occurred during sign-in");
            });
          }}
        >
          <label className="flex flex-col gap-1">
            <span className="text-foreground text-sm font-medium">Email</span>
            <input
              className="bg-card text-foreground border-border focus:ring-ring rounded-md border p-3 transition-all focus:border-transparent focus:ring-2 focus:outline-none"
              type="email"
              name="email"
              placeholder="you@email.com"
              required
              autoComplete="email"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-foreground text-sm font-medium">
              Password
            </span>
            <input
              className="bg-card text-foreground border-border focus:ring-ring rounded-md border p-3 transition-all focus:border-transparent focus:ring-2 focus:outline-none"
              type="password"
              name="password"
              placeholder="Password"
              required
              autoComplete={
                flow === "signIn" ? "current-password" : "new-password"
              }
            />
          </label>
          <Button variant="default" className="mt-4 w-full" type="submit">
            {flow === "signIn" ? "Sign in" : "Sign up"}
          </Button>
          <div className="mt-2 flex flex-row justify-center gap-2 text-sm">
            <span className="text-muted-foreground">
              {flow === "signIn"
                ? "Don't have an account?"
                : "Already have an account?"}
            </span>
            <Button
              type="button"
              variant="link"
              className="text-primary hover:text-primary/80 h-auto p-0 font-medium"
              onClick={() => setFlow(flow === "signIn" ? "signUp" : "signIn")}
            >
              {flow === "signIn" ? "Sign up instead" : "Sign in instead"}
            </Button>
          </div>
          {error && (
            <div className="bg-destructive/10 border-destructive/30 mt-2 rounded-md border p-3">
              <p className="text-destructive text-sm">
                Error signing in: {error}
              </p>
            </div>
          )}
        </form>
        <div className="text-muted-foreground text-center text-xs">
          By continuing, you agree to the Pockets Terms of Service and Privacy
          Policy.
        </div>
      </div>
    </div>
  );
}
