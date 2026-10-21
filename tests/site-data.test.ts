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

  it('identifica todos os feedbacks demonstrativos como mocks', () => {
    expect(siteConfig.feedbacks.length).toBeGreaterThanOrEqual(6);
    expect(siteConfig.feedbacks.every((feedback) => feedback.isMock)).toBe(true);
  });
});
