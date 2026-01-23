import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { fetchPropertyData } from "../services/api";
import RecentPdfsSection from "../components/RecentPdfsSection";
import "./HomePage.css";

function HomePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
  };

  const handleGeneratePDF = async () => {
    // Validate URL
    if (!url.trim()) {
      setError("Por favor, insira uma URL válida");
      return;
    }

    // Basic URL validation
    try {
      new URL(url);
    } catch {
      setError(
        "URL inválida. Por favor, insira uma URL completa (ex: https://exemplo.com)",
      );
      return;
    }

    setError("");
    setLoading(true);

    try {
      // Get Firebase authentication token
      const token = await user.getIdToken();

      // Call API with token
      const response = await fetchPropertyData(url, token);

      // Navigate to PDF preview page with only PDF ID in URL
      navigate(`/pdf-preview/${response.pdfId}`);
    } catch (err) {
      setError("Erro ao gerar PDF. Por favor, tente novamente.");
      console.error("Error generating PDF:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      {/* Top Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-content">
          <div className="navbar-logo">
            <span className="logo-text gradient-text">Homefy</span>
          </div>

          <div className="navbar-actions">
            {user && (
              <>
                <div className="user-badge">
                  {user.photoURL && (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || "User"}
                      className="user-avatar-small"
                    />
                  )}
                  <span className="user-name">
                    {user.displayName || user.email}
                  </span>
                </div>
                <Button variant="logout" onClick={handleLogout}>
                  Sair
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Animated Background */}
      <div className="home-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      {/* Main Content */}
      <main className="home-main">
        <div className="hero-section">
          <h1 className="hero-title">
            Transforme imóveis em
            <span className="gradient-text"> PDFs incríveis</span>
          </h1>
          <p className="hero-subtitle">
            Cole a URL da imobiliária e crie apresentações profissionais em
            segundos
          </p>

          <div className="url-input-container">
            <div className="input-wrapper">
              <svg
                className="input-icon"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M8.5 14.5L3.5 9.5L8.5 4.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16.5 9.5H3.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input
                type="url"
                className={`url-input ${error ? "url-input-error" : ""}`}
                placeholder="https://exemplo.com/imovel/12345"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  setError("");
                }}
                onKeyPress={(e) =>
                  e.key === "Enter" && !loading && handleGeneratePDF()
                }
                disabled={loading}
              />
            </div>
            <Button
              variant="primary"
              onClick={handleGeneratePDF}
              disabled={loading}
            >
              {loading ? "Gerando..." : "Gerar PDF"}
            </Button>
          </div>

          {error && (
            <div className="error-message">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M10 6V10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M10 14H10.01"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              {error}
            </div>
          )}

          {/* <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3 className="feature-title">Rápido</h3>
              <p className="feature-description">Gere PDFs em segundos</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3 className="feature-title">Profissional</h3>
              <p className="feature-description">Design moderno e elegante</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3 className="feature-title">Responsivo</h3>
              <p className="feature-description">
                Perfeito em qualquer dispositivo
              </p>
            </div>
          </div> */}
        </div>

        {/* Recent PDFs Section */}
        <RecentPdfsSection user={user} />
      </main>
    </div>
  );
}

export default HomePage;
