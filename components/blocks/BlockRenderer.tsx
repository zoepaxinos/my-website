import { CTA } from './CTA';
import { Testimonial } from './Testimonial';
// Import more blocks as they're created

interface Block {
  _type: string;
  _key: string;
  [key: string]: unknown;
}

interface BlockRendererProps {
  blocks: Block[];
}

const blockComponents: Record<string, React.ComponentType<any>> = {
  cta: CTA,
  testimonial: Testimonial,
  // Add more blocks as they're created
};

export function BlockRenderer({ blocks }: BlockRendererProps) {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  return (
    <>
      {blocks.map((block) => {
        const Component = blockComponents[block._type];

        if (!Component) {
          console.warn(`Unknown block type: ${block._type}`);
          return null;
        }

        return <Component key={block._key} {...block} />;
      })}
    </>
  );
}
