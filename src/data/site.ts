import { z } from 'zod';

const blankOrUrl = z.union([z.literal(''), z.url()]);
const editableText = z.string().trim().default('');

export const locationSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  address: editableText,
  schedule: editableText,
  details: editableText,
  mapUrl: blankOrUrl.default(''),
});

export const feedbackSchema = z.object({
  id: z.string().min(1),
  quote: z.string().min(12),
  author: z.string().min(1),
  context: editableText,
});

export const galleryItemSchema = z.object({
  id: z.string().min(1),
  src: editableText,
  alt: z.string().min(1),
  caption: editableText,
  shape: z.enum(['portrait', 'landscape', 'square']).default('square'),
});

export const siteConfigSchema = z.object({
  brand: z.object({
    name: z.string().min(1),
    specialty: z.string().min(1),
  }),
  contact: z.object({
    phone: editableText,
    whatsapp: editableText,
    email: z.union([z.literal(''), z.email()]).default(''),
    instagram: editableText,
  }),
  locations: z.array(locationSchema),
  feedbacks: z.array(feedbackSchema),
  gallery: z.array(galleryItemSchema),
});

export type SiteConfig = z.infer<typeof siteConfigSchema>;
export type Feedback = z.infer<typeof feedbackSchema>;

/**
 * Conteúdo editável do site.
 * Telefones, e-mail, endereços e depoimentos foram deixados sem dados reais
 * intencionalmente. Preencha este objeto quando as informações estiverem prontas.
 */
export const siteConfig: SiteConfig = siteConfigSchema.parse({
  brand: {
    name: 'Danielle Godoy',
    specialty: 'Oncologia e Hematologia Veterinária',
  },
  contact: {
    phone: '',
    whatsapp: '',
    email: '',
    instagram: '',
  },
  locations: [],
  feedbacks: [],
  gallery: [
    { id: 'foto-1', src: '', alt: 'Espaço reservado para uma foto de atendimento', caption: '', shape: 'portrait' },
    { id: 'foto-2', src: '', alt: 'Espaço reservado para uma foto da profissional', caption: '', shape: 'landscape' },
    { id: 'foto-3', src: '', alt: 'Espaço reservado para uma foto do ambiente', caption: '', shape: 'square' },
    {
      id: 'foto-4',
      src: '',
      alt: 'Espaço reservado para uma foto de cuidado veterinário',
      caption: '',
      shape: 'landscape',
    },
    {
      id: 'foto-5',
      src: '',
      alt: 'Espaço reservado para uma foto de paciente veterinário',
      caption: '',
      shape: 'portrait',
    },
    { id: 'foto-6', src: '', alt: 'Espaço reservado para uma foto institucional', caption: '', shape: 'square' },
  ],
});
