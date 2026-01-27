import PropTypes from "prop-types";

function PropertyDescriptionPage({ property, colors }) {
  return (
    <div className="pdf-page room-page">
      <div
        className="room-header"
        style={{ borderBottomColor: colors?.secondary || "#d45520" }}
      >
        <div
          className="room-title"
          style={{ color: colors?.primary || "#ed6325" }}
        >
          Apartamento à Venda
        </div>
        <div className="room-subtitle">{property.resume}</div>
      </div>

      <img src={property.mainImage} className="room-hero" alt="Imóvel" />

      <div className="room-body">
        <div className="room-desc">
          <h3 style={{ color: colors?.secondary || "#d45520" }}>Descrição</h3>
          <p>{property.description}</p>
        </div>

        <div className="side-gallery">
          {property.sideImages?.slice(0, 2).map((image, index) => (
            <img
              key={index}
              src={image}
              className="side-img"
              alt={`Detalhe ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

PropertyDescriptionPage.propTypes = {
  property: PropTypes.shape({
    resume: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    mainImage: PropTypes.string.isRequired,
    sideImages: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  colors: PropTypes.shape({
    primary: PropTypes.string,
    secondary: PropTypes.string,
  }),
};

export default PropertyDescriptionPage;
