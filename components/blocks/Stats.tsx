interface StatItem {
  _key: string;
  value: string;
  label: string;
}

interface StatsProps {
  showDescription?: boolean;
  title?: string;
  description?: string;
  stats?: StatItem[];
}

export function Stats({
  showDescription = true,
  title,
  description,
  stats = [],
}: StatsProps) {
  return (
    <section className="w-full px-[var(--spacing-20)] py-[var(--spacing-60)]">
      <div className="mx-auto max-w-[1440px]">
        {showDescription && (title || description) && (
          <div className="mb-[var(--spacing-40)] text-center">
            {title && (
              <h2 className="font-[var(--font-display)] text-[var(--text-h4)] leading-[var(--leading-h4)] text-[var(--color-foreground-base)]">
                {title}
              </h2>
            )}
            {description && (
              <p className="mx-auto mt-[var(--spacing-12)] max-w-[600px] text-[var(--text-body-1)] leading-[var(--leading-l)] text-[var(--color-foreground-subtle)]">
                {description}
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 gap-[var(--spacing-16)] md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat._key}
              className="flex flex-col items-center rounded-[var(--radius-12)] bg-[var(--color-background-secondary)] p-[var(--spacing-24)] text-center"
            >
              <span className="font-[var(--font-display)] text-[var(--text-h2)] leading-[var(--leading-h2)] text-[var(--color-foreground-base)]">
                {stat.value}
              </span>
              <span className="mt-[var(--spacing-8)] text-[var(--text-body-2)] leading-[var(--leading-m)] text-[var(--color-foreground-subtle)]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
