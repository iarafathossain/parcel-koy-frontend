import { AnimatedSection } from "./animated-section";
import {
  AdvantagesSection,
  CoverageSection,
  HowItWorksSection,
  ImpactSection,
  LandingCtaSection,
  MerchantPortalSection,
  PricingSection,
  ServicesSection,
} from "./content-sections";
import { CredentialsSection } from "./credential";
import { faqs } from "./data";
import { FaqSection } from "./faq-";
import { HeroSection } from "./hero";
import { Partnership } from "./partnership";
import { TestimonialsSection } from "./testimonials";

const LandingPage = () => {
  return (
    <div className="bg-background">
      <HeroSection />
      <AnimatedSection>
        <Partnership title="Brands Love To Work With Us" />
      </AnimatedSection>
      <HowItWorksSection />
      <ServicesSection />
      <ImpactSection />
      <AdvantagesSection />
      <CoverageSection />
      <PricingSection />
      <TestimonialsSection />
      <AnimatedSection className="bg-muted/30">
        <FaqSection title="Frequently Asked Questions" faqs={faqs} />
      </AnimatedSection>
      <MerchantPortalSection />
      <AnimatedSection>
        <CredentialsSection />
      </AnimatedSection>
      <LandingCtaSection />
    </div>
  );
};

export default LandingPage;
