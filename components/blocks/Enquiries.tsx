'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

interface EnquiriesProps {
  headline?: string;
  subheadline?: string;
  email?: string;
  showForm?: boolean;
}

export function Enquiries({
  headline,
  subheadline,
  email,
  showForm = true,
}: EnquiriesProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Form submitted:', formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="w-full px-[var(--spacing-20)] py-[var(--spacing-60)]">
      <div className="mx-auto max-w-[600px] text-center">
        {headline && (
          <h2 className="font-[var(--font-display)] text-[var(--text-h3)] leading-[var(--leading-h3)] text-[var(--color-foreground-base)]">
            {headline}
          </h2>
        )}

        {subheadline && (
          <p className="mx-auto mt-[var(--spacing-16)] max-w-[500px] text-[var(--text-body-1)] leading-[var(--leading-l)] text-[var(--color-foreground-subtle)]">
            {subheadline}
          </p>
        )}

        {showForm ? (
          <form
            onSubmit={handleSubmit}
            className="mt-[var(--spacing-32)] space-y-[var(--spacing-16)]"
          >
            <div>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-[var(--radius-8)] border border-[var(--color-border-base)] bg-[var(--color-background-base)] px-[var(--spacing-16)] py-[var(--spacing-12)] text-[var(--text-body-1)] text-[var(--color-foreground-base)] placeholder:text-[var(--color-foreground-subtle)] focus:border-[var(--color-foreground-base)] focus:outline-none"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-[var(--radius-8)] border border-[var(--color-border-base)] bg-[var(--color-background-base)] px-[var(--spacing-16)] py-[var(--spacing-12)] text-[var(--text-body-1)] text-[var(--color-foreground-base)] placeholder:text-[var(--color-foreground-subtle)] focus:border-[var(--color-foreground-base)] focus:outline-none"
              />
            </div>
            <div>
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full resize-none rounded-[var(--radius-8)] border border-[var(--color-border-base)] bg-[var(--color-background-base)] px-[var(--spacing-16)] py-[var(--spacing-12)] text-[var(--text-body-1)] text-[var(--color-foreground-base)] placeholder:text-[var(--color-foreground-subtle)] focus:border-[var(--color-foreground-base)] focus:outline-none"
              />
            </div>
            <Button type="submit" variant="dark" size="l" className="w-full">
              Send Message
            </Button>
          </form>
        ) : (
          email && (
            <div className="mt-[var(--spacing-32)]">
              <Button
                variant="dark"
                size="l"
                href={`mailto:${email}`}
              >
                Email Us
              </Button>
            </div>
          )
        )}
      </div>
    </section>
  );
}
