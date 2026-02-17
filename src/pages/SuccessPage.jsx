import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { fetchUserById } from "../services/api";
import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircularProgress from "@mui/material/CircularProgress";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import "./SuccessPage.css";

const SuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user: currentUser, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [planActive, setPlanActive] = useState(false);
  const [timeoutReached, setTimeoutReached] = useState(false);
  const [userData, setUserData] = useState(null);

  // Constants
  const POLLING_INTERVAL = 2000; // 2 seconds
  const MAX_POLLING_TIME = 30000; // 30 seconds

  useEffect(() => {
    // Log session_id for debugging or tracking
    const sessionId = searchParams.get("session_id");
    if (sessionId) {
      console.log("Checkout success for session:", sessionId);
    }
  }, [searchParams]);

  useEffect(() => {
    // Wait for auth to initialize
    if (authLoading) return;

    // State 1: User not logged in
    if (!currentUser) {
      return;
    }

    let isMounted = true;
    let pollingTimer;
    let timeoutTimer;

    const checkPlanStatus = async () => {
      if (!isMounted) return;

      try {
        const token = await currentUser.getIdToken();
        const user = await fetchUserById(token);

        if (
          user &&
          user.plan &&
          user.plan.status === "active" &&
          user.plan.name !== "gratuito"
        ) {
          setUserData(user);
          setPlanActive(true);
          setLoading(false);
          // Stop polling on success
          if (pollingTimer) clearInterval(pollingTimer);
          if (timeoutTimer) clearTimeout(timeoutTimer);
        }
      } catch (error) {
        console.error("Error checking plan status:", error);
      }
    };

    // Initial check
    checkPlanStatus();

    // Start polling
    pollingTimer = setInterval(checkPlanStatus, POLLING_INTERVAL);

    // Set timeout
    timeoutTimer = setTimeout(() => {
      if (isMounted && !planActive) {
        setLoading(false);
        setTimeoutReached(true);
        if (pollingTimer) clearInterval(pollingTimer);
      }
    }, MAX_POLLING_TIME);

    return () => {
      isMounted = false;
      if (pollingTimer) clearInterval(pollingTimer);
      if (timeoutTimer) clearTimeout(timeoutTimer);
    };
  }, [currentUser, authLoading, planActive]); // planActive in dependency array to stop polling if it becomes true

  // Helper to format date
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString();
  };

  // Render content based on state
  const renderContent = () => {
    // State 0: Auth Loading
    if (authLoading) {
      return (
        <div className="success-icon-wrapper loading">
          <CircularProgress
            size={60}
            sx={{ color: "var(--color-accent-primary)" }}
          />
        </div>
      );
    }

    // State 1: Not logged in
    if (!currentUser) {
      return (
        <div className="success-icon-wrapper warning">
          <ErrorOutlineIcon
            sx={{ fontSize: 60, color: "var(--color-warning)" }}
          />
        </div>
      );
    }

    // State 2: Loading / Polling
    if (loading && !planActive && !timeoutReached) {
      return (
        <div className="success-icon-wrapper loading">
          <CircularProgress
            size={60}
            sx={{ color: "var(--color-accent-primary)" }}
          />
        </div>
      );
    }

    // State 4: Timeout
    if (timeoutReached && !planActive) {
      return (
        <div className="success-icon-wrapper warning">
          <AccessTimeIcon
            sx={{ fontSize: 60, color: "var(--color-warning)" }}
          />
        </div>
      );
    }

    // State 3: Success
    return (
      <div className="success-icon-wrapper">
        <CheckCircleIcon sx={{ fontSize: 60, color: "var(--color-success)" }} />
      </div>
    );
  };

  const renderTextMap = () => {
    if (authLoading) {
      return {
        title: "Carregando...",
        message: "Verificando suas credenciais.",
        primaryBtn: null,
      };
    }

    if (!currentUser) {
      return {
        title: "Faça login para ativar seu plano",
        message:
          "Detectamos que você não está logado. Por favor, entre na sua conta para vincularmos a assinatura.",
        primaryBtn: "Ir para Login",
        primaryAction: () => navigate("/login"),
      };
    }

    if (loading && !planActive && !timeoutReached) {
      return {
        title: "Estamos ativando seu plano...",
        message:
          "Pagamento confirmado! Aguarde um momento enquanto atualizamos sua conta. Isso pode levar alguns segundos.",
        primaryBtn: null,
      };
    }

    if (timeoutReached && !planActive) {
      return {
        title: "Pagamento confirmado",
        message:
          "Seu pagamento foi recebido, mas ainda não recebemos a confirmação final da ativação. Se o plano não atualizar em alguns minutos, entre em contato com o suporte.",
        primaryBtn: "Ir para o Dashboard",
        primaryAction: () => navigate("/app"),
        secondaryBtn: "Atualizar página",
        secondaryAction: () => window.location.reload(),
      };
    }

    // Success
    return {
      title: "Plano ativado!",
      message: "Tudo pronto! Seu plano já está disponível para uso.",
      primaryBtn: "Gerar PDF agora",
      primaryAction: () => navigate("/app"), // Directed to dashboard as /app/new does not exist yet
      secondaryBtn: "Ir para o Dashboard",
      secondaryAction: () => navigate("/app"),
    };
  };

  const content = renderTextMap();

  return (
    <div className="success-page">
      <Navbar />
      <div className="success-content">
        <div className="success-card">
          {renderContent()}

          <h1 className="success-title">{content.title}</h1>
          <p className="success-message">{content.message}</p>

          {planActive && userData && (
            <div className="plan-details-card">
              <div className="plan-detail-row">
                <span className="plan-detail-label">Plano Ativo</span>
                <span className="plan-detail-value">{userData.plan?.name}</span>
              </div>
              <div className="plan-detail-row">
                <span className="plan-detail-label">Créditos</span>
                <span className="plan-detail-value">
                  {userData.plan?.credits}
                </span>
              </div>
              <div className="plan-detail-row">
                <span className="plan-detail-label">Validade</span>
                <span className="plan-detail-value">
                  {formatDate(userData.plan?.expiresAt)}
                </span>
              </div>
            </div>
          )}

          <div className="action-buttons">
            {content.primaryBtn && (
              <button
                className="success-btn-primary"
                onClick={content.primaryAction}
              >
                {content.primaryBtn}
              </button>
            )}
            {content.secondaryBtn && (
              <button
                className="success-btn-secondary"
                onClick={content.secondaryAction}
              >
                {content.secondaryBtn}
              </button>
            )}
            {!content.primaryBtn && !content.secondaryBtn && (
              <p
                className="loading-hint"
                style={{ fontSize: "0.9rem", color: "var(--color-text-muted)" }}
              >
                Não feche esta página
              </p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SuccessPage;
