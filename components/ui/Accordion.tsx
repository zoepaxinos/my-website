'use client';

import { useState } from 'react';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
}

export function AccordionItem({
  title,
  children,
  isOpen = false,
  onToggle,
}: AccordionItemProps) {
  return (
    <div className="border-b border-[var(--color-border-base)]">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between py-[var(--spacing-16)] text-left"
        aria-expanded={isOpen}
      >
        <span className="font-[var(--font-sans)] text-[var(--text-body-1)] font-medium leading-[var(--leading-l)] text-[var(--color-foreground-base)]">
          {title}
        </span>
        <span
          className={`ml-[var(--spacing-16)] flex h-6 w-6 flex-shrink-0 items-center justify-center transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6L8 10L12 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? 'max-h-[1000px] pb-[var(--spacing-16)]' : 'max-h-0'
        }`}
      >
        <div className="text-[var(--text-body-2)] leading-[var(--leading-m)] text-[var(--color-foreground-subtle)]">
          {children}
        </div>
      </div>
    </div>
  );
}

interface AccordionProps {
  children: React.ReactNode;
  allowMultiple?: boolean;
}

export function Accordion({ children, allowMultiple = false }: AccordionProps) {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const handleToggle = (index: number) => {
    if (allowMultiple) {
      setOpenIndexes((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index]
      );
    } else {
      setOpenIndexes((prev) =>
        prev.includes(index) ? [] : [index]
      );
    }
  };

  return (
    <div className="divide-y divide-[var(--color-border-base)] border-t border-[var(--color-border-base)]">
      {Array.isArray(children)
        ? children.map((child, index) => {
            if (!child) return null;
            return (
              <AccordionItem
                key={index}
                title={(child as React.ReactElement<AccordionItemProps>).props.title}
                isOpen={openIndexes.includes(index)}
                onToggle={() => handleToggle(index)}
              >
                {(child as React.ReactElement<AccordionItemProps>).props.children}
              </AccordionItem>
            );
          })
        : children}
    </div>
  );
}
