import heroMockup from "../../assets/landing/mockup.png";
import { Link } from "react-router-dom";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "./LandingPage.css";

function HeroSection() {
  return (
    <section className="landing-hero-section">
      <div className="landing-container">
        <div className="landing-hero-content">
          <div className="landing-hero-badge">
            <AutoAwesomeIcon style={{ marginRight: "8px", fontSize: "1rem" }} />
            Revolução na criação de materiais imobiliários
          </div>

          <h1 className="landing-hero-title">
            Transforme anúncios imobiliários em{" "}
            <span className="gradient-text">PDFs profissionais</span> em menos
            de 1 minuto
          </h1>

          <p className="landing-hero-subtitle">
            Pare de perder 30 minutos criando PDFs manualmente. O Homefy
            automatiza o download de imagens, organização e layout para você
            vender mais rápido.
          </p>

          <div className="landing-hero-cta">
            <Link to="/pricing" className="landing-btn-primary">
              Veja os planos
              <ArrowForwardIcon style={{ marginLeft: "8px" }} />
            </Link>
            <Link to="/demo" className="landing-btn-secondary">
              <PlayCircleOutlineIcon style={{ marginRight: "8px" }} />
              Ver Demonstração
            </Link>
          </div>

          <div className="landing-hero-visual landing-animate-float">
            {/* Placeholder for now - will replace with actual screenshot/mockup */}
            <div
              style={{
                padding: "0px",
                background: "#f0f0f0",
                aspectRatio: "16/9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "12px",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(240,240,240,1) 100%)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={heroMockup}
                  alt="Exemplo de PDF Profissional Homefy"
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
                <p style={{ color: "#aaa", fontWeight: 500 }}>
                  Mockup do Sistema Homefy
                </p>
                <p style={{ color: "#ccc", fontSize: "0.8rem" }}>
                  (Geração de PDF em tempo real)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
