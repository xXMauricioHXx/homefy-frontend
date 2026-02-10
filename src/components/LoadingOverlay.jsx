import PropTypes from "prop-types";
import "./LoadingOverlay.css";

function LoadingOverlay({ isVisible, message = "Gerando PDF..." }) {
  if (!isVisible) return null;

  return (
    <div className="loading-overlay">
      <div className="loading-content">
        <div className="spinner"></div>
        <p className="loading-message">{message}</p>
      </div>
    </div>
  );
}

LoadingOverlay.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  message: PropTypes.string,
};

export default LoadingOverlay;
