
export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  muted: string;
  [key: string]: string; // Allow dynamic extension
}

export interface Typography {
  headingFont: string;
  bodyFont: string;
  scale: 'small' | 'medium' | 'large';
}

export interface UIStyle {
  borderRadius: string; // e.g., '0px', '0.5rem', '1.5rem'
  borderWidth: string; // e.g., '1px', '2px'
  shadow: string; // Tailwind shadow class suffix
}

export interface Theme {
  id: string;
  name: string;
  description?: string;
  colors: ColorPalette;
  typography: Typography;
  ui: UIStyle;
}

export enum TabView {
  PRESETS = 'PRESETS',
  CUSTOMIZE = 'CUSTOMIZE',
  AI_GEN = 'AI_GEN',
  EXPORT = 'EXPORT'
}
