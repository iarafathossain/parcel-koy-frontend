/**
 * Design System Configuration
 * Central authority for all spacing, typography, and styling decisions
 * Use these constants throughout the app to maintain consistency
 */

// ============================================================================
// SPACING SCALE - Based on Tailwind's 4px base unit
// ============================================================================
export const SPACING = {
  // Base unit: 4px
  xs: "0.25rem", // 4px
  sm: "0.5rem", // 8px
  md: "0.75rem", // 12px
  base: "1rem", // 16px
  lg: "1.25rem", // 20px
  xl: "1.5rem", // 24px
  "2xl": "2rem", // 32px
  "3xl": "2.5rem", // 40px
  "4xl": "3rem", // 48px
  "5xl": "3.5rem", // 56px
  "6xl": "4rem", // 64px
} as const;

// Tailwind class equivalents for quick reference
export const SPACING_CLASSES = {
  xs: "4px (p-1)",
  sm: "8px (p-2)",
  md: "12px (p-3)",
  base: "16px (p-4)",
  lg: "20px (p-5)",
  xl: "24px (p-6)",
  "2xl": "32px (p-8)",
  "3xl": "40px (p-10)",
  "4xl": "48px (p-12)",
  "5xl": "56px (p-14)",
  "6xl": "64px (p-16)",
} as const;

// ============================================================================
// PADDING STANDARDS
// ============================================================================
export const PADDING = {
  // Component content padding
  component: {
    compact: "p-3", // Smaller cards, dense layouts
    default: "p-4", // Standard component padding
    expanded: "p-6", // Spacious cards, large components
    loose: "p-8", // Extra spacious, premium feel
  },
  // Responsive padding patterns (mobile-first)
  responsive: {
    content: "px-4 py-4 md:px-6 md:py-6 lg:px-8 lg:py-8",
    contentCompact: "px-4 py-3 md:px-5 md:py-4 lg:px-6 lg:py-6",
    section: "px-4 py-6 md:px-6 md:py-8 lg:px-8 lg:py-10",
    sectionLarge: "px-4 py-8 md:px-6 md:py-12 lg:px-8 lg:py-16",
    horizontal: "px-4 md:px-6 lg:px-8",
    vertical: "py-6 md:py-8 lg:py-10",
  },
  // Card-specific
  card: {
    header: "px-4 py-3",
    content: "px-4 py-0",
    footer: "px-4 py-4",
  },
} as const;

// ============================================================================
// TYPOGRAPHY SCALE
// ============================================================================
export const TYPOGRAPHY = {
  sizes: {
    xs: "text-xs", // 12px - Small labels, hints
    sm: "text-sm", // 14px - Secondary text, descriptions
    base: "text-base", // 16px - Body text
    lg: "text-lg", // 18px - Large body text
    xl: "text-xl", // 20px - Subheadings
    "2xl": "text-2xl", // 24px - Small headings
    "3xl": "text-3xl", // 30px - Medium headings (dashboard titles)
    "4xl": "text-4xl", // 36px - Large headings (page titles)
    "5xl": "text-5xl", // 48px - Hero headings (landing pages)
  },
  weights: {
    normal: "font-normal", // 400 - Body text
    medium: "font-medium", // 500 - Secondary text, nav items
    semibold: "font-semibold", // 600 - Strong emphasis, buttons
    bold: "font-bold", // 700 - Headings, hero text
    black: "font-black", // 900 - Maximum emphasis
  },
  lineHeight: {
    tight: "leading-tight", // 1.25
    snug: "leading-snug", // 1.375
    normal: "leading-normal", // 1.5
    relaxed: "leading-relaxed", // 1.625
    loose: "leading-loose", // 2
  },
} as const;

// Semantic typography for consistent usage
export const TYPOGRAPHY_SEMANTIC = {
  // Heading hierarchy
  heading: {
    h1: `${TYPOGRAPHY.sizes["5xl"]} ${TYPOGRAPHY.weights.bold} ${TYPOGRAPHY.lineHeight.tight}`, // Hero, large pages
    h2: `${TYPOGRAPHY.sizes["4xl"]} ${TYPOGRAPHY.weights.bold} ${TYPOGRAPHY.lineHeight.snug}`, // Page titles
    h3: `${TYPOGRAPHY.sizes["3xl"]} ${TYPOGRAPHY.weights.bold} ${TYPOGRAPHY.lineHeight.snug}`, // Section headings
    h4: `${TYPOGRAPHY.sizes["2xl"]} ${TYPOGRAPHY.weights.bold} ${TYPOGRAPHY.lineHeight.snug}`, // Subsection headings
    h5: `${TYPOGRAPHY.sizes.xl} ${TYPOGRAPHY.weights.semibold} ${TYPOGRAPHY.lineHeight.snug}`, // Card titles
  },
  // Body text
  body: {
    default: `${TYPOGRAPHY.sizes.base} ${TYPOGRAPHY.weights.normal} ${TYPOGRAPHY.lineHeight.normal}`,
    secondary: `${TYPOGRAPHY.sizes.sm} ${TYPOGRAPHY.weights.normal} ${TYPOGRAPHY.lineHeight.normal}`,
    small: `${TYPOGRAPHY.sizes.xs} ${TYPOGRAPHY.weights.normal} ${TYPOGRAPHY.lineHeight.normal}`,
  },
  // Buttons and interactive
  button: {
    default: `${TYPOGRAPHY.sizes.sm} ${TYPOGRAPHY.weights.semibold}`,
    large: `${TYPOGRAPHY.sizes.base} ${TYPOGRAPHY.weights.semibold}`,
    small: `${TYPOGRAPHY.sizes.xs} ${TYPOGRAPHY.weights.semibold}`,
  },
  // Labels and captions
  label: {
    default: `${TYPOGRAPHY.sizes.sm} ${TYPOGRAPHY.weights.medium}`,
    small: `${TYPOGRAPHY.sizes.xs} ${TYPOGRAPHY.weights.medium}`,
  },
  // Special emphasis
  stat: `${TYPOGRAPHY.sizes["2xl"]} ${TYPOGRAPHY.weights.bold}`, // Stats values
  statLarge: `${TYPOGRAPHY.sizes["4xl"]} ${TYPOGRAPHY.weights.bold}`, // Large stat (e.g., balance)
} as const;

// ============================================================================
// SPACING PATTERNS
// ============================================================================
export const GAPS = {
  tight: "gap-1", // 4px
  compact: "gap-2", // 8px
  default: "gap-3", // 12px
  standard: "gap-4", // 16px
  generous: "gap-6", // 24px
  large: "gap-8", // 32px
} as const;

export const MARGINS = {
  tight: {
    x: "mx-1",
    y: "my-1",
  },
  compact: {
    x: "mx-2",
    y: "my-2",
  },
  default: {
    x: "mx-3",
    y: "my-3",
  },
  standard: {
    x: "mx-4",
    y: "my-4",
  },
  generous: {
    x: "mx-6",
    y: "my-6",
  },
  large: {
    x: "mx-8",
    y: "my-8",
  },
} as const;

export const VERTICAL_SPACING = {
  compact: "space-y-2", // 8px
  default: "space-y-3", // 12px
  standard: "space-y-4", // 16px
  generous: "space-y-6", // 24px
  large: "space-y-8", // 32px
} as const;

// ============================================================================
// BORDER RADIUS
// ============================================================================
export const BORDER_RADIUS = {
  sm: "rounded-md", // Small elements (inputs, small buttons)
  md: "rounded-lg", // Standard elements (cards, icons)
  lg: "rounded-xl", // Large elements (large cards, sections)
  xl: "rounded-2xl", // Extra large (page sections)
  full: "rounded-full", // Circular (avatars, badges)
} as const;

// ============================================================================
// COMPONENT-SPECIFIC STANDARDS
// ============================================================================
export const COMPONENTS = {
  // Button sizing
  button: {
    heights: {
      xs: "h-6",
      sm: "h-7",
      md: "h-8",
      lg: "h-9",
      xl: "h-10",
    },
    padding: {
      xs: "px-2",
      sm: "px-2.5",
      md: "px-3",
      lg: "px-4",
      xl: "px-5",
    },
  },
  // Input sizing
  input: {
    default: "h-8 px-2.5 py-1",
    sm: "h-7 px-2.5 py-0.5",
    lg: "h-10 px-3 py-2",
  },
  // Card standards
  card: {
    default: `rounded-xl bg-card py-4 px-4`,
    compact: `rounded-xl bg-card py-3 px-3`,
    withPadding: `rounded-xl bg-card p-6`,
  },
  // Stats card
  stat: {
    container: `${PADDING.card.header} border-b border-border/50`,
    value: `${TYPOGRAPHY_SEMANTIC.stat}`,
    label: `${TYPOGRAPHY.sizes.sm} ${TYPOGRAPHY.weights.normal} text-muted-foreground`,
  },
  // Dashboard heading
  dashboardHeading: {
    title: `${TYPOGRAPHY_SEMANTIC.heading.h3}`,
    description: `${TYPOGRAPHY.sizes.sm} ${TYPOGRAPHY.weights.normal} text-muted-foreground mt-1`,
  },
} as const;

// ============================================================================
// LAYOUT CONSTANTS
// ============================================================================
export const LAYOUT = {
  // Standard section vertical spacing
  section: {
    compact: "py-6 md:py-8",
    default: "py-8 md:py-12",
    large: "py-12 md:py-16",
    extraLarge: "py-16 md:py-24",
  },
  // Content max-width
  maxWidth: {
    container: "max-w-7xl",
    content: "max-w-4xl",
    narrow: "max-w-2xl",
  },
} as const;

// ============================================================================
// COLOR UTILITIES (for reference, actual colors in CSS variables)
// ============================================================================
export const COLOR_SEMANTIC = {
  text: {
    primary: "text-foreground",
    secondary: "text-muted-foreground",
    inverse: "text-background",
  },
  bg: {
    primary: "bg-primary",
    secondary: "bg-secondary",
    muted: "bg-muted",
    card: "bg-card",
  },
} as const;

// ============================================================================
// TRANSITIONS & ANIMATIONS
// ============================================================================
export const TRANSITIONS = {
  fast: "transition-all duration-150",
  normal: "transition-all duration-300",
  slow: "transition-all duration-500",
} as const;

// ============================================================================
// SHADOW STANDARDS (Tailwind defaults)
// ============================================================================
export const SHADOWS = {
  none: "shadow-none",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl",
} as const;

export default {
  SPACING,
  SPACING_CLASSES,
  PADDING,
  TYPOGRAPHY,
  TYPOGRAPHY_SEMANTIC,
  GAPS,
  MARGINS,
  VERTICAL_SPACING,
  BORDER_RADIUS,
  COMPONENTS,
  LAYOUT,
  COLOR_SEMANTIC,
  TRANSITIONS,
  SHADOWS,
};
