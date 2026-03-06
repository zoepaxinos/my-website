'use client';

import { Accordion, AccordionItem } from '@/components/ui/Accordion';

interface FAQItem {
  _key: string;
  question: string;
  answer: string;
}

interface FAQProps {
  heading?: string;
  questions?: FAQItem[];
}

export function FAQ({ heading, questions = [] }: FAQProps) {
  return (
    <section className="w-full px-[var(--spacing-20)] py-[var(--spacing-60)]">
      <div className="mx-auto max-w-[800px]">
        {heading && (
          <h2 className="mb-[var(--spacing-32)] text-center font-[var(--font-display)] text-[var(--text-h4)] leading-[var(--leading-h4)] text-[var(--color-foreground-base)]">
            {heading}
          </h2>
        )}

        <Accordion>
          {questions.map((item) => (
            <AccordionItem key={item._key} title={item.question}>
              {item.answer}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
