import Hero from './Hero';
import RevealSection from './RevealSection';
import BenefitsSection from './BenefitSection';
import CTASection from './CTASection';

export default function DiagnosticLanding() {
  return (
    <div className="diagnostic-page min-h-screen bg-[#070d16] text-white">
      <Hero />
      <RevealSection />
      <BenefitsSection />
      <CTASection />
    </div>
  );
}