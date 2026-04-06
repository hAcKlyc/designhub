import type { DesignParams, DesignStyle } from '../types';
import { generatePalette } from './color';
import { getFontPair } from '../data/fonts';

export function generateDesignMd(style: DesignStyle, params: DesignParams): string {
  const palette = generatePalette(params.primaryHue, params.accentHue, params.saturation, params.mode === 'dark');
  const paletteLight = generatePalette(params.primaryHue, params.accentHue, params.saturation, false);
  const paletteDark = generatePalette(params.primaryHue, params.accentHue, params.saturation, true);
  const fontPair = getFontPair(params.fontPair);
  const isDark = params.mode === 'dark';

  const radius = params.borderRadius;
  const ratio = params.typeScaleRatio;
  const baseSize = 16;
  const scale = (n: number) => Math.round(baseSize * Math.pow(ratio, n) * 100) / 100;

  const spacingBase = params.spacingDensity === 'compact' ? 4 : 8;
  const sectionSpacing = params.spacingDensity === 'compact' ? 24 : params.spacingDensity === 'spacious' ? 64 : 40;

  return `# Design System: ${style.name}

## 1. Visual Theme & Atmosphere

${style.philosophy}

**Key Characteristics:**
${style.meta.keyCharacteristics.map(c => `- ${c}`).join('\n')}

## 2. Color Palette & Roles

### Primary
- **Primary Background** (\`${palette.primary[1]}\`): Lightest tint, used for subtle primary-colored surfaces and backgrounds.
- **Primary Hover** (\`${palette.primary[4]}\`): Component hover states with primary tinting.
- **Primary Border** (\`${palette.primary[6]}\`): Borders on primary-tinted components.
- **Primary Solid** (\`${palette.primary[8]}\`): Main brand color — CTA buttons, links, active indicators.
- **Primary Solid Hover** (\`${palette.primary[9]}\`): Hover state for primary solid elements.
- **Primary Text** (\`${palette.primary[11]}\`): Primary-colored text for links and emphasis.
- **Primary High Contrast** (\`${palette.primary[12]}\`): Highest contrast primary for critical labels.

### Neutral
- **Background** (\`${palette.neutral[1]}\`): Page background. The canvas color.
- **Surface Elevated** (\`${palette.neutral[2]}\`): Cards, panels, elevated surfaces.
- **Surface Inset** (\`${palette.neutral[3]}\`): Recessed areas, input backgrounds.
- **Border Subtle** (\`${palette.neutral[4]}\`): Subtlest borders and dividers.
- **Border Default** (\`${palette.neutral[6]}\`): Standard borders for cards, inputs, dividers.
- **Border Strong** (\`${palette.neutral[7]}\`): Emphasized borders, active states.
- **Text Muted** (\`${palette.neutral[9]}\`): Placeholder text, disabled content, timestamps.
- **Text Secondary** (\`${palette.neutral[11]}\`): Body text, descriptions, secondary content.
- **Text Primary** (\`${palette.neutral[12]}\`): Headings, labels, primary text. Maximum contrast.

### Accent
- **Accent Background** (\`${palette.accent[1]}\`): Subtle accent-colored surfaces.
- **Accent Solid** (\`${palette.accent[8]}\`): Secondary action buttons, highlights, accent indicators.
- **Accent Text** (\`${palette.accent[11]}\`): Accent-colored text for secondary emphasis.

### Semantic
- **Success** (\`${palette.success}\`): Positive states, confirmations, active/online indicators.
- **Warning** (\`${palette.warning}\`): Caution states, pending actions, attention needed.
- **Error** (\`${palette.error}\`): Error states, destructive actions, critical alerts.
- **Info** (\`${palette.info}\`): Informational states, help text, neutral alerts.

## 3. Typography Rules

### Font Family
- **Heading**: ${fontPair.heading}
- **Body**: ${fontPair.body}
- **Monospace**: ${fontPair.mono}

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Hero | Heading | ${scale(6)}px (${(scale(6) / 16).toFixed(2)}rem) | 700 | ${params.headingLetterSpacing < 0 ? '1.05' : '1.15'} | ${params.headingLetterSpacing}em | Maximum impact display |
| Display | Heading | ${scale(5)}px (${(scale(5) / 16).toFixed(2)}rem) | 600 | 1.10 | ${params.headingLetterSpacing}em | Section headlines |
| H1 | Heading | ${scale(4)}px (${(scale(4) / 16).toFixed(2)}rem) | 600 | 1.15 | ${(params.headingLetterSpacing * 0.8).toFixed(3)}em | Major section titles |
| H2 | Heading | ${scale(3)}px (${(scale(3) / 16).toFixed(2)}rem) | 600 | 1.20 | ${(params.headingLetterSpacing * 0.6).toFixed(3)}em | Sub-section headings |
| H3 | Heading | ${scale(2)}px (${(scale(2) / 16).toFixed(2)}rem) | 600 | 1.25 | ${(params.headingLetterSpacing * 0.4).toFixed(3)}em | Card headings, feature titles |
| Body Large | Body | ${scale(1)}px (${(scale(1) / 16).toFixed(2)}rem) | 400 | 1.60 | normal | Introduction text, descriptions |
| Body | Body | ${baseSize}px (1.00rem) | 400 | 1.60 | normal | Standard reading text |
| Body Small | Body | ${scale(-1)}px (${(scale(-1) / 16).toFixed(2)}rem) | 400 | 1.50 | normal | Secondary content, captions |
| Caption | Body | ${scale(-2)}px (${(scale(-2) / 16).toFixed(2)}rem) | 500 | 1.40 | normal | Metadata, timestamps, labels |
| Mono | Mono | ${scale(-1)}px (${(scale(-1) / 16).toFixed(2)}rem) | 400 | 1.50 | normal | Code, technical labels |

### Principles
- Type scale uses a ${ratio.toFixed(3)} ratio (${getRatioName(ratio)}) — ${ratio < 1.2 ? 'tight hierarchy for dense UIs' : ratio > 1.4 ? 'dramatic hierarchy for marketing/editorial' : 'balanced hierarchy for product interfaces'}.
- Heading letter-spacing: ${params.headingLetterSpacing}em — ${params.headingLetterSpacing < 0 ? 'compressed, creating density and urgency' : params.headingLetterSpacing > 0.05 ? 'tracked for luxury and elegance' : 'neutral, clean tracking'}.
- Font weight progression: 400 (reading) → 500 (UI/labels) → 600 (headings) → 700 (hero only). Avoid using bold (700+) below display sizes.

## 4. Component Stylings

### Buttons

**Primary**
- Background: \`${palette.primary[8]}\`
- Text: ${isDark ? `\`${palette.neutral[1]}\`` : '`#ffffff`'}
- Padding: 10px 24px
- Radius: ${radius}px
- Hover: \`${palette.primary[9]}\`
- Use: Main CTA, primary actions

**Secondary**
- Background: \`${palette.neutral[2]}\`
- Text: \`${palette.neutral[11]}\`
- Border: 1px solid \`${palette.neutral[6]}\`
- Padding: 10px 24px
- Radius: ${radius}px
- Hover: \`${palette.neutral[3]}\` background
- Use: Secondary actions, cancel

**Ghost**
- Background: transparent
- Text: \`${palette.neutral[9]}\`
- Padding: 8px 16px
- Radius: ${radius}px
- Hover: \`${palette.neutral[3]}\` background
- Use: Tertiary actions, navigation

**Danger**
- Background: \`${palette.error}\`
- Text: \`#ffffff\`
- Padding: 10px 24px
- Radius: ${radius}px
- Use: Destructive actions

### Cards
- Background: \`${palette.neutral[2]}\`
- Border: 1px solid \`${palette.neutral[4]}\`
- Radius: ${Math.min(radius * 1.5, 24)}px
- Shadow: ${params.depthStyle === 'flat' ? 'none' : `0 2px 8px rgba(0,0,0,${isDark ? '0.3' : '0.08'})`}
- Padding: ${params.spacingDensity === 'compact' ? '12px' : params.spacingDensity === 'spacious' ? '24px' : '16px'}
- Hover: ${params.depthStyle !== 'flat' ? `shadow increases to 0 4px 16px rgba(0,0,0,${isDark ? '0.4' : '0.12'})` : 'border color intensifies'}

### Inputs
- Background: ${isDark ? `\`${palette.neutral[1]}\`` : 'transparent'}
- Border: 1px solid \`${palette.neutral[6]}\`
- Radius: ${radius}px
- Padding: 10px 14px
- Focus: border-color changes to \`${palette.primary[8]}\`
- Placeholder: \`${palette.neutral[9]}\`

## 5. Layout Principles & Spacing

### Spacing Scale
Base unit: ${spacingBase}px

| Token | Value | Use |
|-------|-------|-----|
| space-1 | ${spacingBase}px | Micro gaps, icon padding |
| space-2 | ${spacingBase * 2}px | Inline element gaps |
| space-3 | ${spacingBase * 3}px | Component internal padding |
| space-4 | ${params.spacingDensity === 'compact' ? 8 : 16}px | Standard component padding |
| space-8 | ${Math.round(sectionSpacing * 0.6)}px | Between related sections |
| space-12 | ${sectionSpacing}px | Major section spacing |
| space-16 | ${Math.round(sectionSpacing * 1.5)}px | Page-level spacing |

### Border Radius Scale
| Token | Value | Use |
|-------|-------|-----|
| radius-sm | ${Math.max(radius * 0.4, 2)}px | Small elements, badges, code |
| radius-md | ${radius}px | Buttons, inputs, standard components |
| radius-lg | ${Math.min(radius * 1.5, 24)}px | Cards, panels, dialogs |
| radius-xl | ${Math.min(radius * 2, 32)}px | Large containers, hero sections |
| radius-full | 9999px | Pills, avatars, circular elements |

### Grid
- Max content width: 1120px
- Column count: 12
- Gutter: ${params.spacingDensity === 'compact' ? '12px' : params.spacingDensity === 'spacious' ? '24px' : '16px'}

## 6. Depth & Elevation

| Level | Shadow | Use |
|-------|--------|-----|
${params.depthStyle === 'flat' ? `| All | none | Flat design — no shadows |` : `| XS | 0 1px 2px rgba(0,0,0,${isDark ? '0.2' : '0.05'}) | Subtle lift for small elements |
| SM | 0 2px 8px rgba(0,0,0,${isDark ? '0.3' : '0.08'}) | Standard cards, dropdowns |
| MD | 0 8px 24px rgba(0,0,0,${isDark ? '0.4' : '0.12'}) | Modals, popovers, focused panels |
| LG | 0 16px 48px rgba(0,0,0,${isDark ? '0.5' : '0.2'}) | Full-screen overlays, hero cards |`}

${params.depthStyle === 'glass' ? `### Glass Treatment
- Background: ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.6)'}
- Border: 1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.3)'}
- Backdrop filter: blur(12px)
- Use for floating panels, navigation bars, and overlays.` : ''}

## 7. Do's and Don'ts

### Do
${style.meta.doList.map(d => `- ${d}`).join('\n')}

### Don't
${style.meta.dontList.map(d => `- ${d}`).join('\n')}

## 8. Responsive Behavior

### Breakpoints
| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile | <640px | Single column, reduced spacing, stacked layout |
| Tablet | 640–1024px | 2-column grids, medium spacing |
| Desktop | 1024–1280px | Full layout, standard spacing |
| Wide | >1280px | Centered with generous margins |

### Collapsing Strategy
- Hero: display text scales down proportionally (use clamp() for fluid sizing)
- Feature cards: 3-col → 2-col → 1-col stacked
- Navigation: horizontal → hamburger menu at mobile
- Section spacing: ${sectionSpacing}px → ${Math.round(sectionSpacing * 0.6)}px on mobile
- Side panels: collapse to bottom sheet or full-screen overlay

## 9. Agent Prompt Guide

### Quick Color Reference
- Page background: \`${palette.neutral[1]}\`
- Card/surface: \`${palette.neutral[2]}\`
- Primary text: \`${palette.neutral[12]}\`
- Secondary text: \`${palette.neutral[11]}\`
- Muted text: \`${palette.neutral[9]}\`
- Border: \`${palette.neutral[6]}\`
- Primary/CTA: \`${palette.primary[8]}\`
- Accent: \`${palette.accent[8]}\`

### Example Component Prompts
- "Create a hero section with ${isDark ? 'dark' : 'light'} background (\`${palette.neutral[1]}\`). Headline at ${scale(6)}px ${fontPair.heading.split(',')[0].replace(/'/g, '')} weight 700, letter-spacing ${params.headingLetterSpacing}em, color \`${palette.neutral[12]}\`. Subtitle at ${scale(1)}px weight 400, color \`${palette.neutral[11]}\`. Primary CTA button (\`${palette.primary[8]}\` bg, ${isDark ? palette.neutral[1] : '#fff'} text, ${radius}px radius) and secondary button (transparent bg, \`${palette.neutral[6]}\` border)."
- "Design a card: \`${palette.neutral[2]}\` background, 1px \`${palette.neutral[4]}\` border, ${Math.min(radius * 1.5, 24)}px radius. Title at ${scale(2)}px weight 600, \`${palette.neutral[12]}\` color. Body at ${baseSize}px weight 400, \`${palette.neutral[9]}\` color. ${params.depthStyle === 'flat' ? 'No shadow.' : `Shadow: 0 2px 8px rgba(0,0,0,${isDark ? '0.3' : '0.08'}).`}"
- "Build a form with inputs: ${isDark ? palette.neutral[1] : 'transparent'} background, 1px \`${palette.neutral[6]}\` border, ${radius}px radius, 10px 14px padding. Label at ${scale(-1)}px weight 500, \`${palette.neutral[11]}\` color. Submit button: full-width, \`${palette.primary[8]}\` background."

### CSS Variables — Light Mode
\`\`\`css
:root {
  /* Colors — Light */
  --bg: ${paletteLight.neutral[1]};
  --bg-elevated: ${paletteLight.neutral[2]};
  --bg-inset: ${paletteLight.neutral[3]};
  --text: ${paletteLight.neutral[12]};
  --text-secondary: ${paletteLight.neutral[11]};
  --text-muted: ${paletteLight.neutral[9]};
  --border: ${paletteLight.neutral[6]};
  --primary: ${paletteLight.primary[8]};
  --primary-hover: ${paletteLight.primary[9]};
  --primary-text: #ffffff;
  --accent: ${paletteLight.accent[8]};

  /* Typography */
  --font-heading: ${fontPair.heading};
  --font-body: ${fontPair.body};
  --font-mono: ${fontPair.mono};

  /* Spacing */
  --space-base: ${spacingBase}px;
  --space-section: ${sectionSpacing}px;

  /* Radius */
  --radius-sm: ${Math.max(radius * 0.4, 2)}px;
  --radius-md: ${radius}px;
  --radius-lg: ${Math.min(radius * 1.5, 24)}px;
  --radius-full: 9999px;
}
\`\`\`

### CSS Variables — Dark Mode
\`\`\`css
.dark, [data-theme="dark"] {
  /* Colors — Dark */
  --bg: ${paletteDark.neutral[1]};
  --bg-elevated: ${paletteDark.neutral[2]};
  --bg-inset: ${paletteDark.neutral[3]};
  --text: ${paletteDark.neutral[12]};
  --text-secondary: ${paletteDark.neutral[11]};
  --text-muted: ${paletteDark.neutral[9]};
  --border: ${paletteDark.neutral[6]};
  --primary: ${paletteDark.primary[8]};
  --primary-hover: ${paletteDark.primary[9]};
  --primary-text: ${paletteDark.neutral[1]};
  --accent: ${paletteDark.accent[8]};
}
\`\`\`
`;
}

function getRatioName(ratio: number): string {
  if (ratio <= 1.1) return 'Minor Second';
  if (ratio <= 1.15) return 'Major Second';
  if (ratio <= 1.22) return 'Minor Third';
  if (ratio <= 1.3) return 'Major Third';
  if (ratio <= 1.38) return 'Perfect Fourth';
  if (ratio <= 1.55) return 'Perfect Fifth';
  return 'Golden Ratio';
}
