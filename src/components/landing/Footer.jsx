import { Link } from "react-router-dom";
import "./LandingPage.css";

function Footer() {
  return (
    <footer
      style={{
        background: "#f9fafb",
        padding: "60px 0 30px",
        borderTop: "1px solid #eee",
      }}
    >
      <div className="landing-container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "40px",
            marginBottom: "60px",
          }}
        >
          <div>
            <div
              className="landing-navbar-logo gradient-text"
              style={{ marginBottom: "20px" }}
            >
              Homefy
            </div>
            <p
              style={{
                color: "var(--color-text-secondary)",
                fontSize: "0.9rem",
              }}
            >
              Transformando o mercado imobiliário com automação e inteligência.
            </p>
          </div>

          <div>
            <h4
              style={{
                marginBottom: "20px",
                color: "var(--color-text-primary)",
              }}
            >
              Produto
            </h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "10px" }}>
                <Link to="/" style={{ color: "var(--color-text-secondary)" }}>
                  Funcionalidades
                </Link>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <Link
                  to="/pricing"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  Preços
                </Link>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <Link
                  to="/demo"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  Demonstração
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4
              style={{
                marginBottom: "20px",
                color: "var(--color-text-primary)",
              }}
            >
              Legal
            </h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "10px" }}>
                <Link
                  to="/terms"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  Termos de Uso
                </Link>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <Link
                  to="/privacy"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  Privacidade
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4
              style={{
                marginBottom: "20px",
                color: "var(--color-text-primary)",
              }}
            >
              Contato
            </h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li
                style={{
                  marginBottom: "10px",
                  color: "var(--color-text-secondary)",
                }}
              >
                homefy@gmail.com
              </li>
              <li
                style={{
                  marginBottom: "10px",
                  color: "var(--color-text-secondary)",
                }}
              >
                +55 51 98170-6025
              </li>
            </ul>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid #eee",
            paddingTop: "30px",
            textAlign: "center",
            color: "var(--color-text-muted)",
            fontSize: "0.9rem",
          }}
        >
          &copy; {new Date().getFullYear()} Homefy. Todos os direitos
          reservados.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
