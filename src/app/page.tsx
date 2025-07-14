"use client";

import { SignInButton, useUser } from "@clerk/nextjs";
import { Heart, Target, Zap } from "lucide-react";
import { motion, Variants } from "motion/react";

import {
  AnimatedCTAButton,
  AnimatedHeroBackground,
} from "@/components/landing-animations";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { isSignedIn, isLoaded } = useUser();

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
    <main className="from-background via-background to-muted/5 relative min-h-screen overflow-hidden bg-gradient-to-br">
      <AnimatedHeroBackground />
      {/* Hero Section */}
      <section className="relative px-6 py-32 lg:px-8">
        {/* removed overflow-hidden and background */}
        <AnimatedHeroBackground />
        <motion.div
          className="relative z-10 mx-auto max-w-5xl text-center"
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
        >
          <motion.div
            className="mb-8 inline-block"
            variants={fadeUpVariants}
            custom={1}
          >
            <Badge
              variant="outline"
              className="text-muted-foreground bg-muted/30 border-muted-foreground/20 inline-flex items-center gap-2 px-3 py-2 text-xs font-medium tracking-wide uppercase shadow-sm transition-colors duration-200"
            >
              <Heart className="text-primary h-3 w-3 fill-current" />
              Built for couples who dream together
            </Badge>
          </motion.div>
          <motion.h1
            className="text-foreground mb-6 text-5xl leading-tight font-extrabold tracking-tight drop-shadow-xl sm:text-7xl lg:text-8xl"
            variants={fadeUpVariants}
            custom={2}
          >
            <span
              className="text-primary text-opacity-95 block leading-none"
              style={{ letterSpacing: "-0.04em" }}
            >
              Financial Harmony
            </span>
          </motion.h1>
          <motion.p
            className="text-muted-foreground mx-auto mb-16 max-w-2xl text-lg leading-relaxed font-medium sm:text-xl md:text-2xl"
            variants={fadeUpVariants}
            custom={3}
          >
            Transform how you and your partner manage money together.
          </motion.p>
          <motion.div
            className="flex flex-col items-center justify-center gap-6 sm:flex-row"
            variants={fadeUpVariants}
            custom={4}
          >
            {!isLoaded ? (
              <Skeleton className="h-[60px] w-[220px] rounded-2xl" />
            ) : isSignedIn ? (
              <AnimatedCTAButton href="/dashboard">
                <span className="flex items-center justify-center gap-3">
                  Go to Dashboard
                  <span className="text-xl transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </AnimatedCTAButton>
            ) : (
              <SignInButton mode="modal">
                <AnimatedCTAButton>
                  <span className="flex items-center justify-center gap-3">
                    Start Our Journey
                    <span className="text-xl transition-transform duration-200 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </AnimatedCTAButton>
              </SignInButton>
            )}
          </motion.div>
        </motion.div>
      </section>
      {/* Features Section */}
      <motion.section
        className="relative px-6 py-32 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUpVariants}
      >
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-20 text-center">
            <motion.div
              className="mb-6 inline-block"
              variants={fadeUpVariants}
              custom={1}
            >
              <span className="bg-muted/60 text-muted-foreground border-muted-foreground/10 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold">
                <Target className="text-primary h-4 w-4" />
                Three pillars of financial partnership
              </span>
            </motion.div>
            <motion.h2
              className="text-foreground mb-6 text-4xl leading-tight font-bold md:text-5xl"
              variants={fadeUpVariants}
              custom={2}
            >
              Why couples choose{" "}
              <span className="from-primary to-primary/80 bg-gradient-to-r bg-clip-text text-transparent">
                Pockets
              </span>
            </motion.h2>
            <motion.div
              className="from-primary via-primary/80 to-primary/60 mx-auto h-1 w-32 rounded-full bg-gradient-to-r"
              variants={fadeUpVariants}
              custom={3}
            ></motion.div>
          </div>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 lg:gap-12">
            <FeatureCard
              icon={<Heart className="h-10 w-10" />}
              title="Complete Transparency"
              subtitle="See everything together"
              description="No more financial surprises. Every transaction, every goal, every decision—shared in real-time with complete clarity and trust."
              index={1}
            />
            <FeatureCard
              icon={<Target className="h-10 w-10" />}
              title="Unified Budgeting"
              subtitle="Plan your future as one"
              description="Set shared goals, track progress together, and make every dollar count toward the dreams you're building as a couple."
              index={2}
            />
            <FeatureCard
              icon={<Zap className="h-10 w-10" />}
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
        className="relative px-6 py-32 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUpVariants}
      >
        {/* Subtle background pattern - unified with the main gradient */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.02]">
          <div
            className="text-muted-foreground absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 30px 30px, currentColor 2px, transparent 0)`,
              backgroundSize: "60px 60px",
            }}
          ></div>
        </div>
        <motion.div
          className="relative z-10 mx-auto max-w-4xl text-center"
          variants={fadeUpVariants}
        >
          <motion.div
            className="mb-8 inline-block"
            variants={fadeUpVariants}
            custom={1}
          >
            <div className="mb-4 text-6xl">💝</div>
            <span className="bg-muted/30 text-muted-foreground border-muted-foreground/10 inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold">
              <Zap className="text-primary h-4 w-4" />
              Ready to transform your financial future?
            </span>
          </motion.div>
          <motion.h2
            className="text-foreground mb-8 text-4xl leading-tight font-bold md:text-5xl"
            variants={fadeUpVariants}
            custom={2}
          >
            Your financial journey{" "}
            <span className="from-primary to-primary/80 bg-gradient-to-r bg-clip-text text-transparent">
              begins today
            </span>
          </motion.h2>
          <motion.p
            className="text-muted-foreground mx-auto mb-12 max-w-2xl text-xl leading-relaxed"
            variants={fadeUpVariants}
            custom={3}
          >
            Experience the peace of mind that comes with
            <span className="text-foreground font-semibold">
              {" "}
              shared financial clarity
            </span>
            . Built for couples who want to grow together.
          </motion.p>
          <motion.div
            className="flex flex-col items-center justify-center gap-6 sm:flex-row"
            variants={fadeUpVariants}
            custom={4}
          >
            {!isLoaded ? (
              <Skeleton className="h-[60px] w-[260px] rounded-2xl" />
            ) : isSignedIn ? (
              <AnimatedCTAButton href="/dashboard">
                <span className="flex items-center justify-center gap-3">
                  Go to Dashboard
                  <span className="text-2xl transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </AnimatedCTAButton>
            ) : (
              <SignInButton mode="modal">
                <AnimatedCTAButton>
                  <span className="flex items-center justify-center gap-3">
                    Start Building Together
                    <span className="text-2xl transition-transform duration-200 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </AnimatedCTAButton>
              </SignInButton>
            )}
            <div className="text-muted-foreground text-sm">
              <div className="flex items-center justify-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                Free to start • No credit card required
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>
    </main>
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
