import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import PricingCard from "./PricingCard";
import PricingHeader from "./PricingHeader";
import "./Pricing.css";
import { createCheckoutSession } from "../../services/api";
import { savePostAuthRedirect } from "../../utils/postAuthRedirect";

function PricingSection() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, userData } = useAuth();
  const highlightedPlanId = searchParams.get("planId");

  const handleCtaClick = async (planId) => {
    if (planId === "gratuito") {
      navigate("/app");
      return;
    }

    if (user) {
      const token = await user.getIdToken();
      const checkoutSession = await createCheckoutSession(planId, token);

      if (checkoutSession.url) {
        window.location.href = checkoutSession.url;
      } else {
        console.error("Failed to get Stripe Checkout URL:", checkoutSession);
      }
    } else {
      savePostAuthRedirect({ redirectTo: "/pricing", planId });
      navigate(`/login?redirectTo=/pricing&planId=${planId}`);
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
        "10 PDFs por mês",
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
        "20 PDFs por mês",
        "Até 10 imagens por PDF",
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
        "40 PDFs por mês",
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
              isHighlighted={highlightedPlanId === plan.planId}
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
