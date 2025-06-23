"use client";

import Link from "next/link";
import { Heart, Target, Zap } from "lucide-react";
import { useConvexAuth } from "convex/react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { motion, Variants } from "motion/react";
import {
  AnimatedHeroBackground,
  AnimatedCTAButton,
} from "@/components/landing-animations";

export default function Home() {
  const { isAuthenticated, isLoading } = useConvexAuth();

  // Animation variants using best practices
  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: (custom: number = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 * custom, duration: 0.7, ease: "easeOut" },
    }),
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/5 relative overflow-hidden">
      <AnimatedHeroBackground />
      {/* Hero Section */}
      <section className="py-32 px-6 lg:px-8 relative">
        {/* removed overflow-hidden and background */}
        <AnimatedHeroBackground />
        <motion.div
          className="max-w-5xl mx-auto text-center relative z-10"
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
        >
          <motion.div
            className="inline-block mb-8"
            variants={fadeUpVariants}
            custom={1}
          >
            <Badge
              variant="outline"
              className="inline-flex items-center gap-2 text-muted-foreground px-3 py-2 bg-muted/30 text-xs font-medium tracking-wide transition-colors duration-200 border-muted-foreground/20 uppercase shadow-sm"
            >
              <Heart className="w-3 h-3 fill-current text-primary" />
              Built for couples who dream together
            </Badge>
          </motion.div>
          <motion.h1
            className="font-extrabold text-5xl sm:text-7xl lg:text-8xl mb-6 tracking-tight leading-tight text-foreground drop-shadow-xl"
            variants={fadeUpVariants}
            custom={2}
          >
            <span
              className="block text-primary text-opacity-95 leading-none"
              style={{ letterSpacing: "-0.04em" }}
            >
              Financial Harmony
            </span>
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-16 max-w-2xl mx-auto leading-relaxed font-medium"
            variants={fadeUpVariants}
            custom={3}
          >
            Transform how you and your partner manage money together.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            variants={fadeUpVariants}
            custom={4}
          >
            {isLoading ? (
              <Skeleton className="h-[60px] w-[220px] rounded-2xl" />
            ) : isAuthenticated ? (
              <AnimatedCTAButton href="/dashboard">
                <span className="flex items-center justify-center gap-3 text-lg font-semibold tracking-wide">
                  Go to Dashboard
                  <span className="group-hover:translate-x-1 transition-transform duration-200 text-xl">
                    →
                  </span>
                </span>
              </AnimatedCTAButton>
            ) : (
              <AnimatedCTAButton href="/signin">
                <span className="flex items-center justify-center gap-3 text-lg font-semibold tracking-wide">
                  Start Our Journey
                  <span className="group-hover:translate-x-1 transition-transform duration-200 text-xl">
                    →
                  </span>
                </span>
              </AnimatedCTAButton>
            )}
          </motion.div>
        </motion.div>
      </section>
      {/* Features Section */}
      <motion.section
        className="py-32 px-6 lg:px-8 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUpVariants}
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <motion.div
              className="inline-block mb-6"
              variants={fadeUpVariants}
              custom={1}
            >
              <span className="inline-flex items-center gap-2 bg-muted/60 text-muted-foreground px-4 py-2 rounded-full text-sm font-semibold border border-muted-foreground/10">
                <Target className="w-4 h-4 text-primary" />
                Three pillars of financial partnership
              </span>
            </motion.div>
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight"
              variants={fadeUpVariants}
              custom={2}
            >
              Why couples choose{" "}
              <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Pockets
              </span>
            </motion.h2>
            <motion.div
              className="w-32 h-1 bg-gradient-to-r from-primary via-primary/80 to-primary/60 mx-auto rounded-full"
              variants={fadeUpVariants}
              custom={3}
            ></motion.div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
            <FeatureCard
              icon={<Heart className="w-10 h-10" />}
              title="Complete Transparency"
              subtitle="See everything together"
              description="No more financial surprises. Every transaction, every goal, every decision—shared in real-time with complete clarity and trust."
              index={1}
            />
            <FeatureCard
              icon={<Target className="w-10 h-10" />}
              title="Unified Budgeting"
              subtitle="Plan your future as one"
              description="Set shared goals, track progress together, and make every dollar count toward the dreams you're building as a couple."
              index={2}
            />
            <FeatureCard
              icon={<Zap className="w-10 h-10" />}
              title="Instant Updates"
              subtitle="Always in sync"
              description="When one partner makes a purchase, the other knows instantly. Stay connected to your finances, no matter where you are."
              index={3}
            />
          </div>
        </div>
      </motion.section>
      {/* CTA Section */}
      <motion.section
        className="py-32 px-6 lg:px-8 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUpVariants}
      >
        {/* Subtle background pattern - unified with the main gradient */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <div
            className="absolute inset-0 text-muted-foreground"
            style={{
              backgroundImage: `radial-gradient(circle at 30px 30px, currentColor 2px, transparent 0)`,
              backgroundSize: "60px 60px",
            }}
          ></div>
        </div>
        <motion.div
          className="max-w-4xl mx-auto text-center relative z-10"
          variants={fadeUpVariants}
        >
          <motion.div
            className="inline-block mb-8"
            variants={fadeUpVariants}
            custom={1}
          >
            <div className="text-6xl mb-4">💝</div>
            <span className="inline-flex items-center gap-2 bg-muted/30 text-muted-foreground px-6 py-3 rounded-full text-sm font-semibold border border-muted-foreground/10">
              <Zap className="w-4 h-4 text-primary" />
              Ready to transform your financial future?
            </span>
          </motion.div>
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-foreground mb-8 leading-tight"
            variants={fadeUpVariants}
            custom={2}
          >
            Your financial journey{" "}
            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              begins today
            </span>
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
            variants={fadeUpVariants}
            custom={3}
          >
            Experience the peace of mind that comes with
            <span className="font-semibold text-foreground">
              {" "}
              shared financial clarity
            </span>
            . Built for couples who want to grow together.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            variants={fadeUpVariants}
            custom={4}
          >
            <AnimatedCTAButton href="/signin">
              <span className="flex items-center justify-center gap-3">
                Start Building Together
                <span className="group-hover:translate-x-1 transition-transform duration-200 text-2xl">
                  →
                </span>
              </span>
            </AnimatedCTAButton>
            <div className="text-sm text-muted-foreground">
              <div className="flex items-center gap-2 justify-center">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Free to start • No credit card required
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>
    </main>
  );
}

// Reusable animated circle for background blobs
function AnimatedCircle({
  className,
  delay = 0,
}: {
  className: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.2, delay }}
    />
  );
}

// FeatureCard now animated and using variants
function FeatureCard({
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
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: (custom: number = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 * custom, duration: 0.7, ease: "easeOut" },
    }),
  };
  return (
    <motion.div
      className="bg-background/80 backdrop-blur-sm border border-muted/30 rounded-3xl p-6 text-center transition-all duration-500"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      custom={index}
    >
      <div className="text-primary mb-4 flex justify-center">
        <div className="p-3 bg-muted/20 rounded-2xl">{icon}</div>
      </div>
      <h3 className="text-xl font-bold text-foreground mb-1">{title}</h3>
      {subtitle && (
        <p className="text-xs font-semibold text-primary mb-3 uppercase tracking-wide">
          {subtitle}
        </p>
      )}
      <p className="text-muted-foreground leading-relaxed text-base">
        {description}
      </p>
    </motion.div>
  );
}
