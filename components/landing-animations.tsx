import { motion, useInView } from "motion/react";
import { Heart, Target, Zap } from "lucide-react";
import { useRef } from "react";

// Use correct Easing type from motion/react
const customEase = [0.16, 1, 0.3, 1] as const;

export function AnimatedHeroBackground() {
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
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
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
}

export function AnimatedCTAButton({
  children,
  ...props
}: React.ComponentProps<"a">) {
  return (
    <motion.a
      whileHover={{
        scale: 1.06,
        boxShadow: "0 8px 32px 0 rgba(99,102,241,0.15)",
      }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 200, damping: 12 }}
      {...(props as any)}
      className={
        "group bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-5 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl shadow-primary/20 border border-primary/20 " +
        (props.className || "")
      }
    >
      {children}
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-active:opacity-30 group-active:animate-ripple" />
    </motion.a>
  );
}

export function AnimatedFeatureCard({
  icon,
  title,
  subtitle,
  description,
  index = 1,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  description: string;
  index?: number;
}) {
  const cardVariants = {
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
  return (
    <motion.div
      className="group bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl p-10 text-center hover:shadow-2xl hover:shadow-primary/8 transition-all duration-500 hover:scale-[1.04] hover:border-primary/30 hover:bg-card/80 relative"
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
      <div className="text-primary mb-6 group-hover:scale-110 transition-transform duration-300 flex justify-center">
        <div className="p-4 bg-primary/10 rounded-2xl group-hover:bg-primary/15 transition-colors">
          {icon}
        </div>
      </div>
      <h3 className="text-2xl font-bold text-foreground mb-2">{title}</h3>
      {subtitle && (
        <p className="text-sm font-semibold text-primary mb-4 uppercase tracking-wide">
          {subtitle}
        </p>
      )}
      <p className="text-muted-foreground leading-relaxed text-lg">
        {description}
      </p>
      <motion.div
        className="absolute inset-0 rounded-3xl pointer-events-none border-2 border-gradient-to-r from-primary/30 to-accent/30 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-500"
        aria-hidden
      />
    </motion.div>
  );
}
