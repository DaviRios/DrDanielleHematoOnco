import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const motionFiles = [
  'src/pages/index.astro',
  'src/components/PageIntro.astro',
  'src/components/GalleryGrid.astro',
  'src/components/FeedbackSection.astro',
];

describe('Astro Animate', () => {
  it('mantém pelo menos 30 aplicações de animação no projeto', () => {
    const animationCount = motionFiles.reduce((total, file) => {
      const source = readFileSync(resolve(process.cwd(), file), 'utf8');
      const matches = source.match(/<(?:FadeInText|ScaleIn|HighlightText|InfiniteMarquee)\b/g);

      return total + (matches?.length ?? 0);
    }, 0);

    expect(animationCount).toBeGreaterThanOrEqual(30);
  });
});
