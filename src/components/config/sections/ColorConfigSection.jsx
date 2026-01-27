import { usePdfConfig } from "../../../contexts/PdfConfigContext";
import ConfigSection from "../ConfigSection";
import ColorPicker from "../ColorPicker";
import "./ColorConfigSection.css";

function ColorConfigSection() {
  const { config, updateColors } = usePdfConfig();

  const handlePrimaryColorChange = (color) => {
    updateColors({ primary: color });
  };

  const handleSecondaryColorChange = (color) => {
    updateColors({ secondary: color });
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
