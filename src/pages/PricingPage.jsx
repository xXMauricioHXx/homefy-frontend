import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";
import PricingSection from "../components/pricing/PricingSection";

function PricingPage() {
  return (
    <div className="pricing-page">
      <Navbar />
      <main style={{ paddingTop: "80px" }}>
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}

export default PricingPage;
