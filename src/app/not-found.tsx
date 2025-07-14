"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const NotFound = () => (
  <main className="bg-background flex flex-col items-center justify-center px-4">
    <div className="flex flex-col items-center gap-6">
      <Image src="/convex.svg" alt="Pockets Logo" width={48} height={48} />
      <h1 className="text-foreground text-4xl font-bold">404 – Not Found</h1>
      <p className="text-muted-foreground max-w-md text-center">
        Sorry, the page you’re looking for doesn’t exist or has been moved.
      </p>
      <div className="flex items-center gap-2">
        <Button>
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    </div>
  </main>
);

export default NotFound;
