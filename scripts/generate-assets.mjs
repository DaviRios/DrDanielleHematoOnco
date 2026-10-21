import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const portraitPath = path.join(projectRoot, 'src', 'assets', 'dra-danielle-godoy.png');
const brandMarkPath = path.join(projectRoot, 'public', 'brand-mark.svg');
const faviconPath = path.join(projectRoot, 'public', 'favicon.svg');
const socialDirectory = path.join(projectRoot, 'public', 'social');

await mkdir(socialDirectory, { recursive: true });

const portrait = await sharp(portraitPath)
  .resize({ width: 440, height: 630, fit: 'cover', position: 'north' })
  .toBuffer();

const brandMark = await sharp(brandMarkPath).resize({ height: 142 }).png().toBuffer();

const socialArtwork = Buffer.from(`
  <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="photoFade" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#fbfaf8" />
        <stop offset="1" stop-color="#fbfaf8" stop-opacity="0" />
      </linearGradient>
    </defs>
    <circle cx="86" cy="-38" r="188" fill="#f6e8e9" />
    <circle cx="608" cy="585" r="218" fill="none" stroke="#18344c" stroke-opacity="0.11" stroke-width="2" />
    <circle cx="672" cy="122" r="9" fill="#981f24" fill-opacity="0.18" />
    <circle cx="705" cy="155" r="5" fill="#18344c" fill-opacity="0.18" />
    <rect x="698" y="0" width="115" height="630" fill="url(#photoFade)" />
    <rect x="758" y="0" width="4" height="630" fill="#981f24" fill-opacity="0.78" />
    <text x="178" y="102" fill="#18344c" font-family="Georgia, 'Times New Roman', serif" font-size="43" font-weight="700">Danielle Godoy</text>
    <text x="180" y="139" fill="#3f5669" font-family="Arial, sans-serif" font-size="19">Oncologia e Hematologia Veterinária</text>
    <text x="76" y="248" fill="#981f24" font-family="Arial, sans-serif" font-size="17" font-weight="700" letter-spacing="2.5">MEDICINA É A ARTE DE COMPARTILHAR A VIDA</text>
    <text x="76" y="333" fill="#18344c" font-family="Georgia, 'Times New Roman', serif" font-size="54">Oncologia é a arte de</text>
    <text x="76" y="398" fill="#18344c" font-family="Georgia, 'Times New Roman', serif" font-size="54">compartilhar esperança</text>
    <line x1="76" y1="456" x2="154" y2="456" stroke="#981f24" stroke-width="3" />
    <text x="76" y="508" fill="#3f5669" font-family="Arial, sans-serif" font-size="22">Informação, acolhimento e cuidado especializado.</text>
    <rect x="0" y="616" width="1200" height="14" fill="#981f24" />
  </svg>
`);

await sharp({
  create: {
    width: 1200,
    height: 630,
    channels: 3,
    background: '#fbfaf8',
  },
})
  .composite([
    { input: portrait, left: 760, top: 0 },
    { input: socialArtwork, left: 0, top: 0 },
    { input: brandMark, left: 76, top: 49 },
  ])
  .jpeg({ quality: 88, progressive: true, chromaSubsampling: '4:4:4' })
  .toFile(path.join(socialDirectory, 'danielle-godoy-og.jpg'));

await Promise.all([
  sharp(faviconPath)
    .resize(32, 32)
    .png()
    .toFile(path.join(projectRoot, 'public', 'favicon-32x32.png')),
  sharp(faviconPath)
    .resize(180, 180)
    .png()
    .toFile(path.join(projectRoot, 'public', 'apple-touch-icon.png')),
]);
