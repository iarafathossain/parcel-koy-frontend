import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { LandingFaq } from "./types";

export const FaqSection = ({
  title = "Frequently Asked Questions",
  faqs,
}: {
  title?: string;
  faqs: LandingFaq[];
}) => {
  return (
    <section className="container mx-auto max-w-4xl px-4 py-12 md:py-16">
      <h2 className="text-center text-3xl font-semibold tracking-tight">
        {title}
      </h2>
      <Accordion type="single" collapsible className="mt-16">
        {faqs.map((faq) => (
          <AccordionItem key={faq.question} value={faq.question}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
