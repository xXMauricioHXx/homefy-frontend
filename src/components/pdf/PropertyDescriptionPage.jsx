import PropTypes from "prop-types";

function PropertyDescriptionPage({ property }) {
  return (
    <div className="pdf-page room-page">
      <div className="room-header">
        <div className="room-title">Apartamento à Venda</div>
        <div className="room-subtitle">{property.resume}</div>
      </div>

      <img src={property.mainImage} className="room-hero" alt="Imóvel" />

      <div className="room-body">
        <div className="room-desc">
          <h3>Descrição</h3>
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
};

export default PropertyDescriptionPage;
