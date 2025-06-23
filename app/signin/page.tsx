"use client";

import Image from "next/image";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
  const { signIn } = useAuthActions();
  // fallback: check for userId in localStorage or similar if no session hook is available
  const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // TODO: Replace with actual session check from Convex Auth when available
  // For now, skip redirect logic if no session hook is available

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
          <h1 className="text-3xl font-bold text-foreground-light dark:text-foreground-dark">
            Pockets
          </h1>
          <p className="text-foreground-light/70 dark:text-foreground-dark/70 text-center text-base">
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
            <span className="text-sm font-medium text-foreground-light dark:text-foreground-dark">
              Email
            </span>
            <input
              className="bg-background-light dark:bg-background-dark text-foreground-light dark:text-foreground-dark rounded-md p-3 border-2 border-primary/20 dark:border-primary-dark/30 focus:outline-none focus:ring-2 focus:ring-primary"
              type="email"
              name="email"
              placeholder="you@email.com"
              required
              autoComplete="email"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-foreground-light dark:text-foreground-dark">
              Password
            </span>
            <input
              className="bg-background-light dark:bg-background-dark text-foreground-light dark:text-foreground-dark rounded-md p-3 border-2 border-primary/20 dark:border-primary-dark/30 focus:outline-none focus:ring-2 focus:ring-primary"
              type="password"
              name="password"
              placeholder="Password"
              required
              autoComplete={
                flow === "signIn" ? "current-password" : "new-password"
              }
            />
          </label>
          <button
            className="mt-2 bg-primary hover:bg-primary-dark text-white font-semibold rounded-md py-3 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
            type="submit"
          >
            {flow === "signIn" ? "Sign in" : "Sign up"}
          </button>
          <div className="flex flex-row gap-2 justify-center text-sm mt-2">
            <span className="text-foreground-light dark:text-foreground-dark">
              {flow === "signIn"
                ? "Don't have an account?"
                : "Already have an account?"}
            </span>
            <button
              type="button"
              className="text-primary hover:underline font-medium focus:outline-none"
              onClick={() => setFlow(flow === "signIn" ? "signUp" : "signIn")}
            >
              {flow === "signIn" ? "Sign up instead" : "Sign in instead"}
            </button>
          </div>
          {error && (
            <div className="bg-error/10 border-2 border-error/30 rounded-md p-2 mt-2">
              <p className="text-error font-mono text-xs">
                Error signing in: {error}
              </p>
            </div>
          )}
        </form>
        <div className="text-xs text-foreground-light/50 dark:text-foreground-dark/50 text-center">
          By continuing, you agree to the Pockets Terms of Service and Privacy
          Policy.
        </div>
      </div>
    </div>
  );
}
