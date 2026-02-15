import PropTypes from "prop-types";

function GalleryPage({ image, brand, propertyResume, index, colors }) {
  return (
    <div className="pdf-page room-page gallery-page" key={index}>
      <div
        className="room-header"
        style={{ borderBottomColor: colors?.secondary || "#d45520" }}
      >
        <div className="room-subtitle">
          {brand.name} - {propertyResume}
        </div>
      </div>

      <div className="gallery-content">
        <div
          className="gallery-figure-bg"
          style={{
            backgroundImage: `url(${image})`,
          }}
          role="img"
          aria-label={`Galeria ${index + 1}`}
        />
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
  colors: PropTypes.shape({
    primary: PropTypes.string,
    secondary: PropTypes.string,
  }),
};

export default GalleryPage;
