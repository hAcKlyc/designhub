import type { SaturationLevel, ColorScale, GeneratedPalette } from '../types';

// OKLCH color generation — 12-step scale from a seed hue
// Based on Radix Colors approach: Gaussian chroma distribution in OKLCH space

function oklchToHex(l: number, c: number, h: number): string {
  // Convert OKLCH → OKLab → linear RGB → sRGB → hex
  const a = c * Math.cos((h * Math.PI) / 180);
  const b = c * Math.sin((h * Math.PI) / 180);

  // OKLab to linear sRGB
  const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = l - 0.0894841775 * a - 1.2914855480 * b;

  const lr = l_ * l_ * l_;
  const mr = m_ * m_ * m_;
  const sr = s_ * s_ * s_;

  const r = +4.0767416621 * lr - 3.3077115913 * mr + 0.2309699292 * sr;
  const g = -1.2684380046 * lr + 2.6097574011 * mr - 0.3413193965 * sr;
  const bl = -0.0041960863 * lr - 0.7034186147 * mr + 1.7076147010 * sr;

  const toSRGB = (x: number) => {
    const clamped = Math.max(0, Math.min(1, x));
    return clamped <= 0.0031308
      ? clamped * 12.92
      : 1.055 * Math.pow(clamped, 1 / 2.4) - 0.055;
  };

  const toHex = (x: number) => {
    const val = Math.round(toSRGB(x) * 255);
    return val.toString(16).padStart(2, '0');
  };

  return `#${toHex(r)}${toHex(g)}${toHex(bl)}`;
}

// Gaussian distribution for chroma (peaks at mid-lightness)
function gaussianChroma(
  step: number,
  maxChroma: number,
  peak: number = 0.5,
  spread: number = 0.25
): number {
  const x = step / 11; // normalize to 0-1
  const exp = -Math.pow(x - peak, 2) / (2 * spread * spread);
  return maxChroma * Math.pow(Math.E, exp);
}

const SATURATION_CHROMA: Record<SaturationLevel, number> = {
  muted: 0.06,
  medium: 0.12,
  vivid: 0.18,
};

export function generateColorScale(
  hue: number,
  saturation: SaturationLevel,
  isDark: boolean = false
): ColorScale {
  const maxChroma = SATURATION_CHROMA[saturation];
  const steps: string[] = [];

  // 12 lightness stops — from lightest to darkest (light mode)
  // or darkest to lightest (dark mode)
  const lightnessStops = isDark
    ? [0.13, 0.16, 0.19, 0.22, 0.26, 0.30, 0.35, 0.55, 0.62, 0.72, 0.82, 0.93]
    : [0.98, 0.96, 0.93, 0.90, 0.87, 0.83, 0.77, 0.55, 0.48, 0.40, 0.25, 0.15];

  for (let i = 0; i < 12; i++) {
    const lightness = lightnessStops[i];
    const chroma = gaussianChroma(i, maxChroma, 0.6, 0.3);
    steps.push(oklchToHex(lightness, chroma, hue));
  }

  return {
    1: steps[0],
    2: steps[1],
    3: steps[2],
    4: steps[3],
    5: steps[4],
    6: steps[5],
    7: steps[6],
    8: steps[7],
    9: steps[8],
    10: steps[9],
    11: steps[10],
    12: steps[11],
  };
}

export function generateNeutralScale(
  hue: number,
  saturation: SaturationLevel,
  isDark: boolean = false
): ColorScale {
  // Neutrals use very low chroma — just a hint of the primary hue
  const baseChroma = SATURATION_CHROMA[saturation] * 0.15;
  const steps: string[] = [];

  const lightnessStops = isDark
    ? [0.12, 0.15, 0.18, 0.21, 0.25, 0.30, 0.38, 0.50, 0.58, 0.68, 0.80, 0.94]
    : [0.99, 0.97, 0.94, 0.91, 0.87, 0.82, 0.75, 0.55, 0.45, 0.35, 0.22, 0.12];

  for (let i = 0; i < 12; i++) {
    const lightness = lightnessStops[i];
    const chroma = gaussianChroma(i, baseChroma, 0.5, 0.4);
    steps.push(oklchToHex(lightness, chroma, hue));
  }

  return {
    1: steps[0],
    2: steps[1],
    3: steps[2],
    4: steps[3],
    5: steps[4],
    6: steps[5],
    7: steps[6],
    8: steps[7],
    9: steps[8],
    10: steps[9],
    11: steps[10],
    12: steps[11],
  };
}

export function generatePalette(
  primaryHue: number,
  accentHue: number,
  saturation: SaturationLevel,
  isDark: boolean
): GeneratedPalette {
  return {
    primary: generateColorScale(primaryHue, saturation, isDark),
    neutral: generateNeutralScale(primaryHue, saturation, isDark),
    accent: generateColorScale(accentHue, saturation, isDark),
    success: isDark ? '#4aad7a' : '#2d8a5e',
    warning: isDark ? '#f59e0b' : '#d97706',
    error: isDark ? '#ef4444' : '#dc2626',
    info: isDark ? '#6b9fd4' : '#4a7ab5',
  };
}

// Utility: hex to RGB string
export function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}
