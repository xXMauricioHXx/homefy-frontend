import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { sendEmailVerification, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import "./VerifyEmailPage.css";

const COOLDOWN_SECONDS = 60;

function VerifyEmailPage() {
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();

  const [cooldown, setCooldown] = useState(0);
  const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', message: string }
  const [checkingVerified, setCheckingVerified] = useState(false);

  // Redirect to login if there is no user
  useEffect(() => {
    if (user === null) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  // If user is already verified (e.g. came here by mistake), redirect to app
  useEffect(() => {
    if (user?.emailVerified) {
      navigate("/app", { replace: true });
    }
  }, [user, navigate]);

  // Cooldown countdown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleResend = useCallback(async () => {
    if (cooldown > 0 || !auth.currentUser) return;
    setFeedback(null);

    try {
      await sendEmailVerification(auth.currentUser, {
        url: `${window.location.origin}/app`,
      });
      setCooldown(COOLDOWN_SECONDS);
      setFeedback({
        type: "success",
        message: `E-mail enviado! Aguarde ${COOLDOWN_SECONDS}s para reenviar.`,
      });
    } catch (err) {
      const isRateLimit =
        err.code === "auth/too-many-requests" ||
        err.message?.includes("too-many-requests");
      setFeedback({
        type: "error",
        message: isRateLimit
          ? "Muitas tentativas. Aguarde alguns minutos e tente novamente."
          : "Falha ao enviar e-mail. Tente novamente.",
      });
    }
  }, [cooldown]);

  const handleAlreadyVerified = useCallback(async () => {
    setCheckingVerified(true);
    setFeedback(null);

    try {
      await refreshUser();
      // auth.currentUser reflects the reloaded state
      if (auth.currentUser?.emailVerified) {
        navigate("/app", { replace: true });
      } else {
        setFeedback({
          type: "error",
          message:
            "E-mail ainda não verificado. Verifique sua caixa de entrada.",
        });
      }
    } catch {
      setFeedback({
        type: "error",
        message: "Não foi possível verificar o estado. Tente novamente.",
      });
    } finally {
      setCheckingVerified(false);
    }
  }, [refreshUser, navigate]);

  const handleSignOut = useCallback(async () => {
    await signOut(auth);
    navigate("/login", { replace: true });
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="verify-email-container">
      {/* Animated background */}
      <div className="verify-email-background">
        <div className="gradient-orb orb-1" />
        <div className="gradient-orb orb-2" />
        <div className="gradient-orb orb-3" />
      </div>

      <div className="verify-email-card">
        {/* Envelope icon */}
        <div className="verify-email-icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M22 7l-10 7L2 7" />
          </svg>
        </div>

        {/* Logo */}
        <div style={{ marginBottom: "var(--spacing-lg)" }}>
          <img src="/logo.png" alt="Logo" style={{ height: "36px" }} />
        </div>

        <h1 className="verify-email-title">Verifique seu e-mail</h1>

        <p className="verify-email-subtitle">
          Enviamos um link de verificação para:
        </p>
        <p className="verify-email-address">{user.email}</p>

        <div className="verify-email-actions">
          {/* Already verified */}
          <button
            className="verify-btn-primary"
            onClick={handleAlreadyVerified}
            disabled={checkingVerified}
            id="verify-already-verified-btn"
          >
            {checkingVerified ? "Verificando..." : "Já verifiquei ✓"}
          </button>

          {/* Resend */}
          <button
            className="verify-btn-secondary"
            onClick={handleResend}
            disabled={cooldown > 0}
            id="verify-resend-btn"
          >
            {cooldown > 0
              ? `Reenviar e-mail (${cooldown}s)`
              : "Reenviar e-mail"}
          </button>
        </div>

        {/* Inline feedback */}
        {feedback && (
          <div className={`verify-feedback ${feedback.type}`}>
            {feedback.message}
          </div>
        )}

        {/* Footer */}
        <div
          className="verify-email-footer"
          style={{ marginTop: "var(--spacing-lg)" }}
        >
          <button
            className="verify-logout-btn"
            onClick={handleSignOut}
            id="verify-signout-btn"
          >
            Sair da conta
          </button>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmailPage;
