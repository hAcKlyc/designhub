export interface ReferenceDesign {
  id: string;
  name: string;
  description: string;
  demoUrl: string;
  accentColor: string;
  bgColor: string;
  textColor: string;
  fontPreview: string;
}

export const REFERENCE_DESIGNS: ReferenceDesign[] = [
  {
    id: 'vercel',
    name: 'Vercel',
    description: 'Developer platform. Shadow-as-border, Geist font, radical monochrome.',
    demoUrl: '/reference/vercel.html',
    accentColor: '#171717',
    bgColor: '#ffffff',
    textColor: '#171717',
    fontPreview: 'Inter',
  },
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Financial infrastructure. Purple brand, weight-300 luxury, blue-tinted shadows.',
    demoUrl: '/reference/stripe.html',
    accentColor: '#533afd',
    bgColor: '#ffffff',
    textColor: '#061b31',
    fontPreview: 'Inter',
  },
  {
    id: 'linear',
    name: 'Linear',
    description: 'Issue tracker. Dark-native, indigo accent, luminance-based hierarchy.',
    demoUrl: '/reference/linear.app.html',
    accentColor: '#5e6ad2',
    bgColor: '#08090a',
    textColor: '#f7f8f8',
    fontPreview: 'Inter',
  },
  {
    id: 'notion',
    name: 'Notion',
    description: 'Connected workspace. Warm parchment, whisper borders, hand-drawn warmth.',
    demoUrl: '/reference/notion.html',
    accentColor: '#0075de',
    bgColor: '#ffffff',
    textColor: '#1a1a1a',
    fontPreview: 'Inter',
  },
  {
    id: 'spotify',
    name: 'Spotify',
    description: 'Music streaming. Dark immersion, green accent, pill geometry, bold uppercase.',
    demoUrl: '/reference/spotify.html',
    accentColor: '#1ed760',
    bgColor: '#121212',
    textColor: '#ffffff',
    fontPreview: 'Inter',
  },
  {
    id: 'apple',
    name: 'Apple',
    description: 'Consumer tech. Binary black/white, single blue accent, glass navigation.',
    demoUrl: '/reference/apple.html',
    accentColor: '#0071e3',
    bgColor: '#ffffff',
    textColor: '#1d1d1f',
    fontPreview: 'Inter',
  },
  {
    id: 'figma',
    name: 'Figma',
    description: 'Design tool. Pure monochrome + vibrant gradients, variable weights, pill CTAs.',
    demoUrl: '/reference/figma.html',
    accentColor: '#000000',
    bgColor: '#ffffff',
    textColor: '#000000',
    fontPreview: 'Inter',
  },
  {
    id: 'claude',
    name: 'Claude',
    description: 'AI assistant. Warm parchment, serif headings, terracotta accent, literary warmth.',
    demoUrl: '/reference/claude.html',
    accentColor: '#c96442',
    bgColor: '#f5f4ed',
    textColor: '#1a1410',
    fontPreview: 'Lora',
  },
  {
    id: 'spacex',
    name: 'SpaceX',
    description: 'Aerospace. Void black, uppercase everything, spectral white, zero chrome.',
    demoUrl: '/reference/spacex.html',
    accentColor: '#ffffff',
    bgColor: '#000000',
    textColor: '#f0f0fa',
    fontPreview: 'Inter',
  },
];
