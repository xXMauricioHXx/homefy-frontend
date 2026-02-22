import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../contexts/AuthContext";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          color: "var(--color-text-primary)",
        }}
      >
        <div
          className="spinner"
          style={{
            width: "40px",
            height: "40px",
            border: "4px solid rgba(237, 99, 37, 0.2)",
            borderTopColor: "var(--color-accent-primary)",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        ></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!user.emailVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
