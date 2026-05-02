import type { ComponentType } from "react";

export type LandingFaq = {
  question: string;
  answer: string;
};

export type LandingStep = {
  step: string;
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
};

export type LandingServiceItem = {
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  color: string;
};

export type LandingValueProp = {
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
};

export type LandingStat = {
  label: string;
  value: number;
  suffix: string;
  icon: ComponentType<{ className?: string }>;
};

export type LandingTestimonial = {
  name: string;
  role: string;
  rating: number;
  text: string;
  avatar: string;
  bg: string;
};

export type LandingPricingPlan = {
  name: string;
  price: string;
  priceNote: string;
  description: string;
  features: string[];
  cta: string;
  highlight: boolean;
};

export type LandingCoverageZone = {
  zone: string;
  time: string;
  color: string;
};

export type LandingMerchantFeature = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  desc: string;
};
