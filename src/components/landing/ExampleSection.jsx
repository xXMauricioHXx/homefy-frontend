import pdfMockup from "../../assets/landing/tela-resultado.png";
import "./LandingPage.css";

function ExampleSection() {
  return (
    <section className="landing-example-section" style={{ padding: "100px 0" }}>
      <div className="landing-container">
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <h2 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>
            Resultado Profissional
          </h2>
          <p
            style={{
              fontSize: "1.25rem",
              color: "var(--color-text-secondary)",
            }}
          >
            Seus clientes vão se impressionar com a qualidade dos materiais.
          </p>
        </div>

        <div
          style={{
            background: "var(--color-bg-secondary)",
            padding: "40px",
            borderRadius: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "400px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            className="landing-hero-visual landing-animate-float"
            style={{
              width: "100%",
              maxWidth: "800px",
              boxShadow: "0 30px 60px -12px rgba(0,0,0,0.25)",
            }}
          >
            <img
              src={pdfMockup}
              alt="Exemplo de PDF Profissional Mada"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ExampleSection;
