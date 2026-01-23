import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { fetchPdfById } from "../services/api";
import Button from "../components/Button";
import CoverPage from "../components/pdf/CoverPage";
import PropertyDescriptionPage from "../components/pdf/PropertyDescriptionPage";
import GalleryPage from "../components/pdf/GalleryPage";
import SummaryPage from "../components/pdf/SummaryPage";
import "../pages/PDF.css";

function PDFPreviewPage() {
  const { pdfId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get selected images from navigation state (if any)
  const selectedImages = location.state?.selectedImages || [];

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

  // Agent data - can be customized or fetched from user profile
  const agent = {
    name: "Maurício Henrique",
    specialization: "Corretor de Imóveis",
    phone: "(55) 99999-9999",
    email: "mauricio@corretor.com",
    photo: null, // Will use default image
  };

  return (
    <div className="pdf-preview-container">
      {/* Top Navigation Bar - Fixed for navigation */}
      <nav
        className="navbar"
        style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000 }}
      >
        <div className="navbar-content">
          <div className="navbar-logo">
            <span className="logo-text gradient-text">Homefy</span>
          </div>

          <div className="navbar-actions">
            <Button variant="primary" onClick={() => navigate("/")}>
              Voltar
            </Button>
            {data && (
              <Button variant="primary" onClick={() => window.print()}>
                Imprimir PDF
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Loading State */}
      {loading && (
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
      )}

      {/* Error State */}
      {error && (
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
      )}

      {/* PDF Content - Scrollable */}
      {data && !loading && !error && (
        <div className="pdf-container" style={{ marginTop: "80px" }}>
          {/* Page 1: Cover */}
          <CoverPage brand={data.brand} mainImage={data.property.mainImage} />
          {/* Page 2: Property Description */}
          <PropertyDescriptionPage property={data.property} />{" "}
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
              />
            ));
          })()}
          {/* Final Page: Summary and Contact */}
          <SummaryPage property={data.property} agent={agent} />
        </div>
      )}
    </div>
  );
}

export default PDFPreviewPage;
