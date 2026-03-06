import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

interface ImageBlockProps {
  image: {
    asset: {
      _ref: string;
    };
    hotspot?: {
      x: number;
      y: number;
    };
  };
  alt: string;
  size?: 'small' | 'medium' | 'large';
}

const sizeConfig = {
  small: {
    maxWidth: '480px',
    width: 480,
    height: 320,
  },
  medium: {
    maxWidth: '768px',
    width: 768,
    height: 512,
  },
  large: {
    maxWidth: '1200px',
    width: 1200,
    height: 800,
  },
};

export function ImageBlock({ image, alt, size = 'medium' }: ImageBlockProps) {
  const config = sizeConfig[size];

  const imageUrl = urlFor(image)
    .width(config.width)
    .height(config.height)
    .fit('crop')
    .url();

  return (
    <section className="w-full px-[var(--spacing-20)] py-[var(--spacing-40)]">
      <div className="mx-auto" style={{ maxWidth: config.maxWidth }}>
        <div className="relative overflow-hidden rounded-[var(--radius-12)]">
          <Image
            src={imageUrl}
            alt={alt}
            width={config.width}
            height={config.height}
            className="h-auto w-full object-cover"
            style={{
              objectPosition: image.hotspot
                ? `${image.hotspot.x * 100}% ${image.hotspot.y * 100}%`
                : 'center',
            }}
          />
        </div>
      </div>
    </section>
  );
}
