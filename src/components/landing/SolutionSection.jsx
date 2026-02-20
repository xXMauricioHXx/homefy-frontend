import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./LandingPage.css";

function SolutionSection() {
  return (
    <section className="solution-section" style={{ padding: "100px 0" }}>
      <div className="landing-container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "60px",
            alignItems: "center",
          }}
        >
          <div>
            <span
              style={{
                color: "var(--color-accent-primary)",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "1px",
                fontSize: "0.875rem",
              }}
            >
              Solução Inteligente
            </span>
            <h2
              style={{
                fontSize: "3rem",
                lineHeight: "1.2",
                margin: "20px 0 30px",
              }}
            >
              Automação completa em um clique
            </h2>
            <p
              style={{
                fontSize: "1.25rem",
                color: "var(--color-text-secondary)",
                marginBottom: "40px",
              }}
            >
              Com o Homefy, basta colar o link do anúncio. Nossa inteligência
              artificial faz todo o trabalho pesado para você em segundos.
            </p>

            <ul style={{ listStyle: "none" }}>
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "20px",
                  fontSize: "1.1rem",
                }}
              >
                <CheckCircleIcon
                  style={{
                    color: "var(--color-success)",
                    marginRight: "15px",
                    fontSize: "1.2rem",
                  }}
                />
                Download automático de imagens em alta resolução
              </li>
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "20px",
                  fontSize: "1.1rem",
                }}
              >
                <CheckCircleIcon
                  style={{
                    color: "var(--color-success)",
                    marginRight: "15px",
                    fontSize: "1.2rem",
                  }}
                />
                Remoção inteligente de marcas d'água
              </li>
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "20px",
                  fontSize: "1.1rem",
                }}
              >
                <CheckCircleIcon
                  style={{
                    color: "var(--color-success)",
                    marginRight: "15px",
                    fontSize: "1.2rem",
                  }}
                />
                Layout profissional e padronizado
              </li>
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "20px",
                  fontSize: "1.1rem",
                }}
              >
                <span
                  style={{
                    color: "var(--color-success)",
                    marginRight: "15px",
                    fontWeight: "bold",
                  }}
                >
                  ✓
                </span>
                Exportação instantânea para PDF e muito mais
              </li>
            </ul>
          </div>

          <div style={{ position: "relative" }}>
            <div
              style={{
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
                borderRadius: "20px",
                padding: "40px",
                boxShadow: "0 20px 50px rgba(0,0,0,0.1)",
              }}
            >
              <div
                style={{
                  background: "white",
                  borderRadius: "10px",
                  padding: "20px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "20px",
                    borderBottom: "1px solid #eee",
                    paddingBottom: "15px",
                  }}
                >
                  <div
                    style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      background: "#ff5f56",
                    }}
                  ></div>
                  <div
                    style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      background: "#ffbd2e",
                    }}
                  ></div>
                  <div
                    style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      background: "#27c93f",
                    }}
                  ></div>
                  <div
                    style={{
                      marginLeft: "auto",
                      fontSize: "0.8rem",
                      color: "#999",
                    }}
                  >
                    homefy.app
                  </div>
                </div>
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      border: "4px solid var(--color-accent-primary)",
                      borderTopColor: "transparent",
                      margin: "0 auto 20px",
                      animation: "spin 1s linear infinite",
                    }}
                  ></div>
                  <p
                    style={{
                      fontWeight: 600,
                      color: "var(--color-text-primary)",
                    }}
                  >
                    Gerando seu PDF...
                  </p>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    Processando imagens e informações
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SolutionSection;
