# Style Extraction Script

This JavaScript runs inside the target page via `page.evaluate()` in Playwright.
It extracts all design tokens from the live DOM.

## Usage

```javascript
const { chromium } = require("playwright");

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(url, { waitUntil: "networkidle", timeout: 20000 });
await page.waitForTimeout(3000);

// Take screenshots
await page.screenshot({ path: outputDir + "/original-desktop.png", fullPage: false });

// Extract styles
const styleReport = await page.evaluate(() => {
  const results = {};
  const allElements = document.querySelectorAll("*");
  
  // --- Colors ---
  const bgColors = new Map();
  const textColors = new Map();
  const borderColors = new Set();
  
  for (let i = 0; i < Math.min(allElements.length, 800); i++) {
    const cs = getComputedStyle(allElements[i]);
    
    const bg = cs.backgroundColor;
    if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") {
      bgColors.set(bg, (bgColors.get(bg) || 0) + 1);
    }
    
    const tc = cs.color;
    if (tc) textColors.set(tc, (textColors.get(tc) || 0) + 1);
    
    const bc = cs.borderColor;
    if (bc && bc !== "rgb(0, 0, 0)" && cs.borderWidth !== "0px") {
      borderColors.add(bc);
    }
  }
  
  // Sort by frequency
  results.bgColors = [...bgColors.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([color, count]) => ({ color, count }));
  results.textColors = [...textColors.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .map(([color, count]) => ({ color, count }));
  results.borderColors = [...borderColors].slice(0, 10);
  
  // --- Typography ---
  const fonts = new Set();
  for (let i = 0; i < Math.min(allElements.length, 300); i++) {
    fonts.add(getComputedStyle(allElements[i]).fontFamily.split(",")[0].trim().replace(/"/g, ""));
  }
  results.fonts = [...fonts];
  
  // Heading details
  results.headings = [];
  document.querySelectorAll("h1, h2, h3, h4").forEach((h, i) => {
    if (i < 8 && h.textContent.trim().length > 0) {
      const cs = getComputedStyle(h);
      results.headings.push({
        tag: h.tagName,
        text: h.textContent.trim().substring(0, 80),
        fontSize: cs.fontSize,
        fontWeight: cs.fontWeight,
        fontFamily: cs.fontFamily.split(",")[0].trim().replace(/"/g, ""),
        color: cs.color,
        letterSpacing: cs.letterSpacing,
        lineHeight: cs.lineHeight,
      });
    }
  });
  
  // Body text sample
  const bodyP = document.querySelector("p");
  if (bodyP) {
    const cs = getComputedStyle(bodyP);
    results.bodyText = {
      fontSize: cs.fontSize,
      fontWeight: cs.fontWeight,
      fontFamily: cs.fontFamily.split(",")[0].trim().replace(/"/g, ""),
      color: cs.color,
      lineHeight: cs.lineHeight,
      letterSpacing: cs.letterSpacing,
    };
  }
  
  // --- Components ---
  // Buttons
  results.buttons = [];
  document.querySelectorAll("a[class*=btn], a[class*=Button], a[class*=cta], button[class], [role=button]").forEach((b, i) => {
    if (i < 8) {
      const cs = getComputedStyle(b);
      results.buttons.push({
        text: b.textContent.trim().substring(0, 40),
        bg: cs.backgroundColor,
        color: cs.color,
        borderRadius: cs.borderRadius,
        padding: cs.padding,
        fontSize: cs.fontSize,
        fontWeight: cs.fontWeight,
        border: cs.borderWidth !== "0px" ? `${cs.borderWidth} ${cs.borderStyle} ${cs.borderColor}` : "none",
        boxShadow: cs.boxShadow !== "none" ? cs.boxShadow : undefined,
      });
    }
  });
  
  // --- Layout ---
  results.borderRadii = new Set();
  results.boxShadows = new Set();
  for (let i = 0; i < Math.min(allElements.length, 300); i++) {
    const cs = getComputedStyle(allElements[i]);
    if (cs.borderRadius && cs.borderRadius !== "0px") results.borderRadii.add(cs.borderRadius);
    if (cs.boxShadow && cs.boxShadow !== "none") results.boxShadows.add(cs.boxShadow);
  }
  results.borderRadii = [...results.borderRadii].slice(0, 15);
  results.boxShadows = [...results.boxShadows].slice(0, 10);
  
  // CSS custom properties from :root
  results.cssVars = {};
  const rootStyles = getComputedStyle(document.documentElement);
  const sheets = document.styleSheets;
  try {
    for (const sheet of sheets) {
      try {
        for (const rule of sheet.cssRules) {
          if (rule.selectorText === ":root" || rule.selectorText === ":root, :host") {
            for (let i = 0; i < rule.style.length; i++) {
              const prop = rule.style[i];
              if (prop.startsWith("--")) {
                results.cssVars[prop] = rule.style.getPropertyValue(prop).trim();
              }
            }
          }
        }
      } catch (e) { /* cross-origin sheet */ }
    }
  } catch (e) { /* no access */ }
  
  // Page structure
  results.nav = [...document.querySelectorAll("nav a, header a")]
    .map(a => a.textContent.trim())
    .filter(t => t.length > 0 && t.length < 30)
    .slice(0, 12);
  results.sectionCount = document.querySelectorAll("section, [class*=section], [class*=Section], main > div").length;
  
  return results;
});

// Convert rgb() to hex for cleaner output
function rgbToHex(rgb) {
  const match = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (!match) return rgb;
  return "#" + [match[1], match[2], match[3]]
    .map(x => parseInt(x).toString(16).padStart(2, "0"))
    .join("");
}
```

## Verified Capabilities (tested on stripe.com)

| Capability | Status | Notes |
|---|---|---|
| Screenshot (desktop) | ✅ | `page.screenshot()` with full page or viewport |
| Font family extraction | ✅ | Gets real names (sohne-var, not fallback) |
| Color extraction (text/bg/border) | ✅ | Computed values in rgb() format |
| Font size/weight/spacing | ✅ | Exact px values from computed style |
| Border radius | ✅ | All unique values |
| Box shadows | ✅ | Full shadow declarations |
| CSS custom properties | ✅ | From :root rules (same-origin sheets only) |
| Heading hierarchy | ✅ | h1-h4 with all style properties |
| Button styles | ✅ | bg, color, radius, padding, border |
| Nav structure | ✅ | Link text content |
| Section count | ✅ | Approximate page structure |

## Font Substitution Map

| Proprietary | Google Fonts Substitute |
|---|---|
| sohne-var | Inter (weight 300 for headlines) |
| Geist | Inter (tight letter-spacing) |
| SF Pro Display/Text | Inter |
| Circular | Plus Jakarta Sans |
| GT Walsheim | DM Sans |
| Graphik | Inter |
| Suisse Int'l | DM Sans |
| Neue Haas Grotesk | Inter |
| Berkeley Mono | JetBrains Mono |
| Anthropic Serif | Lora |
| D-DIN | Jost |
| SpotifyMixUI | Nunito Sans |
| figmaSans | Inter |
| NotionInter | Inter |
