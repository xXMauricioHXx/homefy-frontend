import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import Button from "./Button";
import "./Header.css";

function Header() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
  };

  return (
    <nav className="header-navbar">
      <div className="header-navbar-content">
        <div className="header-navbar-logo" onClick={() => navigate("/")}>
          <span className="header-logo-text gradient-text">Homefy</span>
        </div>

        <div className="header-navbar-actions">
          {user && (
            <>
              <div className="header-user-badge">
                {user.photoURL && (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || "User"}
                    className="header-user-avatar-small"
                  />
                )}
                <span className="header-user-name">
                  {user.displayName || user.email}
                </span>
              </div>
              <Button variant="secondary" onClick={() => navigate("/profile")}>
                Perfil
              </Button>
              <Button variant="logout" onClick={handleLogout}>
                Sair
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
