import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import "./NotFoundPage.css";

function NotFoundPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="notfound-container">
      {/* Animated Background */}
      <div className="notfound-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      {/* Main Content */}
      <div className="notfound-content">
        <div className="notfound-illustration">
          <div className="error-code">404</div>
          <div className="error-icon">
            <svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="60"
                cy="60"
                r="55"
                stroke="url(#gradient)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="8 8"
                className="rotating-circle"
              />
              <path
                d="M60 30V60L75 75"
                stroke="url(#gradient)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="clock-hand"
              />
              <circle cx="60" cy="60" r="4" fill="#ed6325" />
              <defs>
                <linearGradient
                  id="gradient"
                  x1="0"
                  y1="0"
                  x2="120"
                  y2="120"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#ed6325" />
                  <stop offset="100%" stopColor="#ff7a3d" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        <div className="notfound-text">
          <h1 className="notfound-title">
            Página <span className="gradient-text">não encontrada</span>
          </h1>
          <p className="notfound-description">
            Ops! A página que você está procurando não existe ou foi movida.
            Vamos te ajudar a voltar ao caminho certo.
          </p>
        </div>

        <div className="notfound-actions">
          <Button variant="primary" onClick={handleGoHome}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              style={{ marginRight: "8px" }}
            >
              <path
                d="M3 10L10 3L17 10M4 9V16C4 16.5523 4.44772 17 5 17H8V13C8 12.4477 8.44772 12 9 12H11C11.5523 12 12 12.4477 12 13V17H15C15.5523 17 16 16.5523 16 16V9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Voltar para Home
          </Button>
          <Button variant="secondary" onClick={handleGoBack}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              style={{ marginRight: "8px" }}
            >
              <path
                d="M8 4L2 10L8 16M2 10H18"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Voltar
          </Button>
        </div>

        <div className="notfound-help">
          <p className="help-text">
            Se você acredita que isso é um erro, entre em contato com o suporte.
          </p>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
