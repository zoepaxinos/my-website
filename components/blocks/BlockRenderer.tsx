import { CTA } from './CTA';
import { Testimonial } from './Testimonial';

// Tier 1: Simple Static
import { ImageBlock } from './ImageBlock';
import { Stats } from './Stats';
import { TrustBadges } from './TrustBadges';
import { Banner } from './Banner';
import { FAQ } from './FAQ';
import { Pricing } from './Pricing';

// Tier 2: Card-based Layouts
import { FeatureGrid } from './FeatureGrid';
import { BentoCards } from './BentoCards';
import { Partners } from './Partners';
import { Leadership } from './Leadership';

// Tier 3: Content Blocks
import { CTABanner } from './CTABanner';
import { SocialProof } from './SocialProof';
import { Enquiries } from './Enquiries';
import { HelpTopics } from './HelpTopics';

// Tier 4: Interactive/Complex
import { MediaCarousel } from './MediaCarousel';
import { CardsCarousel } from './CardsCarousel';
import { NewsCarousel } from './NewsCarousel';
import { GridLearnPosts } from './GridLearnPosts';
import { MadeWithPrograma } from './MadeWithPrograma';
import { FormSubscribe } from './FormSubscribe';

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
  // Tier 1
  imageBlock: ImageBlock,
  stats: Stats,
  trustBadges: TrustBadges,
  banner: Banner,
  faq: FAQ,
  pricing: Pricing,
  // Tier 2
  featureGrid: FeatureGrid,
  bentoCards: BentoCards,
  partners: Partners,
  leadership: Leadership,
  // Tier 3
  ctaBanner: CTABanner,
  socialProof: SocialProof,
  enquiries: Enquiries,
  helpTopics: HelpTopics,
  // Tier 4
  mediaCarousel: MediaCarousel,
  cardsCarousel: CardsCarousel,
  newsCarousel: NewsCarousel,
  gridLearnPosts: GridLearnPosts,
  madeWithPrograma: MadeWithPrograma,
  formSubscribe: FormSubscribe,
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
