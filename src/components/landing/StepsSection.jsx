import LinkIcon from "@mui/icons-material/Link";
import SettingsIcon from "@mui/icons-material/Settings";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import "./LandingPage.css";

function StepsSection() {
  const steps = [
    {
      number: "01",
      title: "Cole o Link",
      description:
        "Copie a URL do anúncio do imóvel no portal imobiliário e cole no Homefy.",
      icon: <LinkIcon fontSize="inherit" />,
    },
    {
      number: "02",
      title: "Processamento",
      description:
        "Nossa IA extrai as fotos, remove marcas d'água e organiza as informações.",
      icon: <SettingsIcon fontSize="inherit" />,
    },
    {
      number: "03",
      title: "Baixe o PDF",
      description:
        "Seu arquivo profissional está pronto. Baixe e envie para seu cliente.",
      icon: <FileDownloadIcon fontSize="inherit" />,
    },
  ];

  return (
    <section
      className="steps-section"
      style={{ padding: "100px 0", background: "var(--color-bg-tertiary)" }}
    >
      <div className="landing-container">
        <div style={{ textAlign: "center", marginBottom: "80px" }}>
          <h2 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>
            Como funciona
          </h2>
          <p
            style={{
              fontSize: "1.25rem",
              color: "var(--color-text-secondary)",
            }}
          >
            Simples, rápido e eficiente. Em 3 passos você tem seu PDF.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "40px",
            position: "relative",
          }}
        >
          {/* Arrow connector simulation could be added here with CSS pseudo-elements */}

          {steps.map((step, index) => (
            <div
              key={index}
              style={{
                position: "relative",
                background: "white",
                padding: "40px 30px",
                borderRadius: "16px",
                boxShadow: "var(--shadow-md)",
                borderBottom: "4px solid var(--color-accent-primary)",
                transition: "transform 0.3s ease",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-20px",
                  left: "30px",
                  background: "var(--color-accent-primary)",
                  color: "white",
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  boxShadow: "0 4px 10px rgba(237, 99, 37, 0.4)",
                }}
              >
                {step.number}
              </div>
              <div
                style={{
                  fontSize: "3rem",
                  marginTop: "10px",
                  marginBottom: "20px",
                }}
              >
                {step.icon}
              </div>
              <h3 style={{ marginBottom: "15px" }}>{step.title}</h3>
              <p
                style={{
                  color: "var(--color-text-secondary)",
                  lineHeight: "1.6",
                }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StepsSection;
