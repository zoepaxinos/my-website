import { Button } from '@/components/ui/Button';
import Image from 'next/image';

interface TestimonialProps {
  quote: string;
  authorName: string;
  authorRole?: string;
  location?: string;
  video?: {
    thumbnail?: { asset: { url: string } };
    url?: string;
  };
}

export function Testimonial({
  quote,
  authorName,
  authorRole,
  location,
  video,
}: TestimonialProps) {
  return (
    <section className="w-full px-[var(--spacing-12)] py-[var(--spacing-60)]">
      <div className="mx-auto flex max-w-[838px] items-center justify-between gap-[var(--spacing-20)] rounded-[var(--radius-16)] bg-[var(--color-background-tertiary)] p-[var(--spacing-20)] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12),0px_0px_0px_0px_rgba(0,0,0,0.08)]">
        {/* Quote */}
        <div className="flex w-[498px] flex-col justify-between">
          <p className="font-[var(--font-sans)] text-[var(--text-l)] leading-[var(--leading-l)] text-[var(--color-foreground-base)]">
            "{quote}"
          </p>

          <div className="mt-auto pt-[var(--spacing-20)]">
            <p className="font-[var(--font-mono)] text-[12px] font-medium uppercase leading-[16px] text-[var(--color-foreground-subtle)]">
              {authorName}
            </p>
            {(authorRole || location) && (
              <p className="font-[var(--font-mono)] text-[12px] uppercase leading-[16px] text-[var(--color-foreground-subtle)]">
                {[authorRole, location].filter(Boolean).join(', ')}
              </p>
            )}
          </div>
        </div>

        {/* Video thumbnail */}
        {video?.thumbnail && (
          <div className="relative h-[240px] w-[240px] overflow-hidden rounded-[var(--radius-8)]">
            <Image
              src={video.thumbnail.asset.url}
              alt={`${authorName} testimonial`}
              fill
              className="object-cover"
            />
            {video.url && (
              <div className="absolute bottom-[10px] left-[10px]">
                <Button variant="white-blur" size="xs" href={video.url}>
                  Watch now
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
