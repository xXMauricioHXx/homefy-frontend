import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import PricingCard from "./PricingCard";
import PricingHeader from "./PricingHeader";
import "./Pricing.css";

function PricingSection() {
  const navigate = useNavigate();
  const { user, userData } = useAuth();

  const handleCtaClick = (planId) => {
    if (planId === "gratuito") {
      navigate("/app");
      return;
    }

    if (user) {
      // Logic for subscription if needed, or just redirect to contact/payment
      // For now, let's say it goes to dashboard or contact?
      // Usually would open Stripe or a payment modal.
      console.log("Redirecting to subscription logic");
    } else {
      navigate("/login");
    }
  };

  const plans = [
    {
      name: "Plano Gratuito",
      price: "R$ 0,00",
      features: [
        "1 PDF por mês",
        "Até 10 imagens por PDF",
        "Geração instantânea",
        "Layout profissional",
        "Download em PDF",
      ],
      ctaText: "Começar grátis",
      colorGradient: "green",
      isOutlineCta: true,
      planId: "gratuito",
    },
    {
      name: "Plano Básico",
      price: "R$ 29,90",
      features: [
        "5 PDFs por mês",
        "Até 10 imagens por PDF",
        "Geração instantânea",
        "Layout profissional",
        "Download em PDF",
      ],
      ctaText: "Assinar plano",
      colorGradient: "blue",
      planId: "basico",
    },
    {
      name: "Plano Premium",
      price: "R$ 59,90",
      features: [
        "10 PDFs por mês",
        "Imagens ilimitadas",
        "Geração instantânea",
        "Layout profissional",
        "Download em PDF",
      ],
      ctaText: "Assinar plano",
      isPopular: true,
      colorGradient: "purple",
      planId: "premium",
    },
    {
      name: "Plano Premium +",
      price: "R$ 119,90",
      features: [
        "30 PDFs por mês",
        "Até 10 imagens por PDF",
        "Geração instantânea",
        "Layout profissional",
        "Download em PDF",
      ],
      ctaText: "Assinar plano",
      colorGradient: "orange",
      planId: "premium_plus",
    },
  ];

  const currentPlanId = userData?.plan?.name || null;

  return (
    <section className="pricing-section">
      <div className="pricing-container">
        <PricingHeader />

        <div className="pricing-grid">
          {plans.map((plan) => (
            <PricingCard
              key={plan.name}
              {...plan}
              isCurrentPlan={currentPlanId === plan.planId}
              onCtaClick={() => handleCtaClick(plan.planId)}
            />
          ))}
        </div>

        <div className="pricing-footer-cta">
          <h2 className="pricing-footer-title">
            Comece gratuitamente e transforme seus anúncios em PDFs
            profissionais hoje mesmo
          </h2>
          <button
            className="pricing-cta pricing-cta-primary"
            style={{ maxWidth: "280px" }}
            onClick={() => navigate(user ? "/app" : "/login")}
          >
            Começar grátis
          </button>
        </div>
      </div>
    </section>
  );
}

export default PricingSection;
