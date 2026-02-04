import { useState } from "react";
import { usePdfConfig } from "../../../contexts/PdfConfigContext";
import ConfigSection from "../ConfigSection";
import { applyCurrencyMask } from "../../../utils/currencyMask";
import "./SummaryConfigSection.css";

function SummaryConfigSection() {
  const {
    config,
    updatePropertyData,
    addFeature,
    removeFeature,
    addInfrastructure,
    removeInfrastructure,
  } = usePdfConfig();

  const [newFeature, setNewFeature] = useState("");
  const [newInfrastructure, setNewInfrastructure] = useState("");

  const handleCurrencyChange = (field, value) => {
    const maskedValue = applyCurrencyMask(value);
    updatePropertyData({ [field]: maskedValue });
  };

  const handleTextChange = (field, value) => {
    updatePropertyData({ [field]: value });
  };

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      addFeature(newFeature.trim());
      setNewFeature("");
    }
  };

  const handleAddInfrastructure = () => {
    if (newInfrastructure.trim()) {
      addInfrastructure(newInfrastructure.trim());
      setNewInfrastructure("");
    }
  };

  return (
    <ConfigSection title="Resumo" icon="📋" defaultExpanded={false}>
      <div className="summary-config-content">
        <p className="summary-config-description">
          Edite as informações do imóvel que aparecem no PDF
        </p>

        <div className="summary-config-fields">
          {/* Currency Fields */}
          <div className="config-field">
            <label htmlFor="price">Preço</label>
            <input
              id="price"
              type="text"
              value={config.propertyData.price}
              onChange={(e) => handleCurrencyChange("price", e.target.value)}
              placeholder="R$ 0,00"
            />
          </div>

          <div className="config-field">
            <label htmlFor="pricePerSqm">Preço por m²</label>
            <input
              id="pricePerSqm"
              type="text"
              value={config.propertyData.pricePerSqm}
              onChange={(e) =>
                handleCurrencyChange("pricePerSqm", e.target.value)
              }
              placeholder="R$ 0,00"
            />
          </div>

          <div className="config-field">
            <label htmlFor="condominium">Condomínio</label>
            <input
              id="condominium"
              type="text"
              value={config.propertyData.condominium}
              onChange={(e) =>
                handleCurrencyChange("condominium", e.target.value)
              }
              placeholder="R$ 0,00"
            />
          </div>

          {/* Text Fields */}
          <div className="config-field">
            <label htmlFor="area">Área (m²)</label>
            <input
              id="area"
              type="text"
              value={config.propertyData.area}
              onChange={(e) => handleTextChange("area", e.target.value)}
              placeholder="Ex: 120"
            />
          </div>

          <div className="config-field">
            <label htmlFor="parking">Vagas</label>
            <input
              id="parking"
              type="text"
              value={config.propertyData.parking}
              onChange={(e) => handleTextChange("parking", e.target.value)}
              placeholder="Ex: 2"
            />
          </div>

          <div className="config-field">
            <label htmlFor="iptu">IPTU</label>
            <input
              id="iptu"
              type="text"
              value={config.propertyData.iptu}
              onChange={(e) => handleTextChange("iptu", e.target.value)}
              placeholder="Ex: R$ 500,00"
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="list-section">
          <h4>Características</h4>
          <div className="list-input-group">
            <input
              type="text"
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddFeature()}
              placeholder="Adicionar característica"
            />
            <button
              type="button"
              onClick={handleAddFeature}
              className="add-button"
            >
              +
            </button>
          </div>
          <ul className="config-list">
            {config.propertyData.features.map((feature, index) => (
              <li key={index}>
                <span>{feature}</span>
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="remove-button"
                  aria-label="Remover"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Infrastructures Section */}
        <div className="list-section">
          <h4>Infraestrutura</h4>
          <div className="list-input-group">
            <input
              type="text"
              value={newInfrastructure}
              onChange={(e) => setNewInfrastructure(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddInfrastructure()}
              placeholder="Adicionar infraestrutura"
            />
            <button
              type="button"
              onClick={handleAddInfrastructure}
              className="add-button"
            >
              +
            </button>
          </div>
          <ul className="config-list">
            {config.propertyData.infrastructures.map((infra, index) => (
              <li key={index}>
                <span>{infra}</span>
                <button
                  type="button"
                  onClick={() => removeInfrastructure(index)}
                  className="remove-button"
                  aria-label="Remover"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ConfigSection>
  );
}

export default SummaryConfigSection;
