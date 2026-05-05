"use client";

import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Clock,
  Globe,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { AnimatedSection } from "./animated-section";
import { fadeInLeft, fadeInRight, fadeInUp, stagger } from "./animations";
import {
  coverageZones,
  merchantFeatures,
  pricingPlans,
  serviceItems,
  stats,
  steps,
  valueProps,
} from "./data";

function useCounter(end: number, duration = 1800, inView = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let start: number | null = null;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [duration, end, inView]);

  return count;
}

function StatCard({
  stat,
  inView,
  index,
}: {
  stat: (typeof stats)[number];
  inView: boolean;
  index: number;
}) {
  const count = useCounter(stat.value, 2000, inView);
  const formatted =
    stat.value >= 1000000
      ? `${(count / 1000000).toFixed(1)}M`
      : stat.value >= 1000
        ? `${Math.floor(count / 1000)}k`
        : count.toString();

  return (
    <motion.div
      variants={fadeInUp}
      custom={index}
      className="flex flex-col items-center gap-3 rounded-2xl border border-border/60 bg-card/60 p-6 text-center backdrop-blur-sm"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
        <stat.icon className="h-6 w-6" />
      </div>
      <div>
        <p className="text-4xl font-black tracking-tight text-foreground">
          {formatted}
          {stat.suffix}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
      </div>
    </motion.div>
  );
}

export const HowItWorksSection = () => {
  return (
    <section className="container mx-auto pad-horizontal section-default">
      <AnimatedSection className="text-center">
        <Badge
          variant="outline"
          className="mb-default border-secondary/30 bg-secondary/5 text-secondary"
        >
          Simple Process
        </Badge>
        <h2 className="heading-h3 tracking-tight md:heading-h2">
          How ParcelKoy Works
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          From registration to payment settlement — a streamlined 4-step process
          designed for busy merchants.
        </p>
      </AnimatedSection>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="relative mt-generous grid gap-generous sm:grid-cols-2 lg:grid-cols-4"
      >
        <div className="absolute top-10 left-[12.5%] right-[12.5%] hidden h-px border-t-2 border-dashed border-border lg:block" />
        {steps.map((step, index) => (
          <motion.div
            key={step.step}
            variants={fadeInUp}
            className="relative flex flex-col items-center gap-4 text-center"
          >
            <div className="relative z-10 flex h-20 w-20 flex-col items-center justify-center rounded-2xl border-2 border-secondary/20 bg-secondary/5 shadow-sm">
              <step.icon className="h-8 w-8 text-secondary" />
            </div>
            <div className="absolute -top-2 left-1/2 z-20 -translate-x-1/2">
              <span className="flex h-6 w-6 items-center justify-center radius-full bg-secondary text-xs font-bold text-secondary-foreground shadow">
                {index + 1}
              </span>
            </div>
            <div>
              <h3 className="heading-h5">{step.title}</h3>
              <p className="mt-default body-small leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export const ServicesSection = () => {
  return (
    <section className="bg-muted/30 py-14 md:py-20">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center">
          <Badge
            variant="outline"
            className="mb-3 border-secondary/30 bg-secondary/5 text-secondary"
          >
            What We Offer
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Our Services
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            End-to-end logistics solutions built for ecommerce merchants at
            every scale.
          </p>
        </AnimatedSection>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {serviceItems.map((item) => (
            <motion.div key={item.title} variants={fadeInUp}>
              <Card className="group h-full border bg-card/90 py-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <CardContent className="flex h-full flex-col items-start gap-4 p-6">
                  <div className={`rounded-xl p-3 ${item.color}`}>
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-auto flex items-center gap-1 text-sm font-medium text-secondary opacity-0 transition-opacity group-hover:opacity-100">
                    Learn more <ChevronRight className="h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export const ImpactSection = () => {
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-60px" });

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--secondary)/0.06),transparent_70%)]" />
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center">
          <Badge
            variant="outline"
            className="mb-3 border-secondary/30 bg-secondary/5 text-secondary"
          >
            Our Impact
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Numbers That Speak for Themselves
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Trusted by hundreds of thousands of merchants across Bangladesh.
          </p>
        </AnimatedSection>

        <motion.div
          ref={statsRef}
          initial="hidden"
          animate={statsInView ? "visible" : "hidden"}
          variants={stagger}
          className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              stat={stat}
              inView={statsInView}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export const AdvantagesSection = () => {
  return (
    <section className="bg-muted/30 py-14 md:py-20">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center">
          <Badge
            variant="outline"
            className="mb-3 border-secondary/30 bg-secondary/5 text-secondary"
          >
            Our Advantages
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Why Choose ParcelKoy?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            We go beyond delivery — we become your logistics partner, built for
            your growth.
          </p>
        </AnimatedSection>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {valueProps.map((item) => (
            <motion.div key={item.title} variants={fadeInUp}>
              <Card className="group h-full border transition-all duration-300 hover:-translate-y-0.5 hover:border-secondary/30 hover:shadow-sm">
                <CardHeader className="pb-2">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary transition-colors group-hover:bg-secondary group-hover:text-secondary-foreground">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-base">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0 pb-5 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export const CoverageSection = () => {
  return (
    <section className="py-14 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInLeft}
            className="space-y-6"
          >
            <Badge
              variant="outline"
              className="border-secondary/30 bg-secondary/5 text-secondary"
            >
              Delivery Coverage
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Delivering Across{" "}
              <span className="text-secondary">All 64 Districts</span>
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              From Dhaka metropolitan same-day delivery to the most remote
              sub-districts — our hub-based network ensures your parcels reach
              every corner of Bangladesh.
            </p>

            <div className="space-y-3">
              {coverageZones.map((zone) => (
                <div
                  key={zone.zone}
                  className="flex items-center justify-between rounded-xl border border-border/60 bg-card/60 px-5 py-3"
                >
                  <div className="flex items-center gap-3">
                    <MapPin className={`h-4 w-4 ${zone.color}`} />
                    <span className="font-medium text-foreground">
                      {zone.zone}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className={`text-sm font-semibold ${zone.color}`}>
                      {zone.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <Button asChild variant="secondary" className="mt-2">
              <Link href="/coverage">
                View Full Coverage Map <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInRight}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-linear-to-br from-secondary/5 via-secondary/10 to-blue-500/5 p-8">
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <Globe className="h-24 w-24 text-secondary/20" />
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 m-auto flex items-center justify-center"
                  >
                    <Globe className="h-16 w-16 text-secondary/60" />
                  </motion.div>
                </div>
                <p className="text-center text-lg font-semibold text-foreground">
                  Bangladesh Coverage
                </p>
                <div className="grid w-full grid-cols-2 gap-3 text-center">
                  {[
                    { label: "Divisions", value: "8" },
                    { label: "Districts", value: "64" },
                    { label: "Upazilas", value: "490+" },
                    { label: "Hubs", value: "120+" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-xl border border-secondary/20 bg-secondary/5 p-3"
                    >
                      <p className="text-2xl font-black text-secondary">
                        {item.value}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {[
                { top: "20%", left: "45%", delay: 0 },
                { top: "50%", left: "30%", delay: 0.8 },
                { top: "65%", left: "55%", delay: 1.6 },
                { top: "35%", left: "65%", delay: 0.4 },
              ].map((position, index) => (
                <motion.div
                  key={index}
                  style={{ top: position.top, left: position.left }}
                  animate={{ scale: [0, 1.5, 0], opacity: [0, 0.6, 0] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: position.delay,
                  }}
                  className="absolute h-3 w-3 rounded-full bg-secondary"
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export const PricingSection = () => {
  return (
    <section className="bg-muted/30 py-14 md:py-20">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center">
          <Badge
            variant="outline"
            className="mb-3 border-secondary/30 bg-secondary/5 text-secondary"
          >
            Transparent Pricing
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Simple, Honest Pricing
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            No hidden fees, no confusing tiers. Register free and only pay for
            what you deliver.
          </p>
        </AnimatedSection>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mt-12 grid gap-6 lg:grid-cols-3"
        >
          {pricingPlans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={fadeInUp}
              className={`relative rounded-2xl border p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                plan.highlight
                  ? "border-secondary bg-secondary/5 shadow-md ring-1 ring-secondary/20"
                  : "border-border/60 bg-card"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <Badge className="bg-secondary px-4 text-secondary-foreground shadow-sm">
                    Most Popular
                  </Badge>
                </div>
              )}

              <div className="mb-5">
                <h3 className="text-lg font-bold text-foreground">
                  {plan.name}
                </h3>
                <div className="mt-2 flex items-end gap-1">
                  <span className="text-4xl font-black text-foreground">
                    {plan.price}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {plan.priceNote}
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </div>

              <div className="mb-6 space-y-2.5">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                    <span className="text-sm text-foreground/80">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <Button
                asChild
                variant={plan.highlight ? "secondary" : "outline"}
                className="w-full"
              >
                <Link href="/register">{plan.cta}</Link>
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export const MerchantPortalSection = () => {
  return (
    <section className="py-14 md:py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid items-center gap-10 overflow-hidden rounded-3xl border border-secondary/20 bg-linear-to-br from-secondary/8 via-background to-blue-500/5 p-8 md:grid-cols-2 md:p-12"
        >
          <motion.div variants={fadeInLeft} className="space-y-5">
            <Badge
              variant="outline"
              className="border-secondary/30 bg-secondary/5 text-secondary"
            >
              Merchant Dashboard
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Manage Your Business <br />
              <span className="text-secondary">From One Place</span>
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              Track every parcel in real time, manage COD collections, download
              reports, and request pickups — all from your merchant portal.
              Available on web and mobile.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                asChild
                variant="secondary"
                size="lg"
                className="font-semibold"
              >
                <Link href="/register">
                  Open Free Account <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/login">Merchant Login</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div variants={fadeInRight} className="grid grid-cols-2 gap-4">
            {merchantFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className="rounded-xl border border-border/60 bg-card/80 p-4 backdrop-blur-sm"
              >
                <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                  <feature.icon className="h-4 w-4" />
                </div>
                <h4 className="text-sm font-semibold text-foreground">
                  {feature.title}
                </h4>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export const LandingCtaSection = () => {
  return (
    <section className="container mx-auto px-4 pb-14 md:pb-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-3xl bg-primary px-6 py-14 text-center text-primary-foreground"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-8 -left-8 h-36 w-36 rounded-full bg-white/10 blur-xl" />
        </div>

        <div className="relative">
          <Badge className="mb-4 bg-white/20 text-primary-foreground hover:bg-white/25">
            Ready to Scale?
          </Badge>
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight md:text-4xl">
            Grow Your Business with ParcelKoy
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-primary-foreground/85">
            Join over 300,000 merchants already using ParcelKoy to streamline
            deliveries and settle payments faster.
          </p>
          <div className="mt-8 flex flex-wrap justify-center items-center gap-3">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-lg px-6 text-base font-semibold shadow-none transition-all hover:scale-[1.02] bg-secondary hover:bg-secondary/90 text-secondary-foreground"
            >
              <Link href="/register">
                Become a Merchant — It&apos;s Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-orange-500 bg-transparent text-primary-foreground hover:bg-secondary/10 h-12"
            >
              <Link href="/contact">Talk to Sales</Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
