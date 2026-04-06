# Design System: DesignHub

## 1. Visual Theme & Atmosphere

DesignHub's design should feel like walking into a high-end design gallery — warm white walls, perfect lighting, and the exhibited work doing all the talking. The shell is deliberately self-effacing: warm ivory backgrounds, whisper-weight typography, and generous negative space create a canvas that elevates whatever design system is being showcased inside it.

The editorial serif (Instrument Serif) for headings is a deliberate departure from the geometric sans-serif that dominates developer tools. It signals "this is a design space, not a code editor" — intellectual without being stuffy, refined without being pretentious. The serif appears only at display sizes; everything functional remains in Inter for clarity.

The accent green (#2D6A4F) is forest, not neon — a color you'd find in a William Morris wallpaper or a premium skincare brand, not a SaaS dashboard. It appears sparingly: on CTAs, active states, and the occasional badge. Everything else is a conversation between warm whites and near-blacks, with the showcased design systems providing all the chromatic energy the page needs.

**Key Characteristics:**
- Warm ivory canvas: #FAFAF8 — not white, not gray, warm paper
- Near-black text: #1A1A1A — soft, never harsh
- Forest green accent: #2D6A4F — deep, sophisticated, used sparingly
- Instrument Serif for display headings — editorial authority
- Inter for body, UI, and functional text — clarity and neutrality
- Cards: no borders, shadow-only separation (Dribbble-style)
- Hover: cards lift with `translateY(-4px)` + shadow deepening
- Border-radius: 16px on cards, 10px on buttons, 8px on inputs
- Generous spacing: 80-120px between sections, 24-32px grid gap
- Content is the hero — the shell never competes

## 2. Color Palette & Roles

### Primary
- **Forest Green** (`#2D6A4F`): Primary CTA, active states, links. The only chromatic accent.
- **Forest Hover** (`#245A42`): Hover state for primary elements.
- **Forest Light** (`#E8F2ED`): Tinted surface for green badges, selected states.
- **Forest Subtle** (`#F0F7F4`): Lightest green tint, backgrounds.

### Neutral — Warm Scale
- **Ink** (`#1A1A1A`): Primary headings, strong labels.
- **Ink Secondary** (`#4A4A4A`): Body text, descriptions.
- **Ink Muted** (`#7A7A7A`): Placeholder text, metadata, captions.
- **Ink Faint** (`#A0A0A0`): Disabled text, subtle icons.
- **Border** (`#E8E8E5`): Card borders (when needed), dividers.
- **Border Subtle** (`#F0F0ED`): Lightest dividers, section separators.
- **Surface Elevated** (`#FFFFFF`): Cards, elevated panels.
- **Surface** (`#FAFAF8`): Page background — warm ivory.
- **Surface Inset** (`#F4F4F1`): Recessed areas, input backgrounds.

### Dark Mode
- **Background** (`#121210`): Warm near-black, not cold.
- **Elevated** (`#1C1C1A`): Card surfaces in dark mode.
- **Inset** (`#0E0E0C`): Recessed areas.
- **Text** (`#EBEBEA`): Primary text on dark.
- **Text Secondary** (`#A8A8A5`): Body text on dark.
- **Text Muted** (`#6E6E6B`): Metadata on dark.
- **Border Dark** (`#2A2A28`): Borders on dark surfaces.
- **Green Dark** (`#3D9B6E`): Brightened green for dark backgrounds.

### Semantic
- **Success** (`#2D6A4F`): Same as primary green — intentional.
- **Warning** (`#C2850E`): Warm amber, not yellow.
- **Error** (`#C53030`): Deep red, not neon.
- **Info** (`#2B6CB0`): Steel blue.

## 3. Typography Rules

### Font Family
- **Display/Heading**: `'Instrument Serif', Georgia, 'Times New Roman', serif`
- **Body/UI**: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
- **Monospace**: `'JetBrains Mono', 'SF Mono', 'Fira Code', monospace`

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Hero | Instrument Serif | 56px (3.5rem) | 400 | 1.05 | -0.02em | Page hero only — italic optional for emphasis |
| H1 | Instrument Serif | 40px (2.5rem) | 400 | 1.10 | -0.01em | Section headings |
| H2 | Instrument Serif | 28px (1.75rem) | 400 | 1.20 | normal | Sub-section headings |
| H3 | Inter | 18px (1.125rem) | 600 | 1.30 | -0.01em | Card titles, feature labels |
| Body Large | Inter | 18px (1.125rem) | 400 | 1.65 | normal | Hero subtitles, intros |
| Body | Inter | 15px (0.9375rem) | 400 | 1.60 | normal | Standard reading text |
| Body Small | Inter | 13px (0.8125rem) | 400 | 1.50 | normal | Captions, metadata |
| Label | Inter | 11px (0.6875rem) | 600 | 1.40 | 0.05em | Category tags, badges — uppercase |
| Mono | JetBrains Mono | 13px (0.8125rem) | 400 | 1.50 | normal | Code, technical values |

### Principles
- **Serif for soul, sans for function.** Instrument Serif appears only on headings and display text. The moment text becomes functional (buttons, labels, nav), it switches to Inter. This boundary is sacred.
- **Weight 400 for serifs.** Instrument Serif at 400 has natural stroke contrast — adding weight (600+) makes it look clunky. Let the letterforms do the work.
- **Inter at 600 for emphasis.** When Inter needs to stand out (H3, labels, strong), use weight 600. Never 700+ in the body — that's for the serif display.
- **15px body, not 16px.** Slightly smaller body text creates a more refined, editorial density without sacrificing readability.

## 4. Component Stylings

### Buttons

**Primary (Green)**
- Background: `#2D6A4F`
- Text: `#FFFFFF`
- Padding: 10px 24px
- Radius: 10px
- Font: Inter 15px, weight 500
- Hover: `#245A42` background, `translateY(-1px)`
- Active: `#1E4D38`, `translateY(0)`
- Transition: all 200ms ease

**Secondary (Outline)**
- Background: transparent
- Text: `#1A1A1A`
- Border: 1px solid `#E8E8E5`
- Padding: 10px 24px
- Radius: 10px
- Hover: background `#F4F4F1`, border `#D0D0CD`

**Ghost**
- Background: transparent
- Text: `#7A7A7A`
- Padding: 8px 16px
- Radius: 8px
- Hover: text `#1A1A1A`, background `#F4F4F1`

### Cards (Dribbble-style)
- Background: `#FFFFFF`
- Border: none
- Radius: 16px
- Shadow (rest): `0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)`
- Shadow (hover): `0 4px 12px rgba(0,0,0,0.06), 0 12px 28px rgba(0,0,0,0.06)`
- Hover transform: `translateY(-4px)`
- Transition: `transform 300ms ease, box-shadow 300ms ease`
- Overflow: hidden (for image/preview crops)
- No border ever — shadow is the only separator

### Inputs
- Background: `#FFFFFF`
- Border: 1px solid `#E8E8E5`
- Radius: 10px
- Padding: 10px 14px
- Font: Inter 15px
- Focus: border `#2D6A4F`, ring `0 0 0 3px rgba(45,106,79,0.1)`
- Placeholder: `#A0A0A0`

### Badges
- Background: `#F0F7F4` (green tint) / `#F4F4F1` (neutral)
- Text: `#2D6A4F` (green) / `#7A7A7A` (neutral)
- Padding: 4px 10px
- Radius: 6px
- Font: Inter 11px, weight 600, uppercase, letter-spacing 0.05em

### Navigation
- Background: `rgba(250,250,248,0.85)` — semi-transparent warm ivory
- Backdrop filter: `blur(12px) saturate(180%)`
- Height: 56px
- Border bottom: 1px solid `#F0F0ED`
- Logo: Instrument Serif, 18px, weight 400, color `#1A1A1A`
- Nav links: Inter, 14px, weight 400, color `#7A7A7A`, hover `#1A1A1A`

## 5. Layout Principles & Spacing

### Spacing Scale
| Token | Value | Use |
|-------|-------|-----|
| xs | 4px | Micro gaps |
| sm | 8px | Icon padding, inline gaps |
| md | 16px | Component internal padding |
| lg | 24px | Card padding, grid gap |
| xl | 32px | Between related sections |
| 2xl | 48px | Section internal padding |
| 3xl | 80px | Between major sections |
| 4xl | 120px | Page-level hero spacing |

### Grid
- Max content width: 1200px
- Card grid: `repeat(auto-fill, minmax(340px, 1fr))` with 24px gap
- Featured grid: 3 columns at 380px+ each
- Centered with `margin: 0 auto`, padding `0 32px`

### Border Radius
| Token | Value | Use |
|-------|-------|-----|
| sm | 6px | Badges, small tags |
| md | 10px | Buttons, inputs |
| lg | 16px | Cards, panels |
| xl | 24px | Large containers, modals |
| full | 9999px | Pills, avatars |

## 6. Depth & Elevation

| Level | Shadow | Use |
|-------|--------|-----|
| None | none | Flat elements, text blocks |
| Subtle | `0 1px 2px rgba(0,0,0,0.03)` | Resting cards, list items |
| Card | `0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)` | Standard cards at rest |
| Card Hover | `0 4px 12px rgba(0,0,0,0.06), 0 12px 28px rgba(0,0,0,0.06)` | Cards on hover |
| Elevated | `0 8px 24px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)` | Modals, dropdowns |
| Nav | `0 1px 0 rgba(0,0,0,0.04)` | Sticky navigation bottom edge |

Shadow philosophy: Warm and soft. Never cold or harsh. Shadows use pure black at very low opacities (0.03-0.08), creating whisper-level depth that's felt more than seen.

## 7. Do's and Don'ts

### Do
- Use Instrument Serif ONLY for headings and display text — never for buttons, labels, or UI
- Keep the warm ivory (#FAFAF8) as page background — never pure white
- Let showcased design systems provide the color — the shell stays neutral
- Use shadow-only card separation, never borders
- Apply `translateY(-4px)` hover lift on interactive cards
- Keep forest green (#2D6A4F) usage to <5% of the page — CTAs and active states only
- Use generous spacing between sections (80-120px)
- Set body text at 15px Inter — slightly refined, not clunky 16px

### Don't
- Don't use Instrument Serif below 18px — it loses readability
- Don't use borders on cards — shadow is the only separator
- Don't use pure white (#fff) as page background — always warm ivory
- Don't use green decoratively (backgrounds, gradients, illustrations) — only for interactive elements
- Don't mix serif into functional UI (buttons, nav, inputs)
- Don't use bold (700+) on serif text — weight 400 is the signature
- Don't compete with showcased content — the shell is a gallery wall, not the art
- Don't use Inter lighter than 400 — it gets wispy at 300

## 8. Responsive Behavior

### Breakpoints
| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile | <640px | Single column, 24px padding, hero 32px text |
| Tablet | 640-1024px | 2-column card grid, reduced spacing |
| Desktop | 1024-1280px | 3-column grid, full spacing |
| Wide | >1280px | Content centered, generous margins |

### Collapsing Strategy
- Card grid: 3-col → 2-col → 1-col
- Navigation: full links → hamburger
- Hero text: 56px → 40px → 32px
- Section spacing: 80px → 48px → 32px
- Card preview height maintained proportionally

## 9. Agent Prompt Guide

### Quick Color Reference
- Page background: `#FAFAF8`
- Card surface: `#FFFFFF`
- Primary text: `#1A1A1A`
- Secondary text: `#4A4A4A`
- Muted text: `#7A7A7A`
- Border: `#E8E8E5`
- Primary CTA: `#2D6A4F`
- CTA hover: `#245A42`
- Badge bg: `#F0F7F4`

### CSS Variables — Light Mode
```css
:root {
  --bg: #FAFAF8;
  --bg-elevated: #FFFFFF;
  --bg-inset: #F4F4F1;
  --text: #1A1A1A;
  --text-secondary: #4A4A4A;
  --text-muted: #7A7A7A;
  --text-faint: #A0A0A0;
  --border: #E8E8E5;
  --border-subtle: #F0F0ED;
  --primary: #2D6A4F;
  --primary-hover: #245A42;
  --primary-text: #FFFFFF;
  --primary-bg: #F0F7F4;
  --accent: #2D6A4F;

  --font-heading: 'Instrument Serif', Georgia, serif;
  --font-body: 'Inter', -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-xl: 24px;

  --shadow-card: 0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03);
  --shadow-card-hover: 0 4px 12px rgba(0,0,0,0.06), 0 12px 28px rgba(0,0,0,0.06);
}
```

### CSS Variables — Dark Mode
```css
.dark, [data-theme="dark"] {
  --bg: #121210;
  --bg-elevated: #1C1C1A;
  --bg-inset: #0E0E0C;
  --text: #EBEBEA;
  --text-secondary: #A8A8A5;
  --text-muted: #6E6E6B;
  --text-faint: #4A4A48;
  --border: #2A2A28;
  --border-subtle: #1E1E1C;
  --primary: #3D9B6E;
  --primary-hover: #4DB87E;
  --primary-text: #FFFFFF;
  --primary-bg: #1A2B22;
  --accent: #3D9B6E;

  --shadow-card: 0 1px 3px rgba(0,0,0,0.2), 0 4px 12px rgba(0,0,0,0.15);
  --shadow-card-hover: 0 4px 12px rgba(0,0,0,0.25), 0 12px 28px rgba(0,0,0,0.2);
}
```

### Example Component Prompts
- "Create a gallery card: #FFFFFF background, no border, border-radius 16px, shadow `0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)`. Hover: translateY(-4px) with shadow `0 4px 12px rgba(0,0,0,0.06), 0 12px 28px rgba(0,0,0,0.06)`. Transition 300ms ease. Preview image area with overflow hidden and border-radius 16px 16px 0 0."
- "Create a page header: Instrument Serif 56px weight 400, letter-spacing -0.02em, color #1A1A1A. Subtitle in Inter 18px weight 400, color #4A4A4A. On warm ivory #FAFAF8 background. Green CTA button: #2D6A4F bg, white text, 10px radius, 10px 24px padding."
- "Create navigation: 56px height, rgba(250,250,248,0.85) background, backdrop-filter blur(12px) saturate(180%). Logo in Instrument Serif 18px #1A1A1A left-aligned. Links in Inter 14px #7A7A7A, hover #1A1A1A. Sticky top. Border-bottom 1px #F0F0ED."
