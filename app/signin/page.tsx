"use client";

import Image from "next/image";
import { useAuthActions } from "@convex-dev/auth/react";
import { useConvexAuth } from "convex/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

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
      <div className="flex-1 flex flex-col justify-center items-center pt-24">
        <div className="w-full max-w-md p-8 flex flex-col gap-8 items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
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
    <div className="flex-1 flex flex-col justify-center items-center pt-24">
      <div className="w-full max-w-md p-8 flex flex-col gap-8">
        <div className="flex flex-col items-center gap-2">
          <Image
            src="/convex.svg"
            alt="Pockets Logo"
            width={48}
            height={48}
            className="mb-2"
          />
          <h1 className="text-3xl font-bold text-foreground">Pockets</h1>
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
            formData.set("flow", flow);
            void signIn("password", formData)
              .catch((error) => {
                setError(error.message);
              })
              .then(() => {
                router.push("/");
              });
          }}
        >
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-foreground">Email</span>
            <input
              className="bg-card text-foreground rounded-md p-3 border border-border focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
              type="email"
              name="email"
              placeholder="you@email.com"
              required
              autoComplete="email"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-foreground">
              Password
            </span>
            <input
              className="bg-card text-foreground rounded-md p-3 border border-border focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
              type="password"
              name="password"
              placeholder="Password"
              required
              autoComplete={
                flow === "signIn" ? "current-password" : "new-password"
              }
            />
          </label>
          <Button variant="default" className="w-full mt-4" type="submit">
            {flow === "signIn" ? "Sign in" : "Sign up"}
          </Button>
          <div className="flex flex-row gap-2 justify-center text-sm mt-2">
            <span className="text-muted-foreground">
              {flow === "signIn"
                ? "Don't have an account?"
                : "Already have an account?"}
            </span>
            <Button
              type="button"
              variant="link"
              className="text-primary hover:text-primary/80 font-medium p-0 h-auto"
              onClick={() => setFlow(flow === "signIn" ? "signUp" : "signIn")}
            >
              {flow === "signIn" ? "Sign up instead" : "Sign in instead"}
            </Button>
          </div>
          {error && (
            <div className="bg-destructive/10 border border-destructive/30 rounded-md p-3 mt-2">
              <p className="text-destructive text-sm">
                Error signing in: {error}
              </p>
            </div>
          )}
        </form>
        <div className="text-xs text-muted-foreground text-center">
          By continuing, you agree to the Pockets Terms of Service and Privacy
          Policy.
        </div>
      </div>
    </div>
  );
}
