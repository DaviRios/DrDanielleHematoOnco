# Danielle Godoy — site institucional

Site institucional estático para **Danielle Godoy — Oncologia e Hematologia Veterinária**, criado com Astro, React, Tailwind CSS, TypeScript e Zod.

## Estrutura

- `/` — página inicial
- `/locais` — locais de atendimento
- `/contato` — canais de contato
- `/informacoes` — orientações para tutores
- `/feedbacks` — feedbacks autorizados
- `/imagens` — galeria institucional

O conteúdo é gerado estaticamente pelo Astro (`output: "static"`). O React é usado somente no componente interativo de feedbacks, mantendo o JavaScript enviado ao navegador pequeno.

## Onde preencher conteúdo

Todos os dados que ainda dependem de confirmação estão centralizados em:

`src/data/site.ts`

Nesse arquivo é possível preencher:

- telefone;
- WhatsApp;
- e-mail;
- Instagram;
- locais, endereços, horários e links de mapa;
- feedbacks autorizados;
- caminhos e legendas das imagens.

Os números de telefone e WhatsApp permanecem vazios conforme solicitado. O Zod valida a estrutura desses dados durante a geração do site.

Para adicionar fotos, salve os arquivos em `public/images/` e informe no campo `src` um caminho como `/images/nome-da-foto.webp`.

## Comandos para a revisão

Os comandos abaixo ficaram preparados, mas não foram executados durante a primeira etapa de codificação:

```bash
pnpm install
pnpm dev
pnpm test
pnpm lint
pnpm check
pnpm build
```

O `pnpm-lock.yaml` deve ser versionado para garantir instalações reproduzíveis no desenvolvimento e no CI.

## CI/CD e Vercel

O workflow `.github/workflows/ci-cd.yml` executa testes e build em pull requests e pushes. Em um push na branch `main`, o job de deploy publica o artefato na Vercel depois que as validações passam.

Configure estes secrets no GitHub:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

Também é possível conectar o repositório diretamente à Vercel; o arquivo `vercel.json` já informa o framework, comando de build e diretório `dist`.

## Observações editoriais

- Não há números de contato, endereços, fotos reais ou feedbacks fictícios.
- O conteúdo do site é informativo e não substitui avaliação veterinária.
- Fotos de pacientes e feedbacks devem ser publicados somente com autorização.
