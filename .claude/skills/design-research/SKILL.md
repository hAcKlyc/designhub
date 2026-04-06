---
name: design-research
description: >
  Reverse-engineer any website into a complete design system case study.
  Takes a URL, researches the site's visual design via browser automation,
  produces a high-fidelity demo page + standardized DESIGN.md + deployment-ready
  materials for DesignHub. Use when given a URL to analyze as a design reference,
  or when asked to "add a design", "research this site's design", "reverse
  engineer this design", or "create a case study from this URL".
---

# Design Research — Website → Design System Pipeline

You are the **owner** of this research task. You decide when quality is sufficient,
when to iterate, and when to ship. You delegate browser work to subagents but
you make all judgment calls.

## Pipeline Overview

```
URL → Research (browser) → Reverse Engineer → Validate → Iterate → Package
```

## Phase 1: Research

Spawn a subagent to visit the target URL and extract design data.

The subagent should use Playwright (already installed in this project as a dev dependency) to:

### 1a. Screenshots
```javascript
// Take 3 viewports
await page.screenshot({ path: `{workdir}/screenshots/desktop.png`, fullPage: true });
// Also: tablet (768px) and a focused hero crop
```

### 1b. Style Extraction
Run this JS in the page via `page.evaluate()`:

```javascript
// Extract from the live DOM:
// - All unique colors (text, background, border)
// - Font families in use
// - Border-radius values
// - Box-shadow values
// - Heading hierarchy (tag, text, size, weight, letterSpacing, color)
// - Button styles (bg, color, radius, padding, weight)
// - Nav links (text content)
// - Section count and structure
// - CSS custom properties from :root
```

Scan up to 500 elements. Collect into a JSON report.

### 1c. What You Get

The subagent returns: screenshots + a JSON style report. Read the screenshots yourself
to understand layout, imagery, color blocks, and overall composition that computed
styles alone can't capture.

## Phase 2: Reverse Engineer

Using the research data, YOU (the main agent) produce two artifacts:

### 2a. Demo Page (`demo.html`)

A standalone HTML file that visually replicates the original website:
- Same layout structure (hero type, section flow, card arrangements)
- Same color palette (exact hex values from extraction)
- Same typography feel (use Google Fonts closest match if proprietary)
- CSS-only decorative elements (gradients, shapes, patterns) replacing images
- Realistic copy matching the product's voice
- 400-800 lines, all styles inline, only Google Fonts external

**Font matching strategy**: If the extracted font is proprietary (sohne-var, Geist,
SF Pro, etc.), find the closest Google Font:
- sohne-var → Inter (weight 300 emphasis)
- Geist → Inter (tight letter-spacing)
- SF Pro → Inter
- Circular → Plus Jakarta Sans
- GT Walsheim → DM Sans

### 2b. DESIGN.md

A 9-section design system document following the Google Stitch / VoltAgent standard:

1. Visual Theme & Atmosphere (2-3 paragraphs of design criticism + Key Characteristics)
2. Color Palette & Roles (grouped by semantic role, exact hex values)
3. Typography Rules (font family + hierarchy table + principles)
4. Component Stylings (buttons, cards, inputs with exact values)
5. Layout Principles & Spacing (grid, spacing scale, border-radius scale)
6. Depth & Elevation (shadow values table)
7. Do's and Don'ts (actionable guardrails)
8. Responsive Behavior (breakpoints, collapsing strategy)
9. Agent Prompt Guide (quick reference + example prompts + CSS variables block)

**All values must come from the extracted data, not approximated.**

## Phase 3: Validate

Spawn a NEW subagent (clean context) with this task:

> "Read this DESIGN.md file at {path}. Using ONLY the information in this
> document, create a landing page for a fictional product. Write it to {path}/validation.html.
> Do not look at any other files."

Then YOU:
1. Screenshot the validation page
2. Compare it visually with the original screenshots
3. Check: Do the colors match? Does the typography feel right? Is the spacing similar?
4. Score 1-10 on: Color accuracy, Typography feel, Layout similarity, Overall vibe

If score < 7 on any dimension → iterate on the DESIGN.md and re-validate.

## Phase 4: Package

Once validation passes, produce these files in the output directory:

```
{output_dir}/
├── demo.html              # High-fidelity replica page
├── DESIGN.md              # 9-section design system document
├── metadata.json          # Gallery integration data
├── screenshots/
│   ├── original.png       # Original site screenshot
│   └── demo.png           # Our demo screenshot
└── cssOverrides.json      # CSS variable overrides for our system
```

### metadata.json format:
```json
{
  "id": "site-name",
  "name": "Site Name",
  "description": "One-line description of the design language",
  "category": "mood",
  "accentColor": "#hex",
  "bgColor": "#hex",
  "textColor": "#hex",
  "sourceUrl": "https://..."
}
```

### cssOverrides.json format:
```json
{
  "--bg": "#hex",
  "--bg-elevated": "#hex",
  "--text": "#hex",
  "--text-secondary": "#hex",
  "--text-muted": "#hex",
  "--border": "#hex",
  "--primary": "#hex",
  "--primary-hover": "#hex",
  "--primary-text": "#hex",
  "--primary-bg": "#hex",
  "--accent": "#hex"
}
```

## Output Directory

All output goes to: `public/reference/{site-id}/`
- `{site-id}` = lowercase domain without TLD (e.g., "stripe", "linear", "notion")

After packaging, tell the user:
1. What was produced and where
2. Key design insights discovered
3. Any compromises made (e.g., font substitution, missing imagery)
4. How to integrate into the Gallery (add to references.ts + styles data)

## Quality Standards

- Demo page must be visually recognizable as "that site" to someone who's seen the original
- DESIGN.md must contain EXACT hex values, not approximations
- Color extraction should capture the full palette (primary, secondary, accent, neutrals, semantic)
- Typography hierarchy must include at least 8 levels with exact sizes/weights/spacing
- Every Do/Don't must be specific enough for an AI agent to follow mechanically
