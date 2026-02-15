import PropTypes from "prop-types";
import "./Gallery.css";

function GalleryHeader({ brandName, location, reference, onBack }) {
  return (
    <header className="gallery-header">
      <button
        className="gallery-back-button"
        onClick={onBack}
        aria-label="Voltar"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M19 12H5M5 12L12 19M5 12L12 5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className="gallery-header-content">
        <h1 className="gallery-title">{brandName}</h1>
        {(location || reference) && (
          <p className="gallery-subtitle">
            {location && <span>{location}</span>}
            {location && reference && <span className="separator">•</span>}
            {reference && <span>Ref {reference}</span>}
          </p>
        )}
      </div>
    </header>
  );
}

GalleryHeader.propTypes = {
  brandName: PropTypes.string.isRequired,
  location: PropTypes.string,
  reference: PropTypes.string,
  onBack: PropTypes.func.isRequired,
};

export default GalleryHeader;
