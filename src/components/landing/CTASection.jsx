import { Link } from "react-router-dom";
import "./LandingPage.css";

function CTASection() {
  return (
    <section
      className="cta-section"
      style={{ padding: "100px 0", textAlign: "center" }}
    >
      <div className="landing-container">
        <div
          style={{
            background:
              "linear-gradient(135deg, var(--color-accent-primary) 0%, var(--color-accent-secondary) 100%)",
            borderRadius: "24px",
            padding: "80px 40px",
            color: "white",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative elements */}
          <div
            style={{
              position: "absolute",
              top: "-50px",
              left: "-50px",
              width: "200px",
              height: "200px",
              background: "rgba(255,255,255,0.1)",
              borderRadius: "50%",
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              bottom: "-20px",
              right: "-20px",
              width: "150px",
              height: "150px",
              background: "rgba(255,255,255,0.1)",
              borderRadius: "50%",
            }}
          ></div>

          <h2
            style={{
              fontSize: "3rem",
              marginBottom: "20px",
              position: "relative",
              zIndex: 1,
              color: "white",
            }}
          >
            Comece a usar o Homefy hoje mesmo
          </h2>
          <p
            style={{
              fontSize: "1.25rem",
              marginBottom: "40px",
              maxWidth: "700px",
              margin: "0 auto 40px",
              opacity: 0.9,
              position: "relative",
              zIndex: 1,
              color: "white",
            }}
          >
            Junte-se a corretores que estão economizando horas de trabalho toda
            semana.
          </p>

          <div style={{ position: "relative", zIndex: 1 }}>
            <Link
              to="/pricing"
              className="landing-btn-secondary"
              style={{
                padding: "1rem 2.5rem",
                fontSize: "1.2rem",
                color: "var(--color-accent-primary)",
              }}
            >
              Começar Grátis Agora
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
