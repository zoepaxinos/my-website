interface Topic {
  _key: string;
  title: string;
  description?: string;
  url?: string;
}

interface HelpTopicsProps {
  headline?: string;
  topics?: Topic[];
}

export function HelpTopics({ headline, topics = [] }: HelpTopicsProps) {
  return (
    <section className="w-full px-[var(--spacing-20)] py-[var(--spacing-60)]">
      <div className="mx-auto max-w-[1440px]">
        {headline && (
          <div className="mb-[var(--spacing-40)] text-center">
            <h2 className="font-[var(--font-display)] text-[var(--text-h4)] leading-[var(--leading-h4)] text-[var(--color-foreground-base)]">
              {headline}
            </h2>
          </div>
        )}

        <div className="grid grid-cols-1 gap-[var(--spacing-24)] md:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => {
            const cardContent = (
              <div className="flex h-full flex-col rounded-[var(--radius-12)] border border-[var(--color-border-base)] p-[var(--spacing-24)] transition-colors hover:border-[var(--color-foreground-base)]">
                <h3 className="font-[var(--font-display)] text-[var(--text-h6)] leading-[var(--leading-s)] text-[var(--color-foreground-base)]">
                  {topic.title}
                </h3>
                {topic.description && (
                  <p className="mt-[var(--spacing-12)] text-[var(--text-body-2)] leading-[var(--leading-m)] text-[var(--color-foreground-subtle)]">
                    {topic.description}
                  </p>
                )}
              </div>
            );

            if (topic.url) {
              return (
                <a
                  key={topic._key}
                  href={topic.url}
                  className="block"
                >
                  {cardContent}
                </a>
              );
            }

            return (
              <div key={topic._key}>
                {cardContent}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
