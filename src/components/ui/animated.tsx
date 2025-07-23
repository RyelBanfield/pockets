import { motion, useInView, Variants } from "motion/react";
import { useRef } from "react";
import React from "react";

// Easing for all animations
const customEase = [0.16, 1, 0.3, 1] as const;

export const AnimatedHeroBackground = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const blobs = [
    {
      className:
        "absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full blur-3xl",
      delay: 0.1,
    },
    {
      className:
        "absolute top-40 right-20 w-80 h-80 bg-gradient-to-tr from-primary/30 to-primary/15 rounded-full blur-2xl",
      delay: 0.3,
    },
    {
      className:
        "absolute bottom-32 left-1/4 w-48 h-48 bg-gradient-to-tl from-primary/25 to-primary/8 rounded-full blur-2xl",
      delay: 0.5,
    },
    {
      className:
        "absolute top-1/2 right-1/4 w-40 h-40 bg-gradient-to-br from-primary/15 to-primary/5 rounded-full blur-xl",
      delay: 0.7,
    },
  ];
  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className={blob.className}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={
            inView
              ? { scale: 1, opacity: 1, y: [0, 20 * (i % 2 === 0 ? 1 : -1), 0] }
              : {}
          }
          transition={{
            duration: 1.2,
            delay: blob.delay,
            repeat: Infinity,
            repeatType: "reverse",
            ease: customEase,
          }}
          aria-hidden
        />
      ))}
    </div>
  );
};

export const AnimatedCTAButton = ({
  children,
  className = "",
  href,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
}) => {
  const baseClassName =
    "group bg-primary hover:bg-primary/90 text-primary-foreground shadow-primary/20 border-primary/20 [&_*]:!text-primary-foreground inline-flex items-center justify-center rounded-2xl border px-10 py-5 text-lg font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl " +
    className;

  const motionProps = {
    whileHover: {
      scale: 1.06,
      boxShadow: "0 8px 32px 0 rgba(99,102,241,0.15)",
    },
    whileTap: { scale: 0.96 },
    transition: { type: "spring" as const, stiffness: 200, damping: 12 },
    className: baseClassName,
    style: {
      color: "var(--primary-foreground)",
    } as React.CSSProperties,
  };

  const content = (
    <>
      <div style={{ color: "inherit" }}>{children}</div>
      <span className="group-active:animate-ripple pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-active:opacity-30" />
    </>
  );

  if (href) {
    return (
      <motion.a {...motionProps} href={href}>
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button {...motionProps} onClick={onClick} type="button">
      {content}
    </motion.button>
  );
};

export interface AnimatedFeatureCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  description: string;
  index?: number;
  variant?: "default" | "simple";
}

export const AnimatedFeatureCard: React.FC<AnimatedFeatureCardProps> = ({
  icon,
  title,
  subtitle,
  description,
  index = 1,
  variant = "default",
}) => {
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: (custom: number = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.15 * custom,
        duration: 0.8,
        ease: customEase,
      },
    }),
  };
  if (variant === "simple") {
    return (
      <motion.div
        className="bg-background/80 border-muted/30 rounded-3xl border p-6 text-center backdrop-blur-sm transition-all duration-500"
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        custom={index}
      >
        <div className="text-primary mb-4 flex justify-center">
          <div className="bg-muted/20 rounded-2xl p-3">{icon}</div>
        </div>
        <h3 className="text-foreground mb-1 text-xl font-bold">{title}</h3>
        {subtitle && (
          <p className="text-primary mb-3 text-xs font-semibold tracking-wide uppercase">
            {subtitle}
          </p>
        )}
        <p className="text-muted-foreground text-base leading-relaxed">
          {description}
        </p>
      </motion.div>
    );
  }
  return (
    <motion.div
      className="group bg-card/50 border-border/50 hover:shadow-primary/8 hover:border-primary/30 hover:bg-card/80 relative rounded-3xl border p-10 text-center backdrop-blur-sm transition-all duration-500 hover:scale-[1.04] hover:shadow-2xl"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      custom={index}
      whileHover={{
        rotateY: 8,
        scale: 1.06,
        boxShadow: "0 8px 32px 0 rgba(99,102,241,0.15)",
        borderColor: "#6366F1",
      }}
      tabIndex={0}
      aria-label={title}
    >
      <div className="text-primary mb-6 flex justify-center transition-transform duration-300 group-hover:scale-110">
        <div className="bg-primary/10 group-hover:bg-primary/15 rounded-2xl p-4 transition-colors">
          {icon}
        </div>
      </div>
      <h3 className="text-foreground mb-2 text-2xl font-bold">{title}</h3>
      {subtitle && (
        <p className="text-primary mb-4 text-sm font-semibold tracking-wide uppercase">
          {subtitle}
        </p>
      )}
      <p className="text-muted-foreground text-lg leading-relaxed">
        {description}
      </p>
      <motion.div
        className="border-gradient-to-r from-primary/30 to-accent/30 pointer-events-none absolute inset-0 rounded-3xl border-2 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus:opacity-100"
        aria-hidden
      />
    </motion.div>
  );
};
