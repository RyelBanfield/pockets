"use client";

import Link from "next/link";
import { Heart, Target, Zap } from "lucide-react";
import { useConvexAuth } from "convex/react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/10">
      {/* Hero Section */}
      <section className="py-32 px-6 lg:px-8 relative overflow-hidden">
        {/* Enhanced background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary/8 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-40 h-40 bg-accent/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-32 left-1/4 w-24 h-24 bg-muted/20 rounded-full blur-xl animate-pulse delay-500"></div>
          <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-primary/5 rounded-full blur-lg animate-pulse delay-2000"></div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-block mb-8">
            <span className="inline-flex items-center gap-3 bg-primary/8 hover:bg-primary/12 text-primary px-6 py-3 rounded-full text-sm font-semibold transition-colors duration-200 border border-primary/20">
              <Heart className="w-4 h-4 fill-current" />
              Built for couples who dream together
            </span>
          </div>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold text-foreground mb-8 tracking-tight leading-none">
            Financial{" "}
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              harmony
            </span>
            <br />
            <span className="text-4xl md:text-5xl lg:text-6xl font-medium text-muted-foreground">
              starts here
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-16 max-w-3xl mx-auto leading-relaxed">
            Transform how you and your partner manage money together.
            <br />
            <span className="font-semibold text-foreground mt-2 block">
              See everything, plan everything, achieve everything — as one.
            </span>
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            {isLoading ? (
              <Skeleton className="h-[60px] w-[220px] rounded-2xl" />
            ) : isAuthenticated ? (
              <Link
                href="/dashboard"
                className="group bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-5 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl shadow-primary/20 border border-primary/20"
              >
                <span className="flex items-center justify-center gap-3">
                  Go to Dashboard
                  <span className="group-hover:translate-x-1 transition-transform duration-200 text-xl">
                    →
                  </span>
                </span>
              </Link>
            ) : (
              <Link
                href="/signin"
                className="group bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-5 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl shadow-primary/20 border border-primary/20"
              >
                <span className="flex items-center justify-center gap-3">
                  Start Our Journey
                  <span className="group-hover:translate-x-1 transition-transform duration-200 text-xl">
                    →
                  </span>
                </span>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-6 lg:px-8 bg-gradient-to-r from-muted/20 via-background to-muted/20 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <div className="inline-block mb-6">
              <span className="inline-flex items-center gap-2 bg-accent/80 text-accent-foreground px-4 py-2 rounded-full text-sm font-semibold">
                <Target className="w-4 h-4" />
                Three pillars of financial partnership
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Why couples choose{" "}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Pockets
              </span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-primary via-primary/80 to-primary/60 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
            <FeatureCard
              icon={<Heart className="w-10 h-10" />}
              title="Complete Transparency"
              subtitle="See everything together"
              description="No more financial surprises. Every transaction, every goal, every decision—shared in real-time with complete clarity and trust."
            />
            <FeatureCard
              icon={<Target className="w-10 h-10" />}
              title="Unified Budgeting"
              subtitle="Plan your future as one"
              description="Set shared goals, track progress together, and make every dollar count toward the dreams you're building as a couple."
            />
            <FeatureCard
              icon={<Zap className="w-10 h-10" />}
              title="Instant Updates"
              subtitle="Always in sync"
              description="When one partner makes a purchase, the other knows instantly. Stay connected to your finances, no matter where you are."
            />
          </div>
        </div>

        {/* Enhanced decorative elements */}
        <div className="absolute top-20 left-10 w-8 h-8 bg-primary/15 rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-12 h-12 bg-accent/20 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-6 h-6 bg-muted/30 rounded-full"></div>
        <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-primary/10 rounded-full"></div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 lg:px-8 relative overflow-hidden">
        {/* Enhanced background pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 30px 30px, currentColor 2px, transparent 0)`,
              backgroundSize: "60px 60px",
            }}
          ></div>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block mb-8">
            <div className="text-6xl mb-4">💝</div>
            <span className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-accent/10 text-foreground px-6 py-3 rounded-full text-sm font-semibold border border-primary/20">
              <Zap className="w-4 h-4" />
              Ready to transform your financial future?
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8 leading-tight">
            Your financial journey{" "}
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              begins today
            </span>
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Experience the peace of mind that comes with
            <span className="font-semibold text-foreground">
              {" "}
              shared financial clarity
            </span>
            . Built for couples who want to grow together.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/signin"
              className="group inline-block bg-gradient-to-r from-primary via-primary/90 to-primary/80 hover:from-primary/95 hover:via-primary/85 hover:to-primary/75 text-primary-foreground px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl shadow-primary/20 border border-primary/20"
            >
              <span className="flex items-center justify-center gap-3">
                Start Building Together
                <span className="group-hover:translate-x-1 transition-transform duration-200 text-2xl">
                  →
                </span>
              </span>
            </Link>
            <div className="text-sm text-muted-foreground">
              <div className="flex items-center gap-2 justify-center">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Free to start • No credit card required
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  subtitle,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  description: string;
}) {
  return (
    <div className="group bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl p-10 text-center hover:shadow-2xl hover:shadow-primary/8 transition-all duration-500 hover:scale-[1.02] hover:border-primary/30 hover:bg-card/80">
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
    </div>
  );
}
