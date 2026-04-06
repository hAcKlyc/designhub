# Design System: Apple

## 1. Visual Theme & Atmosphere

Apple's web design is subtractive to the point of philosophy. The homepage is a sequence of full-viewport panels that alternate between pure white (`#ffffff`), pale gray (`#f5f5f7`), and near-black (`#1d1d1f`). Within each panel, the product is the only thing that matters — there is no decorative chrome, no visible grid, no shadows, no borders. The product floats in space, and the space itself is the design.

The typographic system is built on SF Pro Display with a remarkably narrow weight range: 600 for headings, 400 for body. Hierarchy comes almost entirely through size — a 56px heading versus a 17px body is a 3.3× ratio, creating impact through scale rather than weight. Letter-spacing is consistently negative at display sizes (-0.28px at 56px), creating the characteristic Apple density where headlines feel engineered rather than designed. At body sizes, spacing shifts to slightly positive (+0.196px at 28px), optimizing for legibility in longer text.

What makes Apple's system extraordinary is what it refuses to use. No box-shadows exist anywhere on the page. No border-radius appears on containers (only on CTA buttons, where it's set to the extreme 980px pill shape). No colored backgrounds beyond the binary white/gray/black alternation and a single blue (`#0071e3`) reserved exclusively for interactive elements. This discipline means that every product photograph and every piece of typography carries maximum visual weight — nothing else competes.

**Key Characteristics:**
- Binary section alternation: `#ffffff`, `#f5f5f7`, `#1d1d1f` — no other background colors
- Zero box-shadows anywhere on the page — depth comes only from color block alternation
- SF Pro Display (Inter substitute) with size-based hierarchy, not weight-based
- Hero headings: 56px weight 600, letter-spacing -0.28px, line-height 60px
- Single accent color: `#0071e3` for CTAs, `#0066cc` for text links, `#2997ff` for dark sections
- CTA buttons use extreme pill radius (980px) — the only rounded element on the page
- Full-viewport edge-to-edge sections with products centered
- Glass navigation: `backdrop-filter: saturate(180%) blur(20px)`, 44px height
- Products are heroes — UI disappears to frame them
- Centered text alignment throughout — no left-aligned hero content

## 2. Color Palette & Roles

### Primary Text
- **Near Black** (`#1d1d1f`): Primary headings and text on light backgrounds. Not pure black — the slight warmth prevents harshness.
- **Dark Gray** (`#333336`): Navigation text, secondary labels.
- **Mid Gray** (`#6e6e73`): Footer headings, tertiary labels, metadata.
- **Soft Gray** (`rgba(0,0,0,0.72)`): Footer links, subdued interactive text.

### Backgrounds
- **Pure White** (`#ffffff`): Primary page background, hero sections.
- **Light Gray** (`#f5f5f7`): Alternating sections, recessed areas.
- **Secondary** (`#fafafc`): Subtle tint for nav open state.
- **Dark** (`#1d1d1f`): Dark product sections, dramatic contrast panels.

### Interactive
- **Apple Blue** (`#0071e3`): Primary CTA button fill, focus ring. The single interactive color.
- **Link Blue** (`#0066cc`): Text links, "Learn more" in body context.
- **Dark Mode Blue** (`#2997ff`): CTA text and links on dark backgrounds.

### Light-on-Dark
- **Light Text** (`#f5f5f7`): Headings on dark sections.
- **Light Secondary** (`rgba(255,255,255,0.92)`): Body text on dark sections.

### Semantic (from CSS vars)
- **Red** (`#e30000`): Alerts, Product Red accent.
- **Green** (`#03a10e`): Success indicators, environmental messaging.
- **Orange** (`#f56300`): Warnings, accent.

## 3. Typography Rules

### Font Family
- **Display**: SF Pro Display, with fallback: `Inter, -apple-system, BlinkMacSystemFont, sans-serif`
- **Body**: SF Pro Text, with fallback: `Inter, -apple-system, BlinkMacSystemFont, sans-serif`
- **Monospace**: SF Mono, with fallback: `JetBrains Mono, ui-monospace, monospace`

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Hero Heading | SF Pro Display | 56px (3.50rem) | 600 | 60px (1.07) | -0.28px | Product names: "iPhone", "MacBook" |
| Section Heading | SF Pro Display | 40px (2.50rem) | 600 | 44px (1.10) | normal | Sub-product headings |
| Body Hero | SF Pro Display | 28px (1.75rem) | 400 | 32px (1.14) | 0.196px | Hero subtitles, feature descriptions |
| Body Large | SF Pro Display | 21px (1.31rem) | 400 | 25px (1.19) | 0.011px | Section descriptions |
| Body | SF Pro Text | 17px (1.06rem) | 400 | 25px (1.47) | -0.022px | Standard reading text |
| CTA Button | SF Pro Text | 17px (1.06rem) | 400 | 25px (1.47) | normal | "Learn more", "Buy" |
| Small CTA | SF Pro Text | 14px (0.88rem) | 400 | 20px (1.43) | normal | Dark section CTAs |
| Nav | SF Pro Text | 12px (0.75rem) | 400 | 44px | normal | Global navigation links |
| Footer | SF Pro Text | 12px (0.75rem) | 400 | 20px (1.67) | normal | Footer content |
| Legal | SF Pro Text | 12px (0.75rem) | 400 | 18px (1.50) | normal | Fine print |

### Principles
- **Size IS hierarchy**: Apple uses only two weights (400 and 600). All visual hierarchy comes from font size, with a 4.7× ratio between hero (56px) and body (12px).
- **Progressive letter-spacing**: Negative at display sizes (-0.28px at 56px), transitioning to slightly positive at body sizes (+0.196px at 28px, -0.022px at 17px). This creates density at large sizes and legibility at small sizes.
- **Center alignment as default**: Unlike most design systems, Apple centers virtually all text. Left-alignment is rare and reserved for dense content like footer columns.

## 4. Component Stylings

### Buttons

**Primary Pill (Blue)**
- Background: `#0071e3`
- Text: `#ffffff`
- Padding: 11px 21px
- Radius: 980px (fully rounded pill)
- Font: 17px, weight 400
- Hover: `#0066cc` background
- Use: Primary CTA ("Learn more", "Get started")

**Dark Pill**
- Background: `#1d1d1f`
- Text: `#ffffff`
- Padding: 11px 21px
- Radius: 980px
- Font: 17px, weight 400
- Use: Secondary CTA on light backgrounds ("Watch the film")

**Text Link (Blue)**
- Background: transparent
- Text: `#0066cc` (light bg) / `#2997ff` (dark bg)
- Padding: none
- Font: 17px, weight 400
- Hover: underline
- Use: "Shop iPhone", "Buy", inline text links

### Cards
Apple does not use cards. Sections ARE the containers. No elevated surfaces, no card borders, no card shadows.

### Inputs
Minimal presence on marketing pages. When used:
- Background: `#ffffff`
- Border: 1px solid `#d2d2d7`
- Radius: 12px
- Focus: `#0071e3` ring

## 5. Layout Principles & Spacing

### Spacing
Apple's spacing is not grid-based — it's optically driven. Approximate values:
- Section padding: 80-100px vertical, edge-to-edge horizontal
- Heading to subtitle: 6-12px
- Subtitle to CTA: 16-24px
- CTA pair gap: 16px
- Section-to-section: 0px (sections touch, color change provides separation)

### Border Radius Scale
| Token | Value | Use |
|-------|-------|-----|
| None | 0px | All containers — Apple uses no rounded containers |
| Input | 12px | Search fields, form inputs (rare) |
| Card | 20px | Product comparison cards (iPhone page only) |
| Pill | 980px | CTA buttons — the only commonly rounded element |

### Grid
- Max content width: ~980px (centered)
- No visible column grid
- Full-width background colors extend edge-to-edge
- Content centered within sections

## 6. Depth & Elevation

Apple uses NO shadows for elevation. Zero box-shadow values detected on the homepage.

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat | No shadow | Everything — Apple is shadow-free |
| Glass Nav | `backdrop-filter: saturate(180%) blur(20px)` | Sticky global navigation only |

Depth is created exclusively through background color alternation: white → light gray → dark → white creates a visual rhythm of advancing and receding surfaces without any shadow.

## 7. Do's and Don'ts

### Do
- Alternate full-width sections between `#ffffff`, `#f5f5f7`, and `#1d1d1f`
- Use 56px weight-600 headings with -0.28px letter-spacing for product names
- Center ALL text in hero and feature sections
- Use `#0071e3` exclusively for interactive elements — never decoratively
- Use extreme pill radius (980px) for CTA buttons
- Let products dominate each section — UI should be invisible
- Switch to `#2997ff` blue for links/CTAs on dark backgrounds
- Apply glass effect (`backdrop-filter: saturate(180%) blur(20px)`) on navigation only

### Don't
- Don't use box-shadows anywhere — Apple's entire system is shadow-free
- Don't use borders on containers or sections
- Don't use colored backgrounds beyond the white/gray/black trio
- Don't left-align hero content — center alignment is the Apple way
- Don't use font weights other than 400 and 600
- Don't use `#0071e3` on dark backgrounds — use `#2997ff` instead
- Don't add decorative elements around products — the product IS the hero
- Don't use cards with elevation — sections are the containers

## 8. Responsive Behavior

### Breakpoints (from CSS vars)
| Name | Width | Key Changes |
|------|-------|-------------|
| Small | <834px | Stacked layout, reduced type scale, 40px hero heading |
| Medium | 834-1023px | Intermediate, some 2-column layouts |
| Large | ≥1024px | Full desktop layout, 56px hero headings |

### Collapsing Strategy
- Hero headings: 56px → 40px on small viewports
- Products: scale down proportionally, maintain aspect ratio
- Navigation: full text links → hamburger menu
- Section height: reduces proportionally
- CTA pair: stays horizontal, button size reduces slightly
- Full-bleed sections maintained at all sizes

## 9. Agent Prompt Guide

### Quick Color Reference
- Page background: `#ffffff`
- Alt section bg: `#f5f5f7`
- Dark section bg: `#1d1d1f`
- Primary text: `#1d1d1f`
- Secondary text: `#6e6e73`
- Light text (on dark): `#f5f5f7`
- CTA button: `#0071e3`
- Text link: `#0066cc`
- Dark mode link: `#2997ff`

### Example Component Prompts
- "Create a hero section with white background. Center-aligned heading at 56px Inter weight 600, letter-spacing -0.28px, color #1d1d1f. Subtitle at 28px weight 400, letter-spacing 0.196px, color #1d1d1f. Two pill CTAs side by side: 'Learn more' (#0071e3 bg, white text, 980px radius, 11px 21px padding) and 'Shop iPhone' (transparent bg, #0066cc text, no border)."
- "Create a dark product section with #1d1d1f background. Center-aligned heading at 56px Inter weight 600, color #f5f5f7. Subtitle at 28px weight 400, color rgba(255,255,255,0.92). CTA pair: 'Learn more' (#2997ff text, no bg) and 'Buy' (#2997ff text, no bg). Product illustration centered below text."
- "Create an Apple-style navigation bar: 44px height, rgba(255,255,255,0.8) bg, backdrop-filter: saturate(180%) blur(20px). Apple logo () left, product links (Store, Mac, iPad, iPhone, Watch) at 12px weight 400 #333336. Sticky position."

### CSS Variables
```css
:root {
  /* Colors */
  --bg: #ffffff;
  --bg-elevated: #fafafc;
  --bg-inset: #f5f5f7;
  --bg-dark: #1d1d1f;
  --text: #1d1d1f;
  --text-secondary: #6e6e73;
  --text-muted: rgba(0,0,0,0.72);
  --text-light: #f5f5f7;
  --border: #d2d2d7;
  --primary: #0071e3;
  --primary-hover: #0066cc;
  --primary-dark: #2997ff;
  --accent: #0071e3;

  /* Typography */
  --font-heading: Inter, -apple-system, sans-serif;
  --font-body: Inter, -apple-system, sans-serif;

  /* Spacing */
  --section-padding: 80px;
  --content-max-width: 980px;

  /* Radius */
  --radius-none: 0px;
  --radius-input: 12px;
  --radius-pill: 980px;
}
```
