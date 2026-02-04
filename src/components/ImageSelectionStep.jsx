import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import "./ImageSelectionStep.css";

function ImageSelectionStep({
  images,
  onSelectionChange,
  maxSelection = parseInt(import.meta.env.VITE_MAX_IMAGES_PER_PDF || "10"),
}) {
  const [selectedImages, setSelectedImages] = useState([]);

  // Notify parent component when selection changes
  useEffect(() => {
    onSelectionChange(selectedImages);
  }, [selectedImages, onSelectionChange]);

  const handleImageToggle = (imageUrl) => {
    setSelectedImages((prev) => {
      const isSelected = prev.includes(imageUrl);

      if (isSelected) {
        // Deselect image
        return prev.filter((url) => url !== imageUrl);
      } else {
        // Select image (if under max limit)
        if (prev.length < maxSelection) {
          return [...prev, imageUrl];
        }
        return prev;
      }
    });
  };

  const isImageSelected = (imageUrl) => selectedImages.includes(imageUrl);
  const isMaxReached = selectedImages.length >= maxSelection;

  return (
    <div className="image-selection-container">
      {/* Header with counter */}
      <div className="image-selection-header">
        <div className="image-selection-header-content">
          <h3 className="image-selection-title">Selecione as imagens</h3>
          <p className="image-selection-description">
            Escolha até {maxSelection} imagens para incluir no PDF
          </p>
        </div>
        <div className="image-selection-counter">
          <span className="counter-current">{selectedImages.length}</span>
          <span className="counter-separator">/</span>
          <span className="counter-max">{maxSelection}</span>
        </div>
      </div>

      {/* Image Grid */}
      <div className="image-grid">
        {images.map((imageUrl, index) => {
          const selected = isImageSelected(imageUrl);
          const disabled = !selected && isMaxReached;

          return (
            <div
              key={index}
              className={`image-card ${selected ? "selected" : ""} ${disabled ? "disabled" : ""}`}
              onClick={() => !disabled && handleImageToggle(imageUrl)}
            >
              {/* Image */}
              <img
                src={imageUrl}
                alt={`Imagem ${index + 1}`}
                className="image-thumbnail"
                loading="lazy"
              />

              {/* Overlay */}
              <div className="image-overlay">
                {/* Checkbox */}
                <div className={`image-checkbox ${selected ? "checked" : ""}`}>
                  {selected && (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M13.3333 4L6 11.3333L2.66667 8"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>

                {/* Selection number badge */}
                {selected && (
                  <div className="selection-badge">
                    {selectedImages.indexOf(imageUrl) + 1}
                  </div>
                )}
              </div>

              {/* Disabled overlay */}
              {disabled && (
                <div className="disabled-overlay">
                  <span className="disabled-text">Limite atingido</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Empty state */}
      {images.length === 0 && (
        <div className="empty-state">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 19V5C21 3.89543 20.1046 3 19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8.5 10C9.32843 10 10 9.32843 10 8.5C10 7.67157 9.32843 7 8.5 7C7.67157 7 7 7.67157 7 8.5C7 9.32843 7.67157 10 8.5 10Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21 15L16 10L5 21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p>Nenhuma imagem disponível</p>
        </div>
      )}
    </div>
  );
}

ImageSelectionStep.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelectionChange: PropTypes.func.isRequired,
  maxSelection: PropTypes.number,
};

export default ImageSelectionStep;
