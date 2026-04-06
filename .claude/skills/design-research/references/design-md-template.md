# DESIGN.md Template

The 9-section format following Google Stitch / VoltAgent standard.
All values must come from extracted data. `{placeholders}` indicate where to insert real values.

```markdown
# Design System: {Site Name}

## 1. Visual Theme & Atmosphere

{2-3 paragraphs of design criticism describing the visual identity.
Not marketing copy — analytical, opinionated prose about what makes
this design distinctive. Reference specific values: "the aggressive
-2.4px letter-spacing at display sizes creates..." not "beautiful typography".}

**Key Characteristics:**
- {8-12 bullet points, each referencing specific CSS values}
- Example: "Shadow-as-border: box-shadow 0px 0px 0px 1px rgba(0,0,0,0.08)"
- Example: "Weight 300 for all headlines — light, confident, anti-convention"

## 2. Color Palette & Roles

### Primary
- **{Semantic Name}** (`{hex}`): {Role description}

### Neutral Scale
- **{Name}** (`{hex}`): {Role — e.g., "Primary text, headings"}
{...all neutral steps}

### Accent
- **{Name}** (`{hex}`): {Role}

### Semantic
- **Success** (`{hex}`): {Usage}
- **Warning** (`{hex}`): {Usage}
- **Error** (`{hex}`): {Usage}

### Shadows
- **{Name}** (`{shadow value}`): {Where used}

## 3. Typography Rules

### Font Family
- **Heading**: {font-family with fallbacks}
- **Body**: {font-family with fallbacks}
- **Monospace**: {font-family with fallbacks}

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Hero | {font} | {size}px | {weight} | {lh} | {ls} | {notes} |
{...10-15 rows}

### Principles
- {3-5 bullets explaining the typography system's logic}

## 4. Component Stylings

### Buttons
**Primary**
- Background: `{hex}`
- Text: `{hex}`
- Padding: {value}
- Radius: {value}px
- Hover: {description}

{...Secondary, Ghost, Danger variants}

### Cards
{Background, border, radius, shadow, padding, hover}

### Inputs
{Background, border, radius, padding, focus state}

## 5. Layout Principles & Spacing

### Spacing Scale
{Base unit, component padding, section spacing}

### Border Radius Scale
| Token | Value | Use |
{...}

### Grid
{Max width, columns, gutter}

## 6. Depth & Elevation

| Level | Shadow | Use |
{...levels}

## 7. Do's and Don'ts

### Do
- {5-8 actionable instructions an AI agent can follow}

### Don't
- {5-8 specific prohibitions}

## 8. Responsive Behavior

### Breakpoints
| Name | Width | Key Changes |
{...}

### Collapsing Strategy
{How each section adapts}

## 9. Agent Prompt Guide

### Quick Color Reference
- Page background: `{hex}`
- Primary text: `{hex}`
- Secondary text: `{hex}`
- Border: `{hex}`
- Primary CTA: `{hex}`
- Accent: `{hex}`

### Example Component Prompts
- {3 ready-to-paste prompts for generating components in this style}

### CSS Variables — Light Mode
```css
:root {
  --bg: {hex};
  --bg-elevated: {hex};
  --bg-inset: {hex};
  --text: {hex};
  --text-secondary: {hex};
  --text-muted: {hex};
  --border: {hex};
  --primary: {hex};
  --primary-hover: {hex};
  --primary-text: {hex};
  --accent: {hex};
  --font-heading: {font};
  --font-body: {font};
  --radius-md: {value}px;
}
```

### CSS Variables — Dark Mode
```css
.dark, [data-theme="dark"] {
  --bg: {hex};
  --bg-elevated: {hex};
  --bg-inset: {hex};
  --text: {hex};
  --text-secondary: {hex};
  --text-muted: {hex};
  --border: {hex};
  --primary: {hex};
  --primary-hover: {hex};
  --primary-text: {hex};
  --accent: {hex};
}
```
```
