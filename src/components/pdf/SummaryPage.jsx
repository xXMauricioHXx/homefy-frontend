import PropTypes from "prop-types";
import { useUser } from "../../hooks/useUser";

function SummaryPage({ property }) {
  const { userData, user } = useUser();

  // Use user data from context, with fallback to default values
  const agentName = userData?.name || user?.displayName || "Corretor";
  const agentEmail = userData?.email || user?.email || "contato@exemplo.com";
  const agentPhone = userData?.phone || "(00) 00000-0000";
  const agentPhoto = user?.photoURL || null;

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
              agentPhoto ||
              "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop"
            }
            className="agent-img"
            alt="Corretor"
          />
          <div className="agent-info">
            <h3>{agentName}</h3>
            <p>Corretor de Imóveis</p>
            <p className="agent-phone">{agentPhone}</p>
            <p>{agentEmail}</p>
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
};

export default SummaryPage;
