import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { usePdfCache } from "../contexts/PdfCacheContext";
import { PdfConfigProvider, usePdfConfig } from "../contexts/PdfConfigContext";
import { generatePDFDownload } from "../utils/pdfGenerator";
import { useGalleryDownload } from "../hooks/useGalleryDownload";
import Button from "../components/Button";
import ConfigPanel from "../components/config/ConfigPanel";
import FloatingConfigButtons from "../components/config/FloatingConfigButtons";
import LoadingOverlay from "../components/LoadingOverlay";
import CoverPage from "../components/pdf/CoverPage";
import PropertyDescriptionPage from "../components/pdf/PropertyDescriptionPage";
import GalleryPage from "../components/pdf/GalleryPage";
import SummaryPage from "../components/pdf/SummaryPage";
import "../pages/PDF.css";
import "../pages/PDFPreviewPage.css";

function PDFPreviewContent({ data }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { config } = usePdfConfig();
  const { downloadAsZip } = useGalleryDownload();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  // Get selected images from navigation state (if any)
  const selectedImages = location.state?.selectedImages || [];

  const handleSectionSelect = (sectionId) => {
    setActiveSection(sectionId);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    // Reset active section after animation completes
    setTimeout(() => setActiveSection(null), 300);
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

  const handleDownloadImages = async () => {
    const galleryImages = data.property.gallery || [];
    if (galleryImages.length === 0) {
      alert("Este PDF não possui imagens para download.");
      return;
    }

    await downloadAsZip(
      galleryImages,
      data.brand.name,
      data.property.reference,
    );
  };

  return (
    <div className="pdf-preview-container">
      <LoadingOverlay isVisible={isGeneratingPDF} message="Gerando PDF..." />
      {/* Top Navigation Bar - Fixed for navigation */}
      <nav
        className="navbar"
        style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000 }}
      >
        <div className="navbar-content">
          <div className="navbar-logo">
            <span className="logo-text gradient-text">
              <img src="/logo.png" alt="Logo" style={{ height: "32px" }} />
            </span>
          </div>

          <div className="navbar-actions">
            <Button variant="primary" onClick={() => navigate("/app")}>
              Voltar
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content - PDF Preview + Config Panel */}
      {data && (
        <div className="pdf-preview-layout">
          {/* PDF Content - Scrollable */}
          <div className="pdf-container" style={{ marginTop: "80px" }}>
            {/* Page 1: Cover */}
            <CoverPage
              brand={data.brand}
              mainImage={data.property.mainImage}
              colors={config.colors}
              showExclusivityTag={config.showExclusivityTag}
            />
            {/* Page 2: Property Description */}
            <PropertyDescriptionPage
              property={data.property}
              colors={config.colors}
            />
            {/* Gallery Pages - One image per page */}
            {(() => {
              // Use selected images if available, otherwise use all gallery images
              const galleryImages =
                selectedImages.length > 0
                  ? selectedImages
                  : data.property.gallery || [];

              return galleryImages.map((image, index) => (
                <GalleryPage
                  key={index}
                  image={image}
                  brand={data.brand}
                  propertyResume={data.property.resume}
                  index={index}
                  colors={config.colors}
                />
              ));
            })()}
            {/* Final Page: Summary and Contact */}
            <SummaryPage property={data.property} colors={config.colors} />
          </div>

          {/* Floating Configuration Buttons - Now for all screen sizes */}
          <FloatingConfigButtons
            onSectionSelect={handleSectionSelect}
            onDownload={handleDownloadPDF}
            onDownloadImages={handleDownloadImages}
          />

          {/* Configuration Drawer */}
          <ConfigPanel
            isOpen={isDrawerOpen}
            onClose={handleCloseDrawer}
            activeSection={activeSection}
          />
        </div>
      )}
    </div>
  );
}

function PDFPreviewPage() {
  const { pdfId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getPdfById } = usePdfCache();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is on mobile device and redirect to mobile version
    const isMobileDevice = () => {
      //  const userAgent = navigator.userAgent.toLowerCase();
      // const mobileKeywords = [
      //   "android",
      //   "webos",
      //   "iphone",
      //   "ipad",
      //   "ipod",
      //   "blackberry",
      //   "windows phone",
      // ];
      return (
        // mobileKeywords.some((keyword) => userAgent.includes(keyword)) ||
        window.innerWidth < 768
      );
    };

    if (isMobileDevice()) {
      navigate(`/pdf-preview-mobile/${pdfId}`, {
        replace: true,
        state: location.state,
      });
      return;
    }

    const loadPdfData = async () => {
      if (!pdfId || !user) {
        navigate("/");
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const token = await user.getIdToken();
        const pdfData = await getPdfById(pdfId, token);
        setData(pdfData);
      } catch (err) {
        console.error("Error loading PDF:", err);
        setError("Erro ao carregar PDF. Por favor, tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    loadPdfData();
  }, [pdfId, user, navigate, getPdfById]);

  // Loading State
  if (loading) {
    return (
      <div className="pdf-preview-container">
        <nav
          className="navbar"
          style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000 }}
        >
          <div className="navbar-content">
            <div className="navbar-logo">
              <span className="logo-text gradient-text">
                <img src="/logo.png" alt="Logo" style={{ height: "32px" }} />
              </span>
            </div>
          </div>
        </nav>
        <div
          style={{
            marginTop: "80px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "calc(100vh - 80px)",
            gap: "1rem",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              border: "4px solid rgba(237, 99, 37, 0.1)",
              borderTopColor: "var(--color-accent-primary)",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          ></div>
          <p style={{ color: "var(--color-text-secondary)" }}>
            Carregando PDF...
          </p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="pdf-preview-container">
        <nav
          className="navbar"
          style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000 }}
        >
          <div className="navbar-content">
            <div className="navbar-logo">
              <span className="logo-text gradient-text">
                <img src="/logo.png" alt="Logo" style={{ height: "32px" }} />
              </span>
            </div>
          </div>
        </nav>
        <div
          style={{
            marginTop: "80px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "calc(100vh - 80px)",
            gap: "1rem",
            padding: "2rem",
          }}
        >
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
          <p style={{ color: "var(--color-error)", fontSize: "1.125rem" }}>
            {error}
          </p>
          <Button variant="primary" onClick={() => navigate("/")}>
            Voltar para Home
          </Button>
        </div>
      </div>
    );
  }

  // Main content with PdfConfigProvider initialized with config from API
  if (data) {
    // Merge property data into config if not already set
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
        <PDFPreviewContent data={data} />
      </PdfConfigProvider>
    );
  }

  return null;
}

export default PDFPreviewPage;
