import React from "react";

interface ComingSoonProps {
  title?: string;
  message?: string;
  icon?: React.ReactNode;
}

/**
 * A reusable ComingSoon component that fills available space and centers its content.
 * Accepts optional title, message, and icon props for customization.
 */
export default function ComingSoon({
  title = "Coming Soon",
  message = "This page is under construction. Check back soon!",
  icon = (
    <span role="img" aria-label="Under construction">
      🚧
    </span>
  ),
}: ComingSoonProps) {
  return (
    <section className="bg-background text-foreground flex h-full min-h-[60vh] w-full flex-1 flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 flex items-center justify-center gap-2 text-4xl font-bold">
          {icon} {title}
        </h1>
        <p className="text-muted-foreground mb-8 text-lg">{message}</p>
      </div>
    </section>
  );
}
