import { useAuth } from "../contexts/AuthContext";
import Header from "../components/Header";
import "./SubscriptionPage.css";

function SubscriptionPage() {
  const { userData } = useAuth();

  const getPlanDetails = (plan) => {
    const maxImages = parseInt(import.meta.env.VITE_MAX_IMAGES_PER_PDF || "10");
    const plans = {
      gratuito: {
        name: "Plano Gratuito",
        price: "R$ 0,00",
        pdfs: 1,
        images: maxImages,
        color: "from-green-500 to-emerald-500",
      },
      basico: {
        name: "Plano Básico",
        price: "R$ 29,90",
        pdfs: 10,
        images: maxImages,
        color: "from-blue-500 to-cyan-500",
      },
      premium: {
        name: "Plano Premium",
        price: "R$ 59,90",
        pdfs: 20,
        images: maxImages,
        color: "from-purple-500 to-pink-500",
      },
      premium_plus: {
        name: "Plano Premium +",
        price: "R$ 119,90",
        pdfs: 40,
        images: maxImages,
        color: "from-orange-500 to-red-500",
      },
    };
    return plans[plan] || plans.gratuito;
  };

  const currentPlan = userData?.plan?.name
    ? getPlanDetails(userData?.plan?.name)
    : null;

  return (
    <div className="subscription-container">
      <Header />

      <main className="subscription-main">
        <div className="subscription-content">
          {/* Page Header */}
          <div className="subscription-page-header">
            <h1 className="subscription-page-title">Meu Plano</h1>
            <p className="subscription-page-subtitle">
              Gerencie sua assinatura e créditos
            </p>
          </div>

          {userData && currentPlan && (
            <>
              {/* Current Plan Card */}
              <div className="subscription-plan-card">
                <div className="subscription-plan-badge">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <h2 className="subscription-plan-name">{currentPlan.name}</h2>
                <div className="subscription-plan-price">
                  <span className="subscription-plan-amount">
                    {currentPlan.price}
                  </span>
                  <span className="subscription-plan-period">/mês</span>
                </div>
                <div className="subscription-plan-features">
                  <div className="subscription-plan-feature">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M16.6667 5L7.50004 14.1667L3.33337 10"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>{currentPlan.pdfs} PDFs por mês</span>
                  </div>
                  <div className="subscription-plan-feature">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M16.6667 5L7.50004 14.1667L3.33337 10"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>{currentPlan.images} imagens por PDF</span>
                  </div>
                  <div className="subscription-plan-feature">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M16.6667 5L7.50004 14.1667L3.33337 10"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>Remoção de marca d'água</span>
                  </div>
                </div>
              </div>

              {/* Credits and Expiration Info */}
              <div className="subscription-info-grid">
                <div className="subscription-info-card">
                  <div className="subscription-info-icon credits">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M12 6V12L16 14"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div className="subscription-info-content">
                    <h3 className="subscription-info-title">
                      Créditos Disponíveis
                    </h3>
                    <p className="subscription-info-value">
                      {userData?.plan?.credits || 0} créditos
                    </p>
                    <p className="subscription-info-description">
                      Use seus créditos para gerar PDFs personalizados
                    </p>
                  </div>
                </div>

                <div className="subscription-info-card">
                  <div className="subscription-info-icon expiration">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <rect
                        x="3"
                        y="4"
                        width="18"
                        height="18"
                        rx="2"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M16 2V6M8 2V6M3 10H21"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div className="subscription-info-content">
                    <h3 className="subscription-info-title">
                      Renovação do Plano
                    </h3>
                    <p className="subscription-info-value">
                      {userData?.plan?.expiresAt
                        ? new Date(userData.plan.expiresAt).toLocaleDateString(
                            "pt-BR",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            },
                          )
                        : "Sem renovação"}
                    </p>
                    <p className="subscription-info-description">
                      {userData?.plan?.expiresAt
                        ? "Seus créditos serão renovados nesta data"
                        : "Faça upgrade para renovação mensal de créditos"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Usage Stats */}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default SubscriptionPage;
