"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";

import { AnimatedSection } from "./animated-section";
import { fadeInUp, staggerFast } from "./animations";
import { testimonials } from "./data";

export const TestimonialsSection = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((previous) => (previous + 1) % testimonials.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-14 md:py-20">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center">
          <Badge
            variant="outline"
            className="mb-3 border-secondary/30 bg-secondary/5 text-secondary"
          >
            Merchant Stories
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            What Merchants Are Saying
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Thousands of merchants trust ParcelKoy to power their deliveries
            every day.
          </p>
        </AnimatedSection>

        <div className="mt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mb-8 max-w-2xl rounded-2xl border border-secondary/20 bg-linear-to-br from-secondary/5 to-transparent p-8 text-center"
            >
              <Quote className="mx-auto mb-4 h-8 w-8 text-secondary/40" />
              <p className="text-lg leading-relaxed text-foreground/90">
                {testimonials[activeTestimonial].text}
              </p>
              <div className="mt-6 flex flex-col items-center gap-1">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white ${testimonials[activeTestimonial].bg}`}
                >
                  {testimonials[activeTestimonial].avatar}
                </div>
                <p className="font-semibold text-foreground">
                  {testimonials[activeTestimonial].name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {testimonials[activeTestimonial].role}
                </p>
                <div className="mt-1 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mb-10 flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveTestimonial(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeTestimonial
                    ? "w-6 bg-secondary"
                    : "w-2 bg-border hover:bg-secondary/40"
                }`}
              />
            ))}
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerFast}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                variants={fadeInUp}
                onClick={() => setActiveTestimonial(index)}
                className={`cursor-pointer rounded-xl border p-5 transition-all duration-200 hover:border-secondary/30 hover:shadow-sm ${
                  index === activeTestimonial
                    ? "border-secondary/40 bg-secondary/5"
                    : "border-border/60 bg-card/60"
                }`}
              >
                <div className="mb-3 flex gap-0.5">
                  {Array.from({ length: testimonial.rating }).map(
                    (_, starIndex) => (
                      <Star
                        key={starIndex}
                        className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                      />
                    ),
                  )}
                </div>
                <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                  {testimonial.text}
                </p>
                <div className="mt-4 flex items-center gap-2.5">
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${testimonial.bg}`}
                  >
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
