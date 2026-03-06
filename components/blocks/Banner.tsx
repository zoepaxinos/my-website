'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { urlFor } from '@/sanity/lib/image';

interface BannerProps {
  image: {
    asset: {
      _ref: string;
    };
    hotspot?: {
      x: number;
      y: number;
    };
  };
  hoverImage?: {
    asset: {
      _ref: string;
    };
    hotspot?: {
      x: number;
      y: number;
    };
  };
  headline: string;
  subheadline?: string;
  cta?: {
    label: string;
    href: string;
  };
}

export function Banner({
  image,
  hoverImage,
  headline,
  subheadline,
  cta,
}: BannerProps) {
  const [isHovered, setIsHovered] = useState(false);

  const imageUrl = urlFor(image).width(1920).height(600).fit('crop').url();

  const hoverImageUrl = hoverImage
    ? urlFor(hoverImage).width(1920).height(600).fit('crop').url()
    : null;

  const showHoverState = isHovered && hoverImageUrl;

  return (
    <section
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-[400px] w-full md:h-[500px] lg:h-[600px]">
        {/* Main Image */}
        <Image
          src={imageUrl}
          alt={headline}
          fill
          className={`object-cover transition-opacity duration-500 ${
            showHoverState ? 'opacity-0' : 'opacity-100'
          }`}
          style={{
            objectPosition: image.hotspot
              ? `${image.hotspot.x * 100}% ${image.hotspot.y * 100}%`
              : 'center',
          }}
          priority
        />

        {/* Hover Image */}
        {hoverImageUrl && (
          <Image
            src={hoverImageUrl}
            alt={headline}
            fill
            className={`object-cover transition-opacity duration-500 ${
              showHoverState ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              objectPosition: hoverImage?.hotspot
                ? `${hoverImage.hotspot.x * 100}% ${hoverImage.hotspot.y * 100}%`
                : 'center',
            }}
          />
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-end px-[var(--spacing-20)] pb-[var(--spacing-60)]">
          <div className="max-w-[800px] text-center">
            <h2 className="font-[var(--font-display)] text-[var(--text-h3)] leading-[var(--leading-h3)] text-white md:text-[var(--text-h2)] md:leading-[var(--leading-h2)]">
              {headline}
            </h2>

            {subheadline && (
              <p className="mx-auto mt-[var(--spacing-16)] max-w-[600px] text-[var(--text-body-1)] leading-[var(--leading-l)] text-white/90">
                {subheadline}
              </p>
            )}

            {cta && cta.label && cta.href && (
              <div className="mt-[var(--spacing-24)]">
                <Button variant="white" size="l" href={cta.href}>
                  {cta.label}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
