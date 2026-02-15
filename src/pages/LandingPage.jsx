import Navbar from "../components/landing/Navbar";
import HeroSection from "../components/landing/HeroSection";
import ProblemSection from "../components/landing/ProblemSection";
import SolutionSection from "../components/landing/SolutionSection";
import StepsSection from "../components/landing/StepsSection";
import BenefitsSection from "../components/landing/BenefitsSection";
import ComparisonSection from "../components/landing/ComparisonSection";
import ExampleSection from "../components/landing/ExampleSection";
import CTASection from "../components/landing/CTASection";
import Footer from "../components/landing/Footer";
import "../components/landing/LandingPage.css";

function LandingPage() {
  return (
    <div className="landing-page">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <StepsSection />
      <BenefitsSection />
      <ComparisonSection />
      <ExampleSection />
      <CTASection />
      <Footer />
    </div>
  );
}

export default LandingPage;
