import type { DesignParams, CSSVariableSet, SpacingDensity, DepthStyle } from '../types';
import { generatePalette, hexToRgb } from './color';
import { getFontPair } from '../data/fonts';

const SPACING_SCALES: Record<SpacingDensity, { base: number; section: number; component: number }> = {
  compact: { base: 4, section: 24, component: 8 },
  default: { base: 8, section: 40, component: 16 },
  spacious: { base: 8, section: 64, component: 24 },
};

function getShadows(style: DepthStyle, isDark: boolean): Record<string, string> {
  const alpha = isDark ? 0.4 : 0.1;
  const alphaHeavy = isDark ? 0.6 : 0.2;

  switch (style) {
    case 'flat':
      return {
        '--shadow-xs': 'none',
        '--shadow-sm': 'none',
        '--shadow-md': 'none',
        '--shadow-lg': 'none',
      };
    case 'subtle':
      return {
        '--shadow-xs': `0 1px 2px rgba(0,0,0,${alpha * 0.5})`,
        '--shadow-sm': `0 2px 4px rgba(0,0,0,${alpha * 0.5})`,
        '--shadow-md': `0 4px 12px rgba(0,0,0,${alpha * 0.6})`,
        '--shadow-lg': `0 8px 24px rgba(0,0,0,${alpha * 0.8})`,
      };
    case 'elevated':
      return {
        '--shadow-xs': `0 1px 3px rgba(0,0,0,${alpha})`,
        '--shadow-sm': `0 4px 8px rgba(0,0,0,${alpha})`,
        '--shadow-md': `0 8px 24px rgba(0,0,0,${alphaHeavy * 0.6})`,
        '--shadow-lg': `0 16px 48px rgba(0,0,0,${alphaHeavy})`,
      };
    case 'glass':
      return {
        '--shadow-xs': `0 1px 2px rgba(0,0,0,${alpha * 0.3})`,
        '--shadow-sm': `0 4px 8px rgba(0,0,0,${alpha * 0.4})`,
        '--shadow-md': `0 8px 32px rgba(0,0,0,${alpha * 0.5})`,
        '--shadow-lg': `0 24px 48px rgba(0,0,0,${alpha * 0.6})`,
        '--glass-bg': isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.6)',
        '--glass-border': isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.3)',
        '--glass-blur': '12px',
      };
  }
}

function getTypeScale(ratio: number, baseSize: number = 16): Record<string, string> {
  const scale = (n: number) => Math.round(baseSize * Math.pow(ratio, n) * 100) / 100;
  return {
    '--text-xs': `${scale(-2)}px`,
    '--text-sm': `${scale(-1)}px`,
    '--text-base': `${baseSize}px`,
    '--text-lg': `${scale(1)}px`,
    '--text-xl': `${scale(2)}px`,
    '--text-2xl': `${scale(3)}px`,
    '--text-3xl': `${scale(4)}px`,
    '--text-4xl': `${scale(5)}px`,
    '--text-hero': `${scale(6)}px`,
  };
}

export function generateCSSVariables(params: DesignParams): CSSVariableSet {
  const isDark = params.mode === 'dark';
  const palette = generatePalette(params.primaryHue, params.accentHue, params.saturation, isDark);
  const fontPair = getFontPair(params.fontPair);
  const spacing = SPACING_SCALES[params.spacingDensity];
  const shadows = getShadows(params.depthStyle, isDark);
  const typeScale = getTypeScale(params.typeScaleRatio);
  const radius = params.borderRadius;

  return {
    // Colors — Primary
    '--color-primary-1': palette.primary[1],
    '--color-primary-2': palette.primary[2],
    '--color-primary-3': palette.primary[3],
    '--color-primary-4': palette.primary[4],
    '--color-primary-5': palette.primary[5],
    '--color-primary-6': palette.primary[6],
    '--color-primary-7': palette.primary[7],
    '--color-primary-8': palette.primary[8],
    '--color-primary-9': palette.primary[9],
    '--color-primary-10': palette.primary[10],
    '--color-primary-11': palette.primary[11],
    '--color-primary-12': palette.primary[12],

    // Colors — Neutral
    '--color-neutral-1': palette.neutral[1],
    '--color-neutral-2': palette.neutral[2],
    '--color-neutral-3': palette.neutral[3],
    '--color-neutral-4': palette.neutral[4],
    '--color-neutral-5': palette.neutral[5],
    '--color-neutral-6': palette.neutral[6],
    '--color-neutral-7': palette.neutral[7],
    '--color-neutral-8': palette.neutral[8],
    '--color-neutral-9': palette.neutral[9],
    '--color-neutral-10': palette.neutral[10],
    '--color-neutral-11': palette.neutral[11],
    '--color-neutral-12': palette.neutral[12],

    // Colors — Accent
    '--color-accent-1': palette.accent[1],
    '--color-accent-2': palette.accent[2],
    '--color-accent-3': palette.accent[3],
    '--color-accent-8': palette.accent[8],
    '--color-accent-9': palette.accent[9],
    '--color-accent-11': palette.accent[11],

    // Semantic colors
    '--color-success': palette.success,
    '--color-warning': palette.warning,
    '--color-error': palette.error,
    '--color-info': palette.info,

    // Mapped semantic tokens
    '--bg': palette.neutral[1],
    '--bg-elevated': palette.neutral[2],
    '--bg-inset': palette.neutral[3],
    '--text': palette.neutral[12],
    '--text-secondary': palette.neutral[11],
    '--text-muted': palette.neutral[9],
    '--text-faint': palette.neutral[7],
    '--border': palette.neutral[6],
    '--border-strong': palette.neutral[7],
    '--border-subtle': palette.neutral[4],
    '--primary': palette.primary[8],
    '--primary-hover': palette.primary[9],
    '--primary-text': isDark ? palette.neutral[1] : '#ffffff',
    '--primary-bg': palette.primary[2],
    '--accent': palette.accent[8],
    '--accent-hover': palette.accent[9],
    '--accent-text': isDark ? palette.neutral[1] : '#ffffff',

    // RGB versions for rgba usage
    '--bg-rgb': hexToRgb(palette.neutral[1]),
    '--text-rgb': hexToRgb(palette.neutral[12]),
    '--primary-rgb': hexToRgb(palette.primary[8]),

    // Typography
    '--font-heading': fontPair.heading,
    '--font-body': fontPair.body,
    '--font-mono': fontPair.mono,
    '--heading-letter-spacing': `${params.headingLetterSpacing}em`,
    '--heading-weight': '600',
    '--body-weight': '400',
    '--body-line-height': '1.6',
    '--heading-line-height': '1.15',
    ...typeScale,

    // Spacing
    '--space-1': `${spacing.base}px`,
    '--space-2': `${spacing.base * 2}px`,
    '--space-3': `${spacing.base * 3}px`,
    '--space-4': `${spacing.component}px`,
    '--space-6': `${spacing.component * 1.5}px`,
    '--space-8': `${spacing.section * 0.6}px`,
    '--space-12': `${spacing.section}px`,
    '--space-16': `${spacing.section * 1.5}px`,
    '--space-section': `${spacing.section}px`,
    '--space-component': `${spacing.component}px`,

    // Border Radius
    '--radius-sm': `${Math.max(radius * 0.4, 2)}px`,
    '--radius-md': `${radius}px`,
    '--radius-lg': `${Math.min(radius * 1.5, 24)}px`,
    '--radius-xl': `${Math.min(radius * 2, 32)}px`,
    '--radius-full': '9999px',

    // Shadows
    ...shadows,

    // Transitions
    '--duration-fast': '150ms',
    '--duration-normal': '200ms',
    '--duration-slow': '300ms',
  };
}

export function applyVariables(vars: CSSVariableSet, element: HTMLElement = document.documentElement) {
  Object.entries(vars).forEach(([key, value]) => {
    element.style.setProperty(key, value);
  });
}
