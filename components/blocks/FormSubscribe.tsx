'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

interface FormSubscribeProps {
  headline?: string;
  placeholder?: string;
  buttonText?: string;
}

export function FormSubscribe({
  headline,
  placeholder = 'Enter your email',
  buttonText = 'Subscribe',
}: FormSubscribeProps) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Subscribe:', email);
  };

  return (
    <section className="w-full px-[var(--spacing-20)] py-[var(--spacing-60)]">
      <div className="mx-auto max-w-[600px] text-center">
        {headline && (
          <h2 className="mb-[var(--spacing-24)] font-[var(--font-display)] text-[var(--text-h3)] leading-[var(--leading-s)] text-[var(--color-foreground-base)]">
            {headline}
          </h2>
        )}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-[var(--spacing-12)] sm:flex-row sm:justify-center"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            required
            className="h-[42px] w-full rounded-[var(--radius-12)] border border-[var(--color-border-base)] bg-white px-[var(--spacing-16)] text-[var(--text-body-1)] leading-[var(--leading-m)] text-[var(--color-foreground-base)] placeholder:text-[var(--color-foreground-muted)] focus:border-[var(--color-foreground-base)] focus:outline-none focus:ring-1 focus:ring-[var(--color-foreground-base)] sm:w-[320px]"
          />
          <Button type="submit" variant="yellow" size="m">
            {buttonText}
          </Button>
        </form>
      </div>
    </section>
  );
}
