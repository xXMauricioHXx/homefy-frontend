import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { PdfConfigProvider, usePdfConfig } from "../contexts/PdfConfigContext";
import { fetchPdfById } from "../services/api";
import { generatePDFDownload } from "../utils/pdfGenerator";
import Button from "../components/Button";
import LoadingOverlay from "../components/LoadingOverlay";
import CoverPage from "../components/pdf/CoverPage";
import PropertyDescriptionPage from "../components/pdf/PropertyDescriptionPage";
import GalleryPage from "../components/pdf/GalleryPage";
import SummaryPage from "../components/pdf/SummaryPage";
import "./PDFPreviewMobilePage.css";

function PDFPreviewMobileContent({ data }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { config } = usePdfConfig();
  const [currentPage, setCurrentPage] = useState(0);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  // Get selected images from navigation state (if any)
  const selectedImages = location.state?.selectedImages || [];

  // Calculate total pages
  const galleryImages =
    selectedImages.length > 0 ? selectedImages : data.property.gallery || [];
  const totalPages = 3 + galleryImages.length; // Cover + Description + Gallery + Summary

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      const propertyName = `${data.brand.name}_${data.brand.location}`;
      await generatePDFDownload(propertyName);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      alert("Erro ao gerar PDF. Por favor, tente novamente.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const renderCurrentPage = () => {
    if (currentPage === 0) {
      // Cover Page
      return (
        <CoverPage
          brand={data.brand}
          mainImage={data.property.mainImage}
          colors={config.colors}
          showExclusivityTag={config.showExclusivityTag}
        />
      );
    } else if (currentPage === 1) {
      // Property Description Page
      return (
        <PropertyDescriptionPage
          property={data.property}
          colors={config.colors}
        />
      );
    } else if (currentPage >= 2 && currentPage < 2 + galleryImages.length) {
      // Gallery Pages
      const galleryIndex = currentPage - 2;
      return (
        <GalleryPage
          key={galleryIndex}
          image={galleryImages[galleryIndex]}
          brand={data.brand}
          propertyResume={data.property.resume}
          index={galleryIndex}
          colors={config.colors}
        />
      );
    } else {
      // Summary Page
      return <SummaryPage property={data.property} colors={config.colors} />;
    }
  };

  return (
    <div className="mobile-pdf-preview-container">
      <LoadingOverlay isVisible={isGeneratingPDF} message="Gerando PDF..." />
      {/* Top Navigation Bar */}
      <nav className="mobile-navbar">
        <div className="mobile-navbar-content">
          <button
            className="mobile-back-button"
            onClick={() => navigate("/")}
            aria-label="Voltar"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M19 12H5M5 12L12 19M5 12L12 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="mobile-navbar-logo">
            <span className="logo-text gradient-text">Homefy</span>
          </div>

          <div className="mobile-page-indicator">
            {currentPage + 1}/{totalPages}
          </div>
        </div>
      </nav>

      {/* PDF Content - Single Page View */}
      {data && (
        <div className="mobile-pdf-content">
          <div className="mobile-pdf-page-wrapper">{renderCurrentPage()}</div>

          {/* Navigation Controls */}
          <div className="mobile-navigation-controls">
            <button
              className="mobile-nav-button"
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              aria-label="Página anterior"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Anterior</span>
            </button>

            <div className="mobile-page-dots">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  className={`page-dot ${index === currentPage ? "active" : ""}`}
                  onClick={() => setCurrentPage(index)}
                  aria-label={`Ir para página ${index + 1}`}
                />
              ))}
            </div>

            <button
              className="mobile-nav-button"
              onClick={handleNextPage}
              disabled={currentPage === totalPages - 1}
              aria-label="Próxima página"
            >
              <span>Próxima</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Download/Print Button */}
          <button
            className="mobile-download-button"
            onClick={handleDownloadPDF}
            aria-label="Baixar PDF"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15M7 10L12 15M12 15L17 10M12 15V3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Hidden container for PDF generation */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              opacity: 0,
              pointerEvents: "none",
              zIndex: -1,
            }}
          >
            <div className="pdf-container">
              {/* Cover Page */}
              <CoverPage
                brand={data.brand}
                mainImage={data.property.mainImage}
                colors={config.colors}
                showExclusivityTag={config.showExclusivityTag}
              />
              {/* Property Description Page */}
              <PropertyDescriptionPage
                property={data.property}
                colors={config.colors}
              />
              {/* Gallery Pages */}
              {galleryImages.map((image, index) => (
                <GalleryPage
                  key={index}
                  image={image}
                  brand={data.brand}
                  propertyResume={data.property.resume}
                  index={index}
                  colors={config.colors}
                />
              ))}
              {/* Summary Page */}
              <SummaryPage property={data.property} colors={config.colors} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PDFPreviewMobilePage() {
  const { pdfId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPdfData = async () => {
      if (!pdfId || !user) {
        navigate("/");
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const token = await user.getIdToken();
        const pdfData = await fetchPdfById(pdfId, token);
        setData(pdfData);
      } catch (err) {
        console.error("Error loading PDF:", err);
        setError("Erro ao carregar PDF. Por favor, tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    loadPdfData();
  }, [pdfId, user, navigate]);

  // Loading State
  if (loading) {
    return (
      <div className="pdf-preview-mobile-container">
        <nav className="mobile-navbar">
          <div className="mobile-navbar-content">
            <div className="mobile-navbar-logo">
              <span className="logo-text gradient-text">Homefy</span>
            </div>
          </div>
        </nav>
        <div className="mobile-loading-container">
          <div className="mobile-spinner"></div>
          <p>Carregando PDF...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="pdf-preview-mobile-container">
        <nav className="mobile-navbar">
          <div className="mobile-navbar-content">
            <div className="mobile-navbar-logo">
              <span className="logo-text gradient-text">Homefy</span>
            </div>
          </div>
        </nav>
        <div className="mobile-error-container">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke="var(--color-error)"
              strokeWidth="2"
            />
            <path
              d="M12 8V12"
              stroke="var(--color-error)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M12 16H12.01"
              stroke="var(--color-error)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <p className="mobile-error-text">{error}</p>
          <Button variant="primary" onClick={() => navigate("/")}>
            Voltar para Home
          </Button>
        </div>
      </div>
    );
  }

  // Main content with PdfConfigProvider
  if (data) {
    const initialConfig = {
      ...data.config,
      propertyData: {
        condominium:
          data.config?.propertyData?.condominium ||
          data.property.condominium ||
          "",
        parking:
          data.config?.propertyData?.parking || data.property.parking || "",
        iptu: data.config?.propertyData?.iptu || data.property.iptu || "",
        area: data.config?.propertyData?.area || data.property.area || "",
        price: data.config?.propertyData?.price || data.property.price || "",
        pricePerSqm:
          data.config?.propertyData?.pricePerSqm ||
          data.property.pricePerSqm ||
          "",
        features:
          data.config?.propertyData?.features?.length > 0
            ? data.config.propertyData.features
            : data.property.features || [],
        infrastructures:
          data.config?.propertyData?.infrastructures?.length > 0
            ? data.config.propertyData.infrastructures
            : data.property.infrastructures || [],
      },
    };

    return (
      <PdfConfigProvider pdfId={pdfId} initialConfig={initialConfig}>
        <PDFPreviewMobileContent data={data} />
      </PdfConfigProvider>
    );
  }

  return null;
}

export default PDFPreviewMobilePage;
