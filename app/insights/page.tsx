import React from "react";

export default function ComingSoon() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">🚧 Coming Soon</h1>
        <p className="text-lg text-muted-foreground mb-8">
          This page is under construction. Check back soon!
        </p>
      </div>
    </main>
  );
}
