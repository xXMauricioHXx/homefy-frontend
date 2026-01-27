import PropTypes from "prop-types";

function CoverPage({ brand, mainImage, colors }) {
  return (
    <div className="pdf-page cover-page">
      <img src={mainImage} className="cover-image" alt="Fachada" />
      <div
        className="cover-content"
        style={{ backgroundColor: colors?.primary || "#ed6325" }}
      >
        <div className="tag" style={{ color: colors?.primary || "#ed6325" }}>
          Exclusividade
        </div>
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
  colors: PropTypes.shape({
    primary: PropTypes.string,
    secondary: PropTypes.string,
  }),
};

export default CoverPage;
