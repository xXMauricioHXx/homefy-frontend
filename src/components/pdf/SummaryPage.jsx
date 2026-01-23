import PropTypes from "prop-types";

function SummaryPage({ property, agent }) {
  return (
    <div className="pdf-page final-page">
      <div>
        <h2>Resumo</h2>

        <div className="room-desc flex">
          {property.features && property.features.length > 0 && (
            <div>
              <h3>Características</h3>
              <ul className="room-features">
                {property.features.map((item, index) => (
                  <li style={{ color: "white" }} key={index}>
                    <svg className="check-icon" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {property.infrastructures && property.infrastructures.length > 0 && (
            <div>
              <h3>Infraestrutura</h3>
              <ul className="room-features">
                {property.infrastructures.map((item, index) => (
                  <li style={{ color: "white" }} key={index}>
                    <svg className="check-icon" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <br />

        <div className="final-summary">
          <div className="summary-grid">
            <div className="summary-item">
              <small>Área Total</small>
              <div>{property.area} m²</div>
            </div>
            <div className="summary-item">
              <small>Condomínio</small>
              <div>{property.condominium}</div>
            </div>
            <div className="summary-item">
              <small>Vagas</small>
              <div>{property.parking}</div>
            </div>
            <div className="summary-item">
              <small>IPTU</small>
              <div>{property.iptu}</div>
            </div>
          </div>

          <div style={{ marginTop: "30px" }}>
            <small>Investimento</small>
            <span className="price-tag">{property.price}</span>
          </div>
        </div>
      </div>

      <div>
        <p style={{ marginBottom: "20px", fontSize: "20px" }}>
          Interessado? Agende uma visita.
        </p>
        <div className="agent-card">
          <img
            src={
              agent.photo ||
              "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop"
            }
            className="agent-img"
            alt="Corretor"
          />
          <div className="agent-info">
            <h3>{agent.name}</h3>
            <p>{agent.specialization}</p>
            <p className="agent-phone">{agent.phone}</p>
            <p>{agent.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

SummaryPage.propTypes = {
  property: PropTypes.shape({
    features: PropTypes.arrayOf(PropTypes.string),
    infrastructures: PropTypes.arrayOf(PropTypes.string),
    area: PropTypes.string.isRequired,
    condominium: PropTypes.string.isRequired,
    parking: PropTypes.string.isRequired,
    iptu: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  }).isRequired,
  agent: PropTypes.shape({
    name: PropTypes.string.isRequired,
    specialization: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    photo: PropTypes.string,
  }).isRequired,
};

export default SummaryPage;
