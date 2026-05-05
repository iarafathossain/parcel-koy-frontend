"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Bike,
  CheckCircle2,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

import { semanticTones } from "@/components/shared/semantic-tones";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { fadeInUp, stagger } from "./animations";
import { heroArtwork } from "./cycle";

export const HeroSection = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden border-b bg-[linear-gradient(90deg,rgba(242,247,255,1)_0%,rgba(248,252,255,1)_36%,rgba(255,247,235,1)_72%,rgba(255,251,245,1)_100%)] dark:bg-[linear-gradient(120deg,oklch(0.2_0.03_253)_0%,oklch(0.23_0.04_253)_45%,oklch(0.26_0.05_253)_100%)]"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-0 h-full w-full bg-[radial-gradient(circle_at_18%_18%,rgba(59,130,246,0.08),transparent_28%),radial-gradient(circle_at_72%_18%,rgba(245,158,11,0.08),transparent_24%)] dark:bg-[radial-gradient(circle_at_18%_18%,oklch(0.5_0.12_253/0.2),transparent_30%),radial-gradient(circle_at_72%_18%,oklch(0.672_0.175_48/0.16),transparent_26%)]" />
        <div className="absolute top-[8%] left-[42%] h-10 w-20 rounded-full bg-white/70 blur-sm dark:bg-primary/25" />
        <div className="absolute top-[5%] right-[23%] h-12 w-28 rounded-full bg-white/70 blur-sm dark:bg-secondary/20" />
        <motion.div
          animate={{ y: [0, -12, 0], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[8%] h-3 w-3 rounded-full bg-secondary/40"
        />
        <motion.div
          animate={{ y: [0, 14, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute top-[35%] left-[15%] h-2 w-2 rounded-full bg-primary/40"
        />
        <motion.div
          animate={{ y: [0, -10, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-[25%] right-[10%] h-2.5 w-2.5 rounded-full bg-secondary/30"
        />
      </div>

      <div className="container relative mx-auto grid gap-generous px-4 py-16 md:min-h-176 md:grid-cols-[0.88fr_1.12fr] md:items-center md:py-24 lg:pad-horizontal">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          style={{ opacity: heroOpacity }}
          className="space-y-generous md:pl-6 lg:pl-12"
        >
          <motion.div variants={fadeInUp}>
            <Badge
              variant="outline"
              className="mb-standard gap-standard border-secondary/30 bg-secondary/5 px-3 py-1 text-secondary"
            >
              <Zap className="h-3 w-3" />
              Bangladesh&apos;s Fastest Growing Courier
            </Badge>
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className="max-w-xl heading-h1 leading-[1.08] tracking-tight text-foreground sm:heading-h1 lg:text-[4.2rem]"
          >
            <span className="relative inline-block">We Deliver</span>
            <span className="block">Parcel on Time with</span>
            <span className="block text-secondary">no Hassle</span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="max-w-lg body-default leading-7 text-foreground/80"
          >
            Easy Tracking, fast Payment, and safe Delivery across the country.
            Join <span className="font-semibold text-foreground">300,000+</span>{" "}
            merchants growing with ParcelKoy.
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap gap-default"
          >
            <Button
              asChild
              variant="secondary"
              className="h-12 radius-md px-6 text-base font-semibold shadow-none transition-all hover:scale-[1.02]"
            >
              <Link href="/register">
                Become a Merchant
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 radius-md px-6 text-base font-medium"
            >
              <Link href="/track-parcel">Track Your Parcel</Link>
            </Button>
          </motion.div>
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap items-center gap-standard pt-2 text-sm text-muted-foreground"
          >
            {["Free Registration", "COD Support", "24/7 Pickup"].map(
              (label) => (
                <span key={label} className="flex items-center gap-default">
                  <CheckCircle2 className="h-4 w-4 text-secondary" />
                  {label}
                </span>
              ),
            )}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          style={{ y: heroY }}
          className="relative flex items-center justify-center pt-4 md:pt-0"
        >
          <div className="absolute right-3 top-16 z-10 space-y-4 md:right-4 lg:right-10">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex items-center gap-default radius-lg border border-border/70 bg-white/80 px-4 py-default shadow-sm backdrop-blur dark:bg-card/80"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
                <Users className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold tracking-tight text-foreground">
                  300k+
                </p>
                <p className="text-xs text-muted-foreground">
                  Registered Merchants
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex items-center gap-3 rounded-xl border border-border/70 bg-white/80 px-4 py-3 shadow-sm backdrop-blur dark:bg-card/80"
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${semanticTones.info.soft}`}
              >
                <Bike className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold tracking-tight text-foreground">
                  5k+
                </p>
                <p className="text-xs text-muted-foreground">Delivery Agents</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0, duration: 0.5 }}
              className="flex items-center gap-3 rounded-xl border border-border/70 bg-white/80 px-4 py-3 shadow-sm backdrop-blur dark:bg-card/80"
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${semanticTones.warning.soft}`}
              >
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold tracking-tight text-foreground">
                  98.2%
                </p>
                <p className="text-xs text-muted-foreground">
                  Delivery Success
                </p>
              </div>
            </motion.div>
          </div>

          <div className="relative w-full max-w-80 sm:max-w-120 -translate-x-18 sm:-translate-x-8 lg:-translate-x-18">
            <div className="absolute inset-x-[14%] bottom-8 h-0.5 rounded-full bg-black/10 blur-[0.5px] dark:bg-white/10" />
            <div
              className="relative w-full drop-shadow-[0_16px_28px_rgba(0,0,0,0.08)]"
              dangerouslySetInnerHTML={{ __html: heroArtwork }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
