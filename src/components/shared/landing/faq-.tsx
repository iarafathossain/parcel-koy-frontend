import { FAQ } from "@/app/(common-layout)/page";

export const FaqSection = ({
  title = "Frequently Asked Questions",
  faqs,
}: {
  title?: string;
  faqs: FAQ[];
}) => {
  return (
    <section className="container mx-auto max-w-4xl px-4 py-12 md:py-16">
      <h2 className="text-center text-3xl font-semibold tracking-tight">
        {title}
      </h2>
      <div className="mt-8 space-y-3">
        {faqs.map((faq) => (
          <details
            key={faq.question}
            className="group rounded-lg border bg-card px-5 py-4"
          >
            <summary className="cursor-pointer list-none pr-6 text-base font-semibold marker:content-none">
              <span className="inline-flex w-full items-center justify-between gap-4">
                {faq.question}
                <span className="text-primary transition-transform group-open:rotate-45">
                  +
                </span>
              </span>
            </summary>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
};
