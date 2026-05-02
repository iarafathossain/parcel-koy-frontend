import {
  BarChart3,
  Bike,
  Building2,
  ClipboardCheck,
  Coins,
  Headset,
  MapPin,
  Package,
  PackageCheck,
  Search,
  ShieldCheck,
  Truck,
  Users,
  Wallet,
} from "lucide-react";

import { semanticTones } from "@/components/shared/semantic-tones";

import type {
  LandingCoverageZone,
  LandingFaq,
  LandingMerchantFeature,
  LandingPricingPlan,
  LandingServiceItem,
  LandingStat,
  LandingStep,
  LandingTestimonial,
  LandingValueProp,
} from "./types";

export const faqs: LandingFaq[] = [
  {
    question: "Why choose ParcelKoy Courier?",
    answer:
      "ParcelKoy combines fast pickup, reliable delivery, transparent tracking, and quick cash settlement for ecommerce growth.",
  },
  {
    question: "What coverage area does ParcelKoy provide?",
    answer:
      "We provide major city coverage with expanding suburban and district routes through hub-based operations.",
  },
  {
    question: "What services does ParcelKoy offer?",
    answer:
      "Ecommerce delivery, pick and drop, secure packaging, warehousing support, and COD management.",
  },
  {
    question: "How are delivery charges calculated?",
    answer:
      "Charges are based on destination zone, package size/weight, and service speed. You can view exact rates on the pricing page.",
  },
  {
    question: "How quickly will my merchant account be activated?",
    answer:
      "Merchant accounts are activated within 24 hours of registration. Our team verifies your details and sets up your dashboard.",
  },
  {
    question: "What payment methods are supported for COD settlement?",
    answer:
      "We support bKash, Nagad, Rocket, and direct bank transfer. You can choose your preferred settlement method from the dashboard.",
  },
];

export const serviceItems: LandingServiceItem[] = [
  {
    title: "Ecommerce Delivery",
    description:
      "Fast doorstep delivery with COD collection so your customers receive orders on time, every time.",
    icon: Truck,
    color: semanticTones.info.soft,
  },
  {
    title: "Pick and Drop",
    description:
      "Scheduled pickup and drop for parcels and documents with real-time status updates.",
    icon: Bike,
    color: semanticTones.warning.soft,
  },
  {
    title: "Packaging",
    description:
      "Safe and professional packaging for fragile shipments with industry-grade materials.",
    icon: Package,
    color: semanticTones.secondary.soft,
  },
  {
    title: "Warehousing",
    description:
      "Short-term storage and dispatch support for merchants scaling their operations.",
    icon: Building2,
    color: "bg-secondary/10 text-secondary",
  },
];

export const valueProps: LandingValueProp[] = [
  {
    title: "Daily Pickup, No Limits",
    description:
      "ParcelKoy supports unlimited daily pickups for growing merchants — no cap, no delays.",
    icon: Truck,
  },
  {
    title: "Cash on Delivery",
    description:
      "Collect cash from customers and settle directly to you with full transparency.",
    icon: Coins,
  },
  {
    title: "Faster Payment Service",
    description:
      "Flexible payout channels through bank and mobile financial services within 24h.",
    icon: Wallet,
  },
  {
    title: "Online Management",
    description:
      "Manage parcels, status, and returns from a single intuitive dashboard anytime.",
    icon: ClipboardCheck,
  },
  {
    title: "Real-Time Tracking",
    description:
      "Every consignment gets a unique tracking ID with live updates at every milestone.",
    icon: Search,
  },
  {
    title: "24/7 Customer Service",
    description:
      "Dedicated support team to resolve issues around the clock — call, chat, or email.",
    icon: Headset,
  },
];

export const steps: LandingStep[] = [
  {
    step: "01",
    title: "Register as Merchant",
    description:
      "Sign up in minutes. Provide your business details and get your merchant dashboard activated within 24 hours.",
    icon: Users,
  },
  {
    step: "02",
    title: "Create Your Order",
    description:
      "Add parcel details, recipient information, and preferred pickup time directly from your dashboard.",
    icon: Package,
  },
  {
    step: "03",
    title: "We Pick It Up",
    description:
      "Our agent picks up your parcel at the scheduled time — no waiting, no hassle.",
    icon: Truck,
  },
  {
    step: "04",
    title: "Delivered & Settled",
    description:
      "Parcel delivered to your customer, COD collected, and payment settled to you within 24–48 hours.",
    icon: PackageCheck,
  },
];

export const stats: LandingStat[] = [
  { label: "Parcels Delivered", value: 2800000, suffix: "+", icon: Package },
  { label: "Registered Merchants", value: 300000, suffix: "+", icon: Users },
  { label: "Cities Covered", value: 64, suffix: "+", icon: MapPin },
  { label: "Delivery Agents", value: 5000, suffix: "+", icon: Bike },
];

export const testimonials: LandingTestimonial[] = [
  {
    name: "Rahim Uddin",
    role: "Owner, StyleBD",
    rating: 5,
    text: "ParcelKoy completely transformed our delivery operations. Our customers love the real-time tracking, and the COD settlement hits our account reliably. Best decision for our business.",
    avatar: "R",
    bg: semanticTones.info.solid,
  },
  {
    name: "Nasrin Akter",
    role: "Founder, Kotha Crafts",
    rating: 5,
    text: "Switched from another courier 6 months ago and never looked back. The pickup is always on time, damage rate dropped to zero, and support is actually helpful.",
    avatar: "N",
    bg: semanticTones.secondary.solid,
  },
  {
    name: "Tanvir Hossain",
    role: "CEO, TechGadgetBD",
    rating: 5,
    text: "We process 500+ orders daily. ParcelKoy handles the volume effortlessly. The dashboard gives us full visibility and the daily payout keeps our cash flow healthy.",
    avatar: "T",
    bg: semanticTones.secondary.solid,
  },
  {
    name: "Sabrina Islam",
    role: "Entrepreneur, Mela Store",
    rating: 5,
    text: "As a small business owner, I needed reliability without big costs. ParcelKoy's pricing is fair, service is great, and my repeat customers rate delivery highly.",
    avatar: "S",
    bg: semanticTones.warning.solid,
  },
  {
    name: "Kamal Hossain",
    role: "Director, FreshMart",
    rating: 5,
    text: "The warehousing service alone is worth it. We store seasonal stock with ParcelKoy and dispatch on demand. Incredibly efficient and affordable.",
    avatar: "K",
    bg: semanticTones.danger.solid,
  },
  {
    name: "Mitu Begum",
    role: "Owner, Deshi Naksha",
    rating: 5,
    text: "I was skeptical at first, but after the trial week I was sold. Pickup on time, delivery fast, payments clear. ParcelKoy is the partner every ecommerce seller needs.",
    avatar: "M",
    bg: semanticTones.success.solid,
  },
];

export const pricingPlans: LandingPricingPlan[] = [
  {
    name: "Starter",
    price: "৳59",
    priceNote: "to register",
    description: "Perfect for new merchants starting their ecommerce journey.",
    features: [
      "Up to 100 orders/month",
      "Standard delivery (3–5 days)",
      "Basic tracking",
      "COD collection",
      "Email support",
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Growth",
    price: "৳100",
    priceNote: "registration · pay per delivery",
    description: "For scaling merchants who need speed and volume.",
    features: [
      "Unlimited orders",
      "Express delivery (1–2 days)",
      "Real-time tracking",
      "COD + online payment",
      "Priority pickup",
      "24/7 dedicated support",
      "Daily payment settlement",
    ],
    cta: "Start Growing",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    priceNote: "tailored to your volume",
    description: "For large operations with custom needs and high volumes.",
    features: [
      "Volume-based pricing",
      "Same-day delivery option",
      "Dedicated account manager",
      "Warehousing & fulfillment",
      "API integration",
      "Custom SLA",
      "Branded tracking page",
    ],
    cta: "Contact Sales",
    highlight: false,
  },
];

export const coverageZones: LandingCoverageZone[] = [
  { zone: "Inside Dhaka", time: "Same Day", color: "text-secondary" },
  {
    zone: "Outside Dhaka",
    time: "24–48 Hours",
    color: semanticTones.info.soft,
  },
  {
    zone: "District Towns",
    time: "48–72 Hours",
    color: semanticTones.warning.soft,
  },
  {
    zone: "Sub-districts",
    time: "3–5 Days",
    color: semanticTones.secondary.soft,
  },
];

export const merchantFeatures: LandingMerchantFeature[] = [
  {
    icon: BarChart3,
    title: "Analytics",
    desc: "Revenue, orders & delivery performance at a glance",
  },
  {
    icon: PackageCheck,
    title: "Order Tracking",
    desc: "Live status for every consignment you've created",
  },
  {
    icon: Wallet,
    title: "Payments",
    desc: "Settlement history, pending COD & instant withdrawals",
  },
  {
    icon: ShieldCheck,
    title: "Insurance",
    desc: "Optional parcel protection for high-value shipments",
  },
];
