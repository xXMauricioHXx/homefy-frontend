import { usePdfConfig } from "../../../contexts/PdfConfigContext";
import ConfigSection from "../ConfigSection";
import ColorPicker from "../ColorPicker";
import "./ColorConfigSection.css";

function ColorConfigSection() {
  const { config, updateColors, updateShowExclusivityTag } = usePdfConfig();

  const handlePrimaryColorChange = (color) => {
    updateColors({ primary: color });
  };

  const handleSecondaryColorChange = (color) => {
    updateColors({ secondary: color });
  };

  const handleTitleColorChange = (color) => {
    updateColors({ titleColor: color });
  };

  const handleSummaryBackgroundChange = (color) => {
    updateColors({ summaryBackground: color });
  };

  const handleExclusivityToggle = (e) => {
    updateShowExclusivityTag(e.target.checked);
  };

  return (
    <ConfigSection title="Cores" icon="🎨" defaultExpanded={true}>
      <div className="color-config-content">
        <p className="color-config-description">
          Personalize as cores primárias e secundárias do seu PDF
        </p>
        <div className="color-pickers">
          <ColorPicker
            label="Cor Primária"
            value={config.colors.primary}
            onChange={handlePrimaryColorChange}
          />
          <ColorPicker
            label="Cor Secundária"
            value={config.colors.secondary}
            onChange={handleSecondaryColorChange}
          />
          <ColorPicker
            label="Cor do Título"
            value={config.colors.titleColor}
            onChange={handleTitleColorChange}
          />
          <ColorPicker
            label="Fundo do Resumo"
            value={config.colors.summaryBackground}
            onChange={handleSummaryBackgroundChange}
          />
        </div>

        <div className="exclusivity-toggle">
          <label className="toggle-label">
            <input
              type="checkbox"
              checked={config.showExclusivityTag}
              onChange={handleExclusivityToggle}
              className="toggle-checkbox"
            />
            <span className="toggle-slider"></span>
            <span className="toggle-text">Mostrar tag "Exclusividade"</span>
          </label>
        </div>

        <div className="color-preview-info">
          <div className="info-icon">ℹ️</div>
          <p>
            As alterações serão aplicadas em tempo real no preview. Clique em
            &quot;Salvar&quot; para persistir as mudanças.
          </p>
        </div>
      </div>
    </ConfigSection>
  );
}

export default ColorConfigSection;
