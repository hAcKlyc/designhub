export type StyleCategory =
  | 'structural'
  | 'surface'
  | 'era'
  | 'mood'
  | 'brutalism'
  | 'typography'
  | 'color'
  | 'technique';

export const CATEGORY_LABELS: Record<StyleCategory, string> = {
  structural: 'Structural',
  surface: 'Surface',
  era: 'Era / Movement',
  mood: 'Mood / Application',
  brutalism: 'Brutalism',
  typography: 'Typography-Led',
  color: 'Color-Led',
  technique: 'Technique',
};

export type SaturationLevel = 'muted' | 'medium' | 'vivid';
export type SpacingDensity = 'compact' | 'default' | 'spacious';
export type DepthStyle = 'flat' | 'subtle' | 'elevated' | 'glass';
export type ThemeMode = 'light' | 'dark';

export interface DesignParams {
  primaryHue: number;          // 0-360
  saturation: SaturationLevel;
  mode: ThemeMode;
  fontPair: string;            // font pair ID
  borderRadius: number;        // 0-24 px, 9999 for pill
  spacingDensity: SpacingDensity;
  depthStyle: DepthStyle;
  typeScaleRatio: number;      // 1.125-1.618
  headingLetterSpacing: number;// -0.05 to 0.2 em
  accentHue: number;           // 0-360
}

export interface DesignStyle {
  id: string;
  name: string;
  category: StyleCategory;
  description: string;
  philosophy: string;
  params: DesignParams;
  meta: {
    keyCharacteristics: string[];
    doList: string[];
    dontList: string[];
  };
  // Override generated CSS variables with exact values (for reference designs)
  cssOverrides?: CSSVariableSet;
  cssOverridesDark?: CSSVariableSet;
}

export interface FontPair {
  id: string;
  name: string;
  heading: string;
  headingGoogle: string;       // Google Fonts family name
  body: string;
  bodyGoogle: string;
  mono: string;
  monoGoogle: string;
  category: string;            // e.g., "geometric", "humanist", etc.
}

export interface ColorScale {
  1: string;  // lightest bg
  2: string;  // bg
  3: string;  // component bg
  4: string;  // component hover
  5: string;  // component active
  6: string;  // border subtle
  7: string;  // border
  8: string;  // solid bg
  9: string;  // solid hover
  10: string; // text secondary
  11: string; // text primary
  12: string; // text high contrast
}

export interface GeneratedPalette {
  primary: ColorScale;
  neutral: ColorScale;
  accent: ColorScale;
  success: string;
  warning: string;
  error: string;
  info: string;
}

export interface CSSVariableSet {
  [key: string]: string;
}
