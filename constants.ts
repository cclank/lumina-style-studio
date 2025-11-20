import { Theme } from './types';

export const DEFAULT_FONTS = [
  { name: 'Inter', value: '"Inter", sans-serif' },
  { name: 'Playfair Display', value: '"Playfair Display", serif' },
  { name: 'Space Grotesk', value: '"Space Grotesk", sans-serif' },
  { name: 'Merriweather', value: '"Merriweather", serif' },
  { name: 'DM Sans', value: '"DM Sans", sans-serif' },
  { name: 'Outfit', value: '"Outfit", sans-serif' },
  { name: 'Fira Code', value: '"Fira Code", monospace' },
];

export const DEFAULT_THEME: Theme = {
  id: 'default-modern',
  name: 'Modern Slate',
  description: 'Clean, minimalist, and corporate-ready.',
  colors: {
    primary: '#3b82f6',
    secondary: '#64748b',
    accent: '#0ea5e9',
    background: '#ffffff',
    surface: '#f8fafc',
    text: '#0f172a',
    muted: '#94a3b8',
  },
  typography: {
    headingFont: '"Inter", sans-serif',
    bodyFont: '"Inter", sans-serif',
    scale: 'medium',
  },
  ui: {
    borderRadius: '0.5rem',
    borderWidth: '1px',
    shadow: 'lg',
  },
};

export const PRESET_THEMES: Theme[] = [
  DEFAULT_THEME,
  
  // --- Tech Giants & Productivity ---
  {
    id: 'tech-fruit',
    name: 'Cupertino Glass',
    description: 'Inspired by Apple. Frosted glass, subtle grays, and premium blur.',
    colors: {
      primary: '#0071e3', // System Blue
      secondary: '#86868b', // Gray Text
      accent: '#2997ff', // Light Blue
      background: '#fbfbfd', // Off White
      surface: '#ffffff', // Pure White
      text: '#1d1d1f', // Almost Black
      muted: '#86868b',
    },
    typography: {
      headingFont: '"Inter", sans-serif',
      bodyFont: '"Inter", sans-serif',
      scale: 'medium',
    },
    ui: {
      borderRadius: '1.25rem',
      borderWidth: '0px',
      shadow: 'sm',
    },
  },
  {
    id: 'tech-productivity',
    name: 'The Workspace',
    description: 'Inspired by Notion. Stark black & white, serif headers, utilitarian.',
    colors: {
      primary: '#37352f', // Notion Black
      secondary: '#9b9a97', // Notion Gray
      accent: '#e16259', // Notion Red/Orange
      background: '#ffffff',
      surface: '#f7f6f3', // Light Gray Background
      text: '#37352f',
      muted: '#9b9a97',
    },
    typography: {
      headingFont: '"Merriweather", serif', // Lyon proxy
      bodyFont: '"Inter", sans-serif',
      scale: 'medium',
    },
    ui: {
      borderRadius: '0.375rem',
      borderWidth: '1px',
      shadow: 'sm',
    },
  },
  {
    id: 'tech-ai-warm',
    name: 'Helpful Warmth',
    description: 'Inspired by Claude. Warm bisque tones, sophisticated serifs, human.',
    colors: {
      primary: '#d97757', // Terracotta
      secondary: '#6b6b6b', // Warm Gray
      accent: '#da7756', // Burnt Orange
      background: '#fcf7f1', // Warm Paper
      surface: '#ffffff',
      text: '#383838', // Dark Gray
      muted: '#9e9e9e',
    },
    typography: {
      headingFont: '"Merriweather", serif', // Tiémpos proxy
      bodyFont: '"DM Sans", sans-serif',
      scale: 'medium',
    },
    ui: {
      borderRadius: '1rem',
      borderWidth: '1px',
      shadow: 'none',
    },
  },

  // --- Modern Trends ---
  {
    id: 'style-brutalist',
    name: 'Neo Brutalism',
    description: 'High contrast, thick borders, unpolished, raw geometric.',
    colors: {
      primary: '#8b5cf6', // Violet
      secondary: '#000000', // Black borders
      accent: '#facc15', // Yellow
      background: '#e0e7ff', // Light Indigo
      surface: '#ffffff',
      text: '#000000',
      muted: '#525252',
    },
    typography: {
      headingFont: '"Space Grotesk", sans-serif',
      bodyFont: '"Fira Code", monospace',
      scale: 'large',
    },
    ui: {
      borderRadius: '0px',
      borderWidth: '3px',
      shadow: 'none', // Brutalism usually uses hard CSS shadows not blur, we simulate via border
    },
  },
  {
    id: 'style-vaporwave',
    name: 'Vaporwave Sunset',
    description: 'Retro-futuristic 80s, neon pinks, cyan, and nostalgia.',
    colors: {
      primary: '#ff71ce', // Neon Pink
      secondary: '#01cdfe', // Neon Cyan
      accent: '#05ffa1', // Neon Green
      background: '#2b213a', // Deep Purple
      surface: '#120458', // Deep Blue
      text: '#ffffff',
      muted: '#b967ff',
    },
    typography: {
      headingFont: '"Outfit", sans-serif',
      bodyFont: '"Inter", sans-serif',
      scale: 'medium',
    },
    ui: {
      borderRadius: '0px',
      borderWidth: '0px',
      shadow: 'xl',
    },
  },

  // --- Artistic Mediums ---
  {
    id: 'art-ink',
    name: 'Ink Wash (Shui-mo)',
    description: 'Traditional Chinese ink wash. Stark contrasts, paper textures.',
    colors: {
      primary: '#171717', // Ink Black
      secondary: '#525252', // Diluted Ink
      accent: '#991b1b', // Seal Red
      background: '#f5f5f4', // Rice Paper
      surface: '#e7e5e4', // Wet Paper
      text: '#0a0a0a',
      muted: '#78716c',
    },
    typography: {
      headingFont: '"Playfair Display", serif',
      bodyFont: '"Merriweather", serif',
      scale: 'medium',
    },
    ui: {
      borderRadius: '0.25rem',
      borderWidth: '0px',
      shadow: 'lg',
    },
  },
  {
    id: 'art-oil',
    name: 'Oil Impasto',
    description: 'Rich, textured layers, deep crimsons and golds.',
    colors: {
      primary: '#7f1d1d', // Deep Crimson
      secondary: '#92400e', // Ochre
      accent: '#d97706', // Gold
      background: '#292524', // Dark Canvas
      surface: '#44403c', // Stone 700
      text: '#f5f5f4', // Stone 100
      muted: '#a8a29e',
    },
    typography: {
      headingFont: '"Merriweather", serif',
      bodyFont: '"Inter", sans-serif',
      scale: 'medium',
    },
    ui: {
      borderRadius: '0.5rem',
      borderWidth: '2px',
      shadow: '2xl',
    },
  },
  {
    id: 'art-pastel',
    name: 'Soft Chalk Pastel',
    description: 'Matte finish, dreamy soft pinks, mints, and dusty blues.',
    colors: {
      primary: '#f472b6', // Soft Pink
      secondary: '#94a3b8', // Dusty Blue
      accent: '#34d399', // Soft Mint
      background: '#fff1f2', // Rose 50
      surface: '#ffffff',
      text: '#475569', // Slate 600
      muted: '#cbd5e1',
    },
    typography: {
      headingFont: '"Outfit", sans-serif',
      bodyFont: '"DM Sans", sans-serif',
      scale: 'large',
    },
    ui: {
      borderRadius: '2rem',
      borderWidth: '4px',
      shadow: 'none',
    },
  },
  {
    id: 'art-sketch',
    name: 'Charcoal Sketch',
    description: 'Rough, monochromatic, graphite tones on off-white paper.',
    colors: {
      primary: '#262626', // Graphite
      secondary: '#525252', // Shader
      accent: '#171717', // Deep black
      background: '#e5e5e5', // Sketchbook paper
      surface: '#d4d4d4',
      text: '#0a0a0a',
      muted: '#737373',
    },
    typography: {
      headingFont: '"Fira Code", monospace', // Technical feel
      bodyFont: '"Inter", sans-serif',
      scale: 'small',
    },
    ui: {
      borderRadius: '0.1rem',
      borderWidth: '2px',
      shadow: 'sm',
    },
  },
  
  // --- Abstract Movements ---
  {
    id: 'art-cubism',
    name: 'Analytic Cubism',
    description: 'Fragmented geometry, earthy tones, and sharp angularity.',
    colors: {
      primary: '#855C3E', // Burnt Sienna
      secondary: '#5C564C', // Warm Grey
      accent: '#1E293B', // Slate Blue (Contrast)
      background: '#D6D3D1', // Stone 300 (Collage Paper)
      surface: '#E7E5E4', // Stone 200
      text: '#292524', // Warm Black
      muted: '#78716C',
    },
    typography: {
      headingFont: '"Space Grotesk", sans-serif', // Geometric
      bodyFont: '"Inter", sans-serif',
      scale: 'medium',
    },
    ui: {
      borderRadius: '0px', // Sharp edges
      borderWidth: '2px',
      shadow: 'sm',
    },
  },
  {
    id: 'art-surrealism',
    name: 'Dreamscape Surrealism',
    description: 'Illogical juxtapositions, soft gradients, sky blues and sunset oranges.',
    colors: {
      primary: '#0EA5E9', // Sky Blue
      secondary: '#F97316', // Sunset Orange
      accent: '#881337', // Deep Rose
      background: '#F0F9FF', // Pale Sky
      surface: '#FFFFFF',
      text: '#0F172A',
      muted: '#64748B',
    },
    typography: {
      headingFont: '"Playfair Display", serif', // Elegant/Classical
      bodyFont: '"Outfit", sans-serif',
      scale: 'medium',
    },
    ui: {
      borderRadius: '1.5rem', // Fluid
      borderWidth: '0px',
      shadow: '2xl', // Floating elements
    },
  },
  {
    id: 'art-abstract-exp',
    name: 'Abstract Expression',
    description: 'Emotional, chaotic splashes, raw canvas and vibrant primaries.',
    colors: {
      primary: '#DC2626', // Vibrant Red
      secondary: '#171717', // Ink Black
      accent: '#FACC15', // Splash Yellow
      background: '#FAF9F6', // Off-white Canvas
      surface: '#FFFFFF',
      text: '#000000',
      muted: '#525252',
    },
    typography: {
      headingFont: '"Outfit", sans-serif', // Bold modern
      bodyFont: '"DM Sans", sans-serif',
      scale: 'large',
    },
    ui: {
      borderRadius: '0.25rem',
      borderWidth: '0px',
      shadow: 'md',
    },
  },

  // --- High End & Luxury (Existing) ---
  {
    id: 'swiss-intl',
    name: 'Swiss International',
    description: 'Bold, objective, grid-based precision.',
    colors: {
      primary: '#ef4444',
      secondary: '#171717',
      accent: '#000000',
      background: '#ffffff',
      surface: '#f5f5f5',
      text: '#111111',
      muted: '#737373',
    },
    typography: {
      headingFont: '"Inter", sans-serif',
      bodyFont: '"Inter", sans-serif',
      scale: 'large',
    },
    ui: {
      borderRadius: '0px',
      borderWidth: '4px',
      shadow: 'none',
    },
  },
  {
    id: 'luxury-gold',
    name: 'Gilded Luxury',
    description: 'Sophisticated dark mode with gold accents.',
    colors: {
      primary: '#d4af37',
      secondary: '#262626',
      accent: '#f3e5ab',
      background: '#0a0a0a',
      surface: '#171717',
      text: '#e5e5e5',
      muted: '#525252',
    },
    typography: {
      headingFont: '"Merriweather", serif',
      bodyFont: '"Outfit", sans-serif',
      scale: 'medium',
    },
    ui: {
      borderRadius: '0.25rem',
      borderWidth: '1px',
      shadow: '2xl',
    },
  },

  // --- Masterpiece Collection (Existing) ---
  {
    id: 'art-starry-night',
    name: 'The Starry Night',
    description: 'Inspired by Vincent van Gogh. Swirling blues and glowing yellows.',
    colors: {
      primary: '#eab308',
      secondary: '#1e3a8a',
      accent: '#facc15',
      background: '#0f172a',
      surface: '#1e293b',
      text: '#f1f5f9',
      muted: '#64748b',
    },
    typography: {
      headingFont: '"Playfair Display", serif',
      bodyFont: '"Outfit", sans-serif',
      scale: 'medium',
    },
    ui: {
      borderRadius: '1rem',
      borderWidth: '1px',
      shadow: 'xl',
    },
  },
  {
    id: 'art-great-wave',
    name: 'The Great Wave',
    description: 'Inspired by Hokusai. Indigo power and seafoam white.',
    colors: {
      primary: '#1d4ed8',
      secondary: '#93c5fd',
      accent: '#1e40af',
      background: '#f0f9ff',
      surface: '#ffffff',
      text: '#0c4a6e',
      muted: '#94a3b8',
    },
    typography: {
      headingFont: '"Merriweather", serif',
      bodyFont: '"Inter", sans-serif',
      scale: 'medium',
    },
    ui: {
      borderRadius: '0.5rem',
      borderWidth: '2px',
      shadow: 'md',
    },
  },
  {
    id: 'art-water-lilies',
    name: 'Water Lilies',
    description: 'Inspired by Claude Monet. Impressionist pond greens and lilacs.',
    colors: {
      primary: '#a855f7',
      secondary: '#86efac',
      accent: '#d8b4e2',
      background: '#f0fdf4',
      surface: '#ffffff',
      text: '#14532d',
      muted: '#86efac',
    },
    typography: {
      headingFont: '"Playfair Display", serif',
      bodyFont: '"DM Sans", sans-serif',
      scale: 'small',
    },
    ui: {
      borderRadius: '1.5rem',
      borderWidth: '0px',
      shadow: 'sm',
    },
  },
  {
    id: 'art-monet-garden',
    name: 'Monet\'s Garden',
    description: 'Lush foliage and soft water reflections. Hazy greens and wisteria purples.',
    colors: {
      primary: '#4d7c0f', // Lush Green
      secondary: '#a21caf', // Wisteria Purple
      accent: '#bef264', // Lime accent
      background: '#f0fdf4', // Mint background
      surface: '#ffffff',
      text: '#14532d', // Dark Green text
      muted: '#86efac',
    },
    typography: {
      headingFont: '"Merriweather", serif',
      bodyFont: '"DM Sans", sans-serif',
      scale: 'medium',
    },
    ui: {
      borderRadius: '0.75rem',
      borderWidth: '1px',
      shadow: 'md',
    },
  },
  {
    id: 'art-kiss',
    name: 'The Kiss',
    description: 'Inspired by Gustav Klimt. Opulent gold and geometric patterns.',
    colors: {
      primary: '#ca8a04',
      secondary: '#451a03',
      accent: '#fde047',
      background: '#2a2a2a',
      surface: '#1c1917',
      text: '#fefce8',
      muted: '#78350f',
    },
    typography: {
      headingFont: '"Space Grotesk", sans-serif',
      bodyFont: '"Outfit", sans-serif',
      scale: 'large',
    },
    ui: {
      borderRadius: '0px',
      borderWidth: '1px',
      shadow: 'none',
    },
  },
  {
    id: 'art-pearl',
    name: 'Pearl Earring',
    description: 'Inspired by Vermeer. Ultramarine blue and soft ochre light.',
    colors: {
      primary: '#1d4ed8',
      secondary: '#d97706',
      accent: '#fef3c7',
      background: '#020617',
      surface: '#0f172a',
      text: '#e2e8f0',
      muted: '#475569',
    },
    typography: {
      headingFont: '"Playfair Display", serif',
      bodyFont: '"Inter", sans-serif',
      scale: 'medium',
    },
    ui: {
      borderRadius: '0.75rem',
      borderWidth: '1px',
      shadow: '2xl',
    },
  },
];