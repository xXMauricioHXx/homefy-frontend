import TimerIcon from "@mui/icons-material/Timer";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import "./LandingPage.css";

function BenefitsSection() {
  const benefits = [
    {
      title: "Economize Tempo",
      description:
        "Reduza o tempo de criação de 30 minutos para menos de 1 minuto por imóvel.",
      icon: <TimerIcon fontSize="inherit" />,
    },
    {
      title: "Mais Profissionalismo",
      description:
        "Impressione clientes com apresentações padronizadas, limpas e modernas.",
      icon: <BusinessCenterIcon fontSize="inherit" />,
    },
    {
      title: "Aumente as Vendas",
      description:
        "Responda leads instantaneamente enquanto o interesse ainda está quente.",
      icon: <RocketLaunchIcon fontSize="inherit" />,
    },
    {
      title: "Automação Total",
      description:
        "Esqueça o trabalho manual de copiar, colar e formatar documentos.",
      icon: <SmartToyIcon fontSize="inherit" />,
    },
  ];

  return (
    <section className="benefits-section" style={{ padding: "100px 0" }}>
      <div className="landing-container">
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <h2 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>
            Por que usar o Mada?
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "30px",
          }}
        >
          {benefits.map((benefit, index) => (
            <div
              key={index}
              style={{
                padding: "30px",
                borderRadius: "12px",
                background: "linear-gradient(145deg, #ffffff, #f0f0f0)",
                border: "1px solid rgba(255,255,255,0.8)",
                boxShadow: "20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff",
              }}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: "20px" }}>
                {benefit.icon}
              </div>
              <h3 style={{ marginBottom: "10px" }}>{benefit.title}</h3>
              <p style={{ color: "var(--color-text-secondary)" }}>
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BenefitsSection;
