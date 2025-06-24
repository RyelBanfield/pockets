"use client";

import { SignUp, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignUpPage() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  // Redirect to dashboard if already signed in
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push("/dashboard");
    }
  }, [isSignedIn, isLoaded, router]);

  // Show loading state while checking authentication
  if (!isLoaded) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center pt-24">
        <div className="flex w-full max-w-md flex-col items-center gap-8 p-8">
          <div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2"></div>
          <p className="text-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render sign-up form if already signed in
  if (isSignedIn) {
    return null;
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center pt-24">
      <div className="flex w-full max-w-md flex-col items-center gap-8 p-8">
        <div className="mb-8 flex flex-col items-center gap-2">
          <h1 className="text-foreground text-3xl font-bold">Join Pockets</h1>
          <p className="text-muted-foreground text-center text-base">
            Create your account to start managing finances together as a couple.
          </p>
        </div>

        <SignUp
          appearance={{
            elements: {
              formButtonPrimary:
                "bg-primary hover:bg-primary/90 text-primary-foreground",
              card: "bg-card border border-border shadow-lg",
              headerTitle: "text-foreground",
              headerSubtitle: "text-muted-foreground",
              socialButtonsBlockButton:
                "border-border text-foreground hover:bg-muted",
              formFieldInput: "bg-background border-border text-foreground",
              formFieldLabel: "text-foreground",
              dividerLine: "bg-border",
              dividerText: "text-muted-foreground",
              footerActionLink: "text-primary hover:text-primary/80",
            },
          }}
          signInUrl="/signin"
          redirectUrl="/dashboard"
        />

        <div className="text-muted-foreground mt-4 text-center text-xs">
          By continuing, you agree to the Pockets Terms of Service and Privacy
          Policy.
        </div>
      </div>
    </div>
  );
}
