import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

interface Member {
  _key: string;
  photo: {
    asset: {
      _ref: string;
    };
  };
  name: string;
  role: string;
  bio?: string;
}

interface LeadershipProps {
  headline?: string;
  members?: Member[];
}

export function Leadership({ headline, members = [] }: LeadershipProps) {
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

        <div className="grid grid-cols-2 gap-[var(--spacing-24)] md:grid-cols-4">
          {members.map((member) => {
            const photoUrl = urlFor(member.photo)
              .width(400)
              .height(400)
              .fit('crop')
              .url();

            return (
              <div key={member._key} className="flex flex-col">
                <div className="aspect-square overflow-hidden rounded-[var(--radius-12)]">
                  <Image
                    src={photoUrl}
                    alt={member.name}
                    width={400}
                    height={400}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mt-[var(--spacing-16)] font-[var(--font-display)] text-[var(--text-h6)] leading-[var(--leading-s)] text-[var(--color-foreground-base)]">
                  {member.name}
                </h3>
                <p className="mt-[var(--spacing-4)] text-[var(--text-body-2)] leading-[var(--leading-m)] text-[var(--color-foreground-subtle)]">
                  {member.role}
                </p>
                {member.bio && (
                  <p className="mt-[var(--spacing-8)] text-[var(--text-body-2)] leading-[var(--leading-m)] text-[var(--color-foreground-muted)]">
                    {member.bio}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
