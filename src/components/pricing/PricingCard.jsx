import PropTypes from "prop-types";
import "./Pricing.css";

function PricingCard({
  name,
  price,
  features,
  ctaText,
  isPopular,

  isCurrentPlan,
  onCtaClick,
  isOutlineCta,
}) {
  return (
    <div className={`pricing-card ${isPopular ? "highlighted" : ""}`}>
      {isPopular && <div className="pricing-card-badge">Mais Popular</div>}

      <div className="pricing-plan-header">
        <h3 className="pricing-plan-name">{name}</h3>
        <div className="pricing-plan-price">
          <span className={`pricing-amount `}>{price}</span>
          <span className="pricing-period">/mês</span>
        </div>
      </div>

      <ul className="pricing-features">
        {features.map((feature, index) => (
          <li key={index} className="pricing-feature">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.6667 5L7.50004 14.1667L3.33337 10"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button
        className={`pricing-cta ${isOutlineCta ? "pricing-cta-outline" : "pricing-cta-primary"}`}
        onClick={onCtaClick}
        disabled={isCurrentPlan}
      >
        {isCurrentPlan ? "Plano atual" : ctaText}
      </button>

      {isCurrentPlan && (
        <div className="pricing-current-badge">Seu plano ativo</div>
      )}
    </div>
  );
}

PricingCard.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  features: PropTypes.arrayOf(PropTypes.string).isRequired,
  ctaText: PropTypes.string.isRequired,
  isPopular: PropTypes.bool,
  colorGradient: PropTypes.string.isRequired,
  isCurrentPlan: PropTypes.bool,
  onCtaClick: PropTypes.func,
  isOutlineCta: PropTypes.bool,
};

export default PricingCard;
