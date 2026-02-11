import { usePdfConfig } from "../../contexts/PdfConfigContext";
import { useAuth } from "../../contexts/AuthContext";
import Button from "../Button";
import ColorConfigSection from "./sections/ColorConfigSection";
import SummaryConfigSection from "./sections/SummaryConfigSection";
import "./ConfigPanel.css";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import WysiwygOutlinedIcon from "@mui/icons-material/WysiwygOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

function ConfigPanel({ isOpen, onClose, activeSection = null }) {
  const { hasChanges, resetConfig, saveConfig } = usePdfConfig();
  const { user } = useAuth();

  const handleSave = async () => {
    try {
      const token = await user.getIdToken();
      await saveConfig(token);
      // TODO: Show success message
      console.log("Configurações salvas com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar configurações:", error);
      // TODO: Show error message
    }
  };

  const handleReset = () => {
    if (
      window.confirm(
        "Tem certeza que deseja resetar todas as configurações para os valores padrão?",
      )
    ) {
      resetConfig();
    }
  };

  // Determine which sections to show - now always show only active section when specified
  const showColors = activeSection === "colors" || activeSection === null;
  const showSummary = activeSection === "summary" || activeSection === null;

  // Get panel title based on active section
  const getPanelTitle = () => {
    if (activeSection === "colors") return "Cores";
    if (activeSection === "summary") return "Resumo";
    return "Configurações";
  };

  // Get panel icon based on active section
  const getPanelIcon = () => {
    if (activeSection === "colors") return <ColorLensOutlinedIcon />;
    if (activeSection === "summary") return <WysiwygOutlinedIcon />;
    return <SettingsOutlinedIcon />;
  };

  // Get panel subtitle based on active section
  const getPanelSubtitle = () => {
    if (activeSection === "colors") return "Personalize as cores do seu PDF";
    if (activeSection === "summary") return "Edite as informações do imóvel";
    return "Personalize seu PDF de acordo com suas preferências";
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="config-panel-overlay" onClick={onClose}></div>}

      {/* Drawer */}
      <aside className={`config-panel ${isOpen ? "config-panel-open" : ""}`}>
        <div className="config-panel-header">
          <h2 className="config-panel-title">
            <span className="config-icon">{getPanelIcon()}</span>
            {getPanelTitle()}
          </h2>
          <button
            className="config-panel-close"
            onClick={onClose}
            aria-label="Fechar"
          >
            ✕
          </button>
        </div>
        <p className="config-panel-subtitle">{getPanelSubtitle()}</p>

        <div className="config-panel-sections">
          {showColors && <ColorConfigSection />}
          {showSummary && <SummaryConfigSection />}
          {/* Future sections will be added here */}
          {/* <TextConfigSection /> */}
          {/* <ImageOrderSection /> */}
          {/* <MainImageSection /> */}
        </div>

        <div className="config-panel-actions">
          <Button
            variant="secondary"
            onClick={handleReset}
            disabled={!hasChanges}
          >
            Resetar
          </Button>
          <Button variant="primary" onClick={handleSave} disabled={!hasChanges}>
            Salvar
          </Button>
        </div>

        {hasChanges && (
          <div className="unsaved-changes-indicator">
            <span className="indicator-dot"></span>
            <span>Alterações não salvas</span>
          </div>
        )}
      </aside>
    </>
  );
}

export default ConfigPanel;
