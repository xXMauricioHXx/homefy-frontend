import { usePdfConfig } from "../../contexts/PdfConfigContext";
import { useAuth } from "../../contexts/AuthContext";
import Button from "../Button";
import ColorConfigSection from "./sections/ColorConfigSection";
import "./ConfigPanel.css";

function ConfigPanel({ isOpen, onClose }) {
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

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="config-panel-overlay" onClick={onClose}></div>}

      {/* Drawer */}
      <aside className={`config-panel ${isOpen ? "config-panel-open" : ""}`}>
        <div className="config-panel-header">
          <h2 className="config-panel-title">
            <span className="config-icon">⚙️</span>
            Configurações
          </h2>
          <button
            className="config-panel-close"
            onClick={onClose}
            aria-label="Fechar"
          >
            ✕
          </button>
        </div>
        <p className="config-panel-subtitle">
          Personalize seu PDF de acordo com suas preferências
        </p>

        <div className="config-panel-sections">
          <ColorConfigSection />
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
