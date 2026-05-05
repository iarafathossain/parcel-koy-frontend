"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

import { AnimatedSection } from "./animated-section";
import { fadeInUp, stagger } from "./animations";
import type { LandingFaq } from "./types";

export const FaqSection = ({
  title = "Frequently Asked Questions",
  badge = "Questions?",
  description = "Find answers to common questions about ParcelKoy.",
  faqs,
}: {
  title?: string;
  badge?: string;
  description?: string;
  faqs: LandingFaq[];
}) => {
  return (
    <section className="bg-muted/30 py-14 md:py-20">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center">
          <Badge
            variant="outline"
            className="mb-3 border-secondary/30 bg-secondary/5 text-secondary"
          >
            {badge}
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            {description}
          </p>
        </AnimatedSection>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mx-auto mt-12 max-w-4xl"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <motion.div key={faq.question} variants={fadeInUp} custom={index}>
                <AccordionItem value={faq.question}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};
