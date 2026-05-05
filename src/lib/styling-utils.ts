/**
 * Styling Utilities
 * Helper functions for consistent styling patterns
 */

import {
  COMPONENTS,
  GAPS,
  PADDING,
  TYPOGRAPHY_SEMANTIC,
  VERTICAL_SPACING,
} from "@/lib/design-system";
import { cn } from "@/lib/utils";

// ============================================================================
// HEADING UTILITIES
// ============================================================================
export const headingClasses = {
  h1: TYPOGRAPHY_SEMANTIC.heading.h1,
  h2: TYPOGRAPHY_SEMANTIC.heading.h2,
  h3: TYPOGRAPHY_SEMANTIC.heading.h3,
  h4: TYPOGRAPHY_SEMANTIC.heading.h4,
  h5: TYPOGRAPHY_SEMANTIC.heading.h5,
};

// ============================================================================
// PADDING UTILITIES
// ============================================================================
export const getPaddingClass = (
  variant: keyof typeof PADDING.component,
): string => {
  return PADDING.component[variant];
};

export const getResponsivePadding = (
  variant: keyof typeof PADDING.responsive,
): string => {
  return PADDING.responsive[variant];
};

// ============================================================================
// SPACING UTILITIES
// ============================================================================
export const getGapClass = (variant: keyof typeof GAPS): string => {
  return GAPS[variant];
};

export const getVerticalSpacingClass = (
  variant: keyof typeof VERTICAL_SPACING,
): string => {
  return VERTICAL_SPACING[variant];
};

// ============================================================================
// CARD UTILITIES
// ============================================================================
export const getCardClass = (
  variant: "default" | "compact" | "withPadding" = "default",
): string => {
  return COMPONENTS.card[variant];
};

// ============================================================================
// STAT UTILITIES
// ============================================================================
export const getStatContainerClass = (): string => {
  return COMPONENTS.stat.container;
};

export const getStatValueClass = (): string => {
  return COMPONENTS.stat.value;
};

export const getStatLabelClass = (): string => {
  return COMPONENTS.stat.label;
};

// ============================================================================
// DASHBOARD HEADING UTILITIES
// ============================================================================
export const getDashboardHeadingClass = (): string => {
  return COMPONENTS.dashboardHeading.title;
};

export const getDashboardHeadingDescriptionClass = (): string => {
  return COMPONENTS.dashboardHeading.description;
};

// ============================================================================
// CONTAINER UTILITIES
// ============================================================================
export const getContentContainerClass = (
  responsive: boolean = true,
): string => {
  if (responsive) {
    return getResponsivePadding("content");
  }
  return PADDING.component.default;
};

export const getSectionContainerClass = (
  size: "compact" | "default" | "large" | "extraLarge" = "default",
): string => {
  const paddingMap = {
    compact: "px-4 py-6 md:px-6 md:py-8",
    default: "px-4 py-8 md:px-6 md:py-12",
    large: "px-4 py-12 md:px-6 md:py-16",
    extraLarge: "px-4 py-16 md:px-6 md:py-24",
  };
  return paddingMap[size];
};

// ============================================================================
// FORM FIELD UTILITIES
// ============================================================================
export const getFieldGroupClass = (
  orientation: "vertical" | "horizontal" = "vertical",
): string => {
  if (orientation === "vertical") {
    return `flex flex-col ${GAPS.generous}`;
  }
  return `flex flex-row items-start ${GAPS.standard}`;
};

// ============================================================================
// COMBINED UTILITIES
// ============================================================================
export const cardWithContentClass = (
  cardVariant: "default" | "compact" | "withPadding" = "default",
  additionalClasses: string = "",
): string => {
  return cn(getCardClass(cardVariant), additionalClasses);
};

export const headingWithDescriptionClass = (
  level: "h2" | "h3" | "h4" = "h2",
  additionalClasses: string = "",
): string => {
  return cn(headingClasses[level], additionalClasses);
};

export const responsiveSectionClass = (
  size: "compact" | "default" | "large" | "extraLarge" = "default",
  maxWidth: boolean = true,
  additionalClasses: string = "",
): string => {
  const section = getSectionContainerClass(size);
  const maxW = maxWidth ? "max-w-7xl mx-auto w-full" : "w-full";
  return cn(section, maxW, additionalClasses);
};

export default {
  headingClasses,
  getPaddingClass,
  getResponsivePadding,
  getGapClass,
  getVerticalSpacingClass,
  getCardClass,
  getStatContainerClass,
  getStatValueClass,
  getStatLabelClass,
  getDashboardHeadingClass,
  getDashboardHeadingDescriptionClass,
  getContentContainerClass,
  getSectionContainerClass,
  getFieldGroupClass,
  cardWithContentClass,
  headingWithDescriptionClass,
  responsiveSectionClass,
};
