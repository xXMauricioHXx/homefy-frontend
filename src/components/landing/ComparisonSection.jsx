import "./LandingPage.css";

function ComparisonSection() {
  return (
    <section
      className="comparison-section"
      style={{ padding: "100px 0", background: "var(--color-bg-tertiary)" }}
    >
      <div className="landing-container">
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <h2 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>
            Comparativo
          </h2>
          <p
            style={{
              fontSize: "1.25rem",
              color: "var(--color-text-secondary)",
            }}
          >
            Veja a diferença que a automação faz no seu dia a dia.
          </p>
        </div>

        <div
          className="comparison-table-container"
          style={{ overflowX: "auto" }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "separate",
              borderSpacing: "0 8px",
              maxWidth: "900px",
              margin: "0 auto",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    padding: "20px",
                    textAlign: "left",
                    fontSize: "1.2rem",
                    color: "var(--color-text-muted)",
                  }}
                >
                  Recurso
                </th>
                <th
                  style={{
                    padding: "20px",
                    textAlign: "center",
                    fontSize: "1.2rem",
                    color: "#ef4444",
                    background: "rgba(239, 68, 68, 0.1)",
                    borderRadius: "12px 0 0 12px",
                  }}
                >
                  Manual (Sem Homefy)
                </th>
                <th
                  style={{
                    padding: "20px",
                    textAlign: "center",
                    fontSize: "1.2rem",
                    color: "var(--color-success)",
                    background: "rgba(16, 185, 129, 0.1)",
                    borderRadius: "0 12px 12px 0",
                    fontWeight: "bold",
                  }}
                >
                  Automático (Com Homefy)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                style={{
                  background: "white",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
                }}
              >
                <td
                  style={{
                    padding: "20px",
                    fontWeight: "500",
                    borderRadius: "8px 0 0 8px",
                  }}
                >
                  Tempo por Imóvel
                </td>
                <td
                  style={{
                    padding: "20px",
                    textAlign: "center",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  ~30 minutos
                </td>
                <td
                  style={{
                    padding: "20px",
                    textAlign: "center",
                    color: "var(--color-success)",
                    fontWeight: "bold",
                    borderRadius: "0 8px 8px 0",
                  }}
                >
                  &lt; 1 minuto
                </td>
              </tr>
              <tr
                style={{
                  background: "white",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
                }}
              >
                <td
                  style={{
                    padding: "20px",
                    fontWeight: "500",
                    borderRadius: "8px 0 0 8px",
                  }}
                >
                  Download de Fotos
                </td>
                <td
                  style={{
                    padding: "20px",
                    textAlign: "center",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  Manual, uma por uma
                </td>
                <td
                  style={{
                    padding: "20px",
                    textAlign: "center",
                    color: "var(--color-success)",
                    fontWeight: "bold",
                    borderRadius: "0 8px 8px 0",
                  }}
                >
                  Automático, todas de uma vez
                </td>
              </tr>
              <tr
                style={{
                  background: "white",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
                }}
              >
                <td
                  style={{
                    padding: "20px",
                    fontWeight: "500",
                    borderRadius: "8px 0 0 8px",
                  }}
                >
                  Marca D'água
                </td>
                <td
                  style={{
                    padding: "20px",
                    textAlign: "center",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  Edição manual no Photoshop
                </td>
                <td
                  style={{
                    padding: "20px",
                    textAlign: "center",
                    color: "var(--color-success)",
                    fontWeight: "bold",
                    borderRadius: "0 8px 8px 0",
                  }}
                >
                  Remoção Instantânea com IA
                </td>
              </tr>
              <tr
                style={{
                  background: "white",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
                }}
              >
                <td
                  style={{
                    padding: "20px",
                    fontWeight: "500",
                    borderRadius: "8px 0 0 8px",
                  }}
                >
                  Organização Layout
                </td>
                <td
                  style={{
                    padding: "20px",
                    textAlign: "center",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  Ajuste manual de posições
                </td>
                <td
                  style={{
                    padding: "20px",
                    textAlign: "center",
                    color: "var(--color-success)",
                    fontWeight: "bold",
                    borderRadius: "0 8px 8px 0",
                  }}
                >
                  Layout Profissional Pronto
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default ComparisonSection;
