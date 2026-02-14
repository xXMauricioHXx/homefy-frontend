import PropTypes from "prop-types";
import "./ActionSelectionModal.css";

function ActionSelectionModal({
  isOpen,
  onClose,
  onPdfAction,
  onDownloadAction,
}) {
  if (!isOpen) return null;

  return (
    <div className="action-modal-overlay" onClick={onClose}>
      <div
        className="action-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="action-modal-header">
          <h2 className="action-modal-title">Escolha uma ação</h2>
          <p className="action-modal-subtitle">
            O que você gostaria de fazer com as imagens?
          </p>
          <button className="action-modal-close-btn" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="action-modal-body">
          <button className="action-card" onClick={onPdfAction}>
            <div className="action-icon pdf-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path
                  d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 2V8H20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="action-content">
              <h3 className="action-title">Gerar PDF</h3>
              <p className="action-description">
                Crie um PDF profissional com as imagens selecionadas
              </p>
            </div>
            <div className="action-arrow">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M7.5 15L12.5 10L7.5 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </button>

          <button className="action-card" onClick={onDownloadAction}>
            <div className="action-icon download-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 10L12 15L17 10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 15V3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="action-content">
              <h3 className="action-title">Baixar imagens</h3>
              <p className="action-description">
                Faça download das imagens selecionadas em formato ZIP
              </p>
            </div>
            <div className="action-arrow">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M7.5 15L12.5 10L7.5 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

ActionSelectionModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onPdfAction: PropTypes.func.isRequired,
  onDownloadAction: PropTypes.func.isRequired,
};

export default ActionSelectionModal;
