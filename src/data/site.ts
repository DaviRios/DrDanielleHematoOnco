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
  isMock: z.boolean().default(false),
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
 * Telefones, e-mail e endereços foram deixados sem dados reais intencionalmente.
 * Os feedbacks abaixo são mocks identificados visualmente e devem ser substituídos
 * por relatos reais e autorizados antes da publicação definitiva.
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
  feedbacks: [
    {
      id: 'feedback-demo-1',
      quote: 'A consulta nos ajudou a organizar as informações e entender quais perguntas levar para cada etapa.',
      author: 'Tutora de Luna',
      context: 'Acompanhamento oncológico',
      isMock: true,
    },
    {
      id: 'feedback-demo-2',
      quote:
        'Fomos recebidos com escuta e explicações claras, o que trouxe mais tranquilidade para decidir os próximos passos.',
      author: 'Família do Bento',
      context: 'Consulta de oncologia',
      isMock: true,
    },
    {
      id: 'feedback-demo-3',
      quote:
        'Ter os exames analisados em conjunto fez toda a diferença para compreendermos o quadro com mais segurança.',
      author: 'Tutor de Thor',
      context: 'Avaliação hematológica',
      isMock: true,
    },
    {
      id: 'feedback-demo-4',
      quote:
        'As orientações foram apresentadas com cuidado, respeitando o tempo da nossa família e as necessidades da paciente.',
      author: 'Família da Mel',
      context: 'Acompanhamento veterinário',
      isMock: true,
    },
    {
      id: 'feedback-demo-5',
      quote: 'Saímos da consulta entendendo melhor o histórico, as possibilidades de investigação e como nos preparar.',
      author: 'Tutora de Nina',
      context: 'Primeira avaliação',
      isMock: true,
    },
    {
      id: 'feedback-demo-6',
      quote: 'A comunicação com a equipe que já acompanhava nosso animal tornou todo o processo mais coordenado.',
      author: 'Família do Chico',
      context: 'Cuidado integrado',
      isMock: true,
    },
  ],
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
