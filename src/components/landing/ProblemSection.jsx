import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import MoodBadIcon from "@mui/icons-material/MoodBad";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import "./LandingPage.css";

function ProblemSection() {
  return (
    <section
      className="problem-section"
      style={{ padding: "80px 0", background: "var(--color-bg-secondary)" }}
    >
      <div className="landing-container">
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <h2 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>
            O jeito antigo de criar anúncios
          </h2>
          <p
            style={{
              fontSize: "1.25rem",
              color: "var(--color-text-secondary)",
              maxWidth: "700px",
              margin: "0 auto",
            }}
          >
            Criar PDFs manualmente é lento, repetitivo e te impede de focar no
            que realmente importa: vender.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "30px",
          }}
        >
          <div
            className="problem-card"
            style={{
              background: "white",
              padding: "40px",
              borderRadius: "12px",
              boxShadow: "var(--shadow-md)",
              border: "1px solid #eee",
            }}
          >
            <div
              style={{
                fontSize: "3rem",
                marginBottom: "20px",
                color: "var(--color-text-muted)",
              }}
            >
              <HourglassEmptyIcon fontSize="inherit" />
            </div>
            <h3 style={{ marginBottom: "15px" }}>Lento e Manual</h3>
            <p>
              Você precisa baixar cada imagem, remover marcas de água, copiar
              descrições e organizar tudo manualmente no Word ou Canva.
            </p>
          </div>

          <div
            className="problem-card"
            style={{
              background: "white",
              padding: "40px",
              borderRadius: "12px",
              boxShadow: "var(--shadow-md)",
              border: "1px solid #eee",
            }}
          >
            <div
              style={{
                fontSize: "3rem",
                marginBottom: "20px",
                color: "var(--color-text-muted)",
              }}
            >
              <MoodBadIcon fontSize="inherit" />
            </div>
            <h3 style={{ marginBottom: "15px" }}>Layout Despadronizado</h3>
            <p>
              Sem um template fixo, cada PDF sai diferente. Alinhar fotos e
              textos consome muito tempo e paciência.
            </p>
          </div>

          <div
            className="problem-card"
            style={{
              background: "white",
              padding: "40px",
              borderRadius: "12px",
              boxShadow: "var(--shadow-md)",
              border: "1px solid #eee",
            }}
          >
            <div
              style={{
                fontSize: "3rem",
                marginBottom: "20px",
                color: "var(--color-text-muted)",
              }}
            >
              <MoneyOffIcon fontSize="inherit" />
            </div>
            <h3 style={{ marginBottom: "15px" }}>Perda de Vendas</h3>
            <p>
              Enquanto você gasta 30 minutos montando um arquivo, seu cliente
              esfria ou encontra outro corretor mais ágil.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProblemSection;
