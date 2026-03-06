import { type SchemaTypeDefinition } from 'sanity'

// Documents
import { page } from './documents/page';

// Objects
import { seo } from './objects/seo';

// Blocks - Existing
import { cta } from './blocks/cta';
import { testimonial } from './blocks/testimonial';
import { pricing } from './blocks/pricing';
import { faq } from './blocks/faq';

// Blocks - Tier 1: Simple Static
import { imageBlock } from './blocks/image';
import { stats } from './blocks/stats';
import { trustBadges } from './blocks/trustBadges';
import { banner } from './blocks/banner';

// Blocks - Tier 2: Card-based Layouts
import { featureGrid } from './blocks/featureGrid';
import { bentoCards } from './blocks/bentoCards';
import { partners } from './blocks/partners';
import { leadership } from './blocks/leadership';

// Blocks - Tier 3: Content Blocks
import { ctaBanner } from './blocks/ctaBanner';
import { socialProof } from './blocks/socialProof';
import { enquiries } from './blocks/enquiries';
import { helpTopics } from './blocks/helpTopics';

// Blocks - Tier 4: Interactive/Complex
import { mediaCarousel } from './blocks/mediaCarousel';
import { cardsCarousel } from './blocks/cardsCarousel';
import { newsCarousel } from './blocks/newsCarousel';
import { gridLearnPosts } from './blocks/gridLearnPosts';
import { madeWithPrograma } from './blocks/madeWithPrograma';
import { formSubscribe } from './blocks/formSubscribe';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Documents
    page,
    // Objects
    seo,
    // Blocks - Existing
    cta,
    testimonial,
    pricing,
    faq,
    // Blocks - Tier 1
    imageBlock,
    stats,
    trustBadges,
    banner,
    // Blocks - Tier 2
    featureGrid,
    bentoCards,
    partners,
    leadership,
    // Blocks - Tier 3
    ctaBanner,
    socialProof,
    enquiries,
    helpTopics,
    // Blocks - Tier 4
    mediaCarousel,
    cardsCarousel,
    newsCarousel,
    gridLearnPosts,
    madeWithPrograma,
    formSubscribe,
  ],
}
