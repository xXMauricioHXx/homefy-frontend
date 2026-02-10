import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { updatePdfConfig } from "../services/api";

const PdfConfigContext = createContext();

const DEFAULT_CONFIG = {
  colors: {
    primary: "#ed6325",
    secondary: "#d45520",
    titleColor: "#ffffff",
    summaryBackground: "#1a1a1a",
  },
  // Prepared for future sections
  texts: {},
  images: {
    order: [],
    mainImage: null,
  },
  showExclusivityTag: true,
  propertyData: {
    condominium: "",
    parking: "",
    iptu: "",
    area: "",
    price: "",
    pricePerSqm: "",
    features: [],
    infrastructures: [],
  },
};

export function PdfConfigProvider({ children, pdfId, initialConfig = null }) {
  // Deep merge initialConfig with DEFAULT_CONFIG to ensure all defaults are preserved
  const mergedConfig = initialConfig
    ? {
        ...DEFAULT_CONFIG,
        ...initialConfig,
        colors: {
          ...DEFAULT_CONFIG.colors,
          ...(initialConfig.colors || {}),
        },
        propertyData: {
          ...DEFAULT_CONFIG.propertyData,
          ...(initialConfig.propertyData || {}),
        },
        images: {
          ...DEFAULT_CONFIG.images,
          ...(initialConfig.images || {}),
        },
      }
    : DEFAULT_CONFIG;

  const [config, setConfig] = useState(mergedConfig);
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

  const updateShowExclusivityTag = (show) => {
    setConfig((prev) => ({
      ...prev,
      showExclusivityTag: show,
    }));
    setHasChanges(true);
  };

  const updatePropertyData = (data) => {
    setConfig((prev) => ({
      ...prev,
      propertyData: { ...prev.propertyData, ...data },
    }));
    setHasChanges(true);
  };

  const addFeature = (feature) => {
    setConfig((prev) => ({
      ...prev,
      propertyData: {
        ...prev.propertyData,
        features: [...prev.propertyData.features, feature],
      },
    }));
    setHasChanges(true);
  };

  const removeFeature = (index) => {
    setConfig((prev) => ({
      ...prev,
      propertyData: {
        ...prev.propertyData,
        features: prev.propertyData.features.filter((_, i) => i !== index),
      },
    }));
    setHasChanges(true);
  };

  const addInfrastructure = (infrastructure) => {
    setConfig((prev) => ({
      ...prev,
      propertyData: {
        ...prev.propertyData,
        infrastructures: [...prev.propertyData.infrastructures, infrastructure],
      },
    }));
    setHasChanges(true);
  };

  const removeInfrastructure = (index) => {
    setConfig((prev) => ({
      ...prev,
      propertyData: {
        ...prev.propertyData,
        infrastructures: prev.propertyData.infrastructures.filter(
          (_, i) => i !== index,
        ),
      },
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
    updateShowExclusivityTag,
    updatePropertyData,
    addFeature,
    removeFeature,
    addInfrastructure,
    removeInfrastructure,
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
      titleColor: PropTypes.string,
      summaryBackground: PropTypes.string,
    }),
    texts: PropTypes.object,
    images: PropTypes.shape({
      order: PropTypes.array,
      mainImage: PropTypes.string,
    }),
    showExclusivityTag: PropTypes.bool,
    propertyData: PropTypes.shape({
      condominium: PropTypes.string,
      parking: PropTypes.string,
      iptu: PropTypes.string,
      area: PropTypes.string,
      price: PropTypes.string,
      pricePerSqm: PropTypes.string,
      features: PropTypes.arrayOf(PropTypes.string),
      infrastructures: PropTypes.arrayOf(PropTypes.string),
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
