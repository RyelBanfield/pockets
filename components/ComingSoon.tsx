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
    <section className="flex flex-1 flex-col items-center justify-center w-full h-full min-h-[60vh] bg-background text-foreground">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-2">
          {icon} {title}
        </h1>
        <p className="text-lg text-muted-foreground mb-8">{message}</p>
      </div>
    </section>
  );
}
