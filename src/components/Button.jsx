import PropTypes from "prop-types";
import "./Button.css";

function Button({
  children,
  variant = "primary",
  type = "button",
  onClick,
  disabled = false,
  loading = false,
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`btn btn-${variant} ${className}`}
    >
      {loading ? (
        <span className="btn-content">
          <span className="spinner"></span>
          Carregando...
        </span>
      ) : (
        <span className="btn-content">{children}</span>
      )}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["primary", "google", "logout"]),
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  className: PropTypes.string,
};

export default Button;
