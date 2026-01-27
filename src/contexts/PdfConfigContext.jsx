import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { updatePdfConfig } from "../services/api";

const PdfConfigContext = createContext();

const DEFAULT_CONFIG = {
  colors: {
    primary: "#ed6325",
    secondary: "#d45520",
  },
  // Prepared for future sections
  texts: {},
  images: {
    order: [],
    mainImage: null,
  },
};

export function PdfConfigProvider({ children, pdfId, initialConfig = null }) {
  const [config, setConfig] = useState(initialConfig || DEFAULT_CONFIG);
  const [hasChanges, setHasChanges] = useState(false);

  const updateColors = (colors) => {
    setConfig((prev) => ({
      ...prev,
      colors: { ...prev.colors, ...colors },
    }));
    setHasChanges(true);
  };

  const updateTexts = (texts) => {
    setConfig((prev) => ({
      ...prev,
      texts: { ...prev.texts, ...texts },
    }));
    setHasChanges(true);
  };

  const updateImages = (images) => {
    setConfig((prev) => ({
      ...prev,
      images: { ...prev.images, ...images },
    }));
    setHasChanges(true);
  };

  const resetConfig = () => {
    setConfig(DEFAULT_CONFIG);
    setHasChanges(true);
  };

  const saveConfig = async (token) => {
    try {
      if (!pdfId) {
        throw new Error("PDF ID is required to save configuration");
      }

      const result = await updatePdfConfig(pdfId, config, token);
      setHasChanges(false);
      return { success: true, data: result };
    } catch (error) {
      console.error("Error saving PDF configuration:", error);
      return { success: false, error };
    }
  };

  const value = {
    config,
    hasChanges,
    pdfId,
    updateColors,
    updateTexts,
    updateImages,
    resetConfig,
    saveConfig,
  };

  return (
    <PdfConfigContext.Provider value={value}>
      {children}
    </PdfConfigContext.Provider>
  );
}

PdfConfigProvider.propTypes = {
  children: PropTypes.node.isRequired,
  pdfId: PropTypes.string,
  initialConfig: PropTypes.shape({
    colors: PropTypes.shape({
      primary: PropTypes.string,
      secondary: PropTypes.string,
    }),
    texts: PropTypes.object,
    images: PropTypes.shape({
      order: PropTypes.array,
      mainImage: PropTypes.string,
    }),
  }),
};

export function usePdfConfig() {
  const context = useContext(PdfConfigContext);
  if (!context) {
    throw new Error("usePdfConfig must be used within a PdfConfigProvider");
  }
  return context;
}

export default PdfConfigContext;
