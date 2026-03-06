'use client';

import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { Carousel } from '@/components/ui/Carousel';

interface Project {
  _key: string;
  image: {
    asset: {
      _ref: string;
    };
  };
  title: string;
  designer?: string;
}

interface MadeWithProgramaProps {
  headline?: string;
  projects?: Project[];
}

export function MadeWithPrograma({
  headline,
  projects = [],
}: MadeWithProgramaProps) {
  return (
    <section className="w-full px-[var(--spacing-20)] py-[var(--spacing-60)]">
      <div className="mx-auto max-w-[1440px]">
        {headline && (
          <div className="mb-[var(--spacing-32)]">
            <h2 className="font-[var(--font-display)] text-[var(--text-h3)] leading-[var(--leading-s)] text-[var(--color-foreground-base)]">
              {headline}
            </h2>
          </div>
        )}

        <Carousel showDots showArrows>
          {projects.map((project) => {
            const imageUrl = urlFor(project.image)
              .width(336)
              .height(252)
              .fit('crop')
              .url();

            return (
              <div
                key={project._key}
                className="w-[336px] flex-shrink-0 snap-start"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-12)] bg-[var(--color-background-muted)]">
                  <Image
                    src={imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="mt-[var(--spacing-16)]">
                  <h3 className="font-[var(--font-display)] text-[var(--text-h6)] leading-[var(--leading-s)] text-[var(--color-foreground-base)]">
                    {project.title}
                  </h3>
                  {project.designer && (
                    <p className="mt-[var(--spacing-4)] text-[var(--text-body-2)] leading-[var(--leading-m)] text-[var(--color-foreground-subtle)]">
                      {project.designer}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </Carousel>
      </div>
    </section>
  );
}
