import { describe, expect, it } from 'vitest';
import { siteConfig, siteConfigSchema } from '../src/data/site';

describe('siteConfig', () => {
  it('mantém os números de contato em branco até o preenchimento oficial', () => {
    expect(siteConfig.contact.phone).toBe('');
    expect(siteConfig.contact.whatsapp).toBe('');
  });

  it('é validado pelo schema do Zod', () => {
    expect(siteConfigSchema.safeParse(siteConfig).success).toBe(true);
  });

  it('não publica feedbacks fictícios', () => {
    expect(siteConfig.feedbacks).toHaveLength(0);
  });
});
