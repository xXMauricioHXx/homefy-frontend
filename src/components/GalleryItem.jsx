import { useState } from "react";
import PropTypes from "prop-types";
import "./Gallery.css";

function GalleryItem({
  imageUrl,
  index,
  isSelected,
  isSelectionMode,
  onClick,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div
      className={`gallery-item ${isSelectionMode ? "selection-mode" : ""} ${isSelected ? "selected" : ""}`}
      onClick={onClick}
    >
      {isLoading && (
        <div className="gallery-item-skeleton">
          <div className="skeleton-shimmer"></div>
        </div>
      )}

      {hasError ? (
        <div className="gallery-item-error">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M12 8V12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M12 16H12.01"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span>Erro ao carregar</span>
        </div>
      ) : (
        <img
          src={imageUrl}
          alt={`Imagem ${index + 1}`}
          className="gallery-item-image"
          loading="lazy"
          onLoad={handleImageLoad}
          onError={handleImageError}
          style={{ display: isLoading ? "none" : "block" }}
        />
      )}

      {isSelectionMode && !hasError && (
        <div className="gallery-item-checkbox">
          <div className={`checkbox ${isSelected ? "checked" : ""}`}>
            {isSelected && (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M13.3333 4L6 11.3333L2.66667 8"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

GalleryItem.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
  isSelectionMode: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default GalleryItem;
