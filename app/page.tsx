"use client";

import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import Link from "next/link";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm p-4 border-b border-border flex flex-row justify-between items-center">
        <h1 className="text-xl font-semibold text-foreground">
          Pockets Dashboard
        </h1>
        <SignOutButton />
      </header>
      <main className="p-8 flex flex-col gap-8">
        <div className="max-w-4xl mx-auto w-full">
          <h1 className="text-4xl font-bold text-center text-foreground mb-2">
            Welcome to Pockets
          </h1>
          <p className="text-center text-muted-foreground mb-8">
            Your collaborative finance management dashboard
          </p>
          <Content />
        </div>
      </main>
    </>
  );
}

function SignOutButton() {
  const { isAuthenticated } = useConvexAuth();
  const { signOut } = useAuthActions();
  const router = useRouter();
  return (
    <>
      {isAuthenticated && (
        <button
          className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-md px-4 py-2 transition-colors"
          onClick={() =>
            void signOut().then(() => {
              router.push("/signin");
            })
          }
        >
          Sign out
        </button>
      )}
    </>
  );
}

function Content() {
  const { viewer, numbers } =
    useQuery(api.myFunctions.listNumbers, {
      count: 10,
    }) ?? {};
  const addNumber = useMutation(api.myFunctions.addNumber);

  if (viewer === undefined || numbers === undefined) {
    return (
      <div className="mx-auto">
        <p>loading... (consider a loading skeleton)</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 max-w-2xl mx-auto">
      <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
        <p className="text-lg mb-4">Welcome back, {viewer ?? "Anonymous"}!</p>
        <p className="text-muted-foreground mb-6">
          Your finance management dashboard is ready. Click the button below to
          test real-time data synchronization.
        </p>
        <button
          className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm px-6 py-3 rounded-md font-medium transition-colors"
          onClick={() => {
            void addNumber({ value: Math.floor(Math.random() * 10) });
          }}
        >
          Add a random number
        </button>
        <p className="mt-4 text-sm text-muted-foreground">
          Numbers:{" "}
          <span className="font-mono bg-muted px-2 py-1 rounded">
            {numbers?.length === 0
              ? "Click the button!"
              : (numbers?.join(", ") ?? "...")}
          </span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <h3 className="font-semibold text-foreground">Development</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              Edit{" "}
              <code className="font-mono bg-muted px-2 py-1 rounded text-xs">
                convex/myFunctions.ts
              </code>{" "}
              to change your backend
            </p>
            <p>
              Edit{" "}
              <code className="font-mono bg-muted px-2 py-1 rounded text-xs">
                app/page.tsx
              </code>{" "}
              to change your frontend
            </p>
            <Link
              href="/server"
              className="text-primary hover:text-primary/80 underline hover:no-underline"
            >
              View /server route example
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-foreground">Resources</h3>
          <div className="grid grid-cols-1 gap-3">
            <ResourceCard
              title="Convex Documentation"
              description="Complete guides and API references for all Convex features."
              href="https://docs.convex.dev/home"
            />
            <ResourceCard
              title="Templates & Examples"
              description="Browse our collection of templates to get started quickly."
              href="https://www.convex.dev/templates"
            />
            <ResourceCard
              title="Developer Community"
              description="Join our Discord to ask questions and share your projects."
              href="https://www.convex.dev/community"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ResourceCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="flex flex-col gap-2 bg-card hover:bg-accent/5 border border-border p-4 rounded-lg transition-colors group"
      target="_blank"
      rel="noopener noreferrer"
    >
      <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
        {title}
      </h4>
      <p className="text-xs text-muted-foreground">{description}</p>
    </a>
  );
}
