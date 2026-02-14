import PropTypes from "prop-types";
import "./Gallery.css";

function GalleryBottomBar({
  totalImages,
  selectedCount,
  isSelectionMode,
  isDownloading,
  downloadProgress,
  onToggleSelection,
  onDownload,
}) {
  const canDownload = isSelectionMode ? selectedCount > 0 : totalImages > 0;

  return (
    <div className="gallery-bottom-bar">
      <div className="bottom-bar-content">
        {/* Counter */}
        <div className="bottom-bar-counter">
          {isSelectionMode && selectedCount > 0 ? (
            <span className="counter-selected">
              {selectedCount} selecionada{selectedCount !== 1 ? "s" : ""}
            </span>
          ) : (
            <span className="counter-total">
              {totalImages} foto{totalImages !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="bottom-bar-actions">
          <button
            className={`bottom-bar-button ${isSelectionMode ? "active" : ""}`}
            onClick={onToggleSelection}
            disabled={isDownloading}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 11L12 14L22 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>{isSelectionMode ? "Cancelar" : "Selecionar"}</span>
          </button>

          <button
            className="bottom-bar-button primary"
            onClick={onDownload}
            disabled={!canDownload || isDownloading}
          >
            {isDownloading ? (
              <>
                <div className="button-spinner"></div>
                <span>
                  Baixando {downloadProgress.current}/{downloadProgress.total}
                  ...
                </span>
              </>
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
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
                <span>
                  {isSelectionMode && selectedCount > 0
                    ? "Baixar selecionadas"
                    : "Baixar tudo"}
                </span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      {isDownloading && (
        <div className="download-progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${(downloadProgress.current / downloadProgress.total) * 100}%`,
            }}
          ></div>
        </div>
      )}
    </div>
  );
}

GalleryBottomBar.propTypes = {
  totalImages: PropTypes.number.isRequired,
  selectedCount: PropTypes.number.isRequired,
  isSelectionMode: PropTypes.bool.isRequired,
  isDownloading: PropTypes.bool.isRequired,
  downloadProgress: PropTypes.shape({
    current: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
  }).isRequired,
  onToggleSelection: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired,
};

export default GalleryBottomBar;
