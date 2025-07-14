"use client";

import {
  SignInButton,
  SignOutButton as ClerkSignOutButton,
  useUser,
} from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

interface AuthButtonProps {
  onClose?: () => void;
}

export const AuthButton: React.FC<AuthButtonProps> = ({ onClose }) => {
  const { isSignedIn } = useUser();

  if (isSignedIn) {
    return (
      <ClerkSignOutButton>
        <Button
          className="mt-2 w-full"
          onClick={() => {
            onClose?.();
          }}
        >
          Sign out
        </Button>
      </ClerkSignOutButton>
    );
  }
  return (
    <Button className="mt-2 w-full" asChild>
      <SignInButton mode="modal">Sign in</SignInButton>
    </Button>
  );
};
