import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./LandingPage.css";
import { useEffect, useState } from "react";

function Navbar() {
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`landing-navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="landing-container landing-navbar-content">
        <Link to="/" className="landing-navbar-logo gradient-text">
          <img src="/logo.png" alt="Logo" />
        </Link>

        <div className="landing-navbar-actions">
          {user ? (
            <Link to="/app" className="landing-btn-primary">
              Ir para o Dashboard
            </Link>
          ) : (
            <>
              <Link to="/login" className="landing-btn-outline">
                Entrar
              </Link>
              <Link to="/login" className="landing-btn-primary">
                Começar Grátis
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
