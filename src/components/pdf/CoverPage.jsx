import PropTypes from "prop-types";

function CoverPage({ brand, mainImage }) {
  return (
    <div className="pdf-page cover-page">
      <img src={mainImage} className="cover-image" alt="Fachada" />
      <div className="cover-content">
        <div className="tag">Exclusividade</div>
        <h1>
          {brand.name} <br />
          {brand.location}
        </h1>
        <p>{brand.description}</p>
      </div>
    </div>
  );
}

CoverPage.propTypes = {
  brand: PropTypes.shape({
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  mainImage: PropTypes.string.isRequired,
};

export default CoverPage;
