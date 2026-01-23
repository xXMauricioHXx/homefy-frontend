import PropTypes from "prop-types";

function GalleryPage({ image, brand, propertyResume, index }) {
  return (
    <div className="pdf-page room-page gallery-page" key={index}>
      <div className="room-header">
        <div className="room-subtitle">
          {brand.name} - {propertyResume}
        </div>
      </div>

      <div className="gallery-content">
        <div className="gallery-figure">
          <img
            src={image}
            className="gallery-img"
            alt={`Galeria ${index + 1}`}
          />
        </div>
      </div>
    </div>
  );
}

GalleryPage.propTypes = {
  image: PropTypes.string.isRequired,
  brand: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  propertyResume: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default GalleryPage;
