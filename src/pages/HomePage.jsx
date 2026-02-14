import { useAuth } from "../contexts/AuthContext";
import { usePdfCache } from "../contexts/PdfCacheContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import { createPdf, fetchPropertyData } from "../services/api";
import RecentPdfsSection from "../components/RecentPdfsSection";
import Modal from "../components/Modal";
import ActionSelectionModal from "../components/ActionSelectionModal";
import Stepper from "../components/Stepper";
import ImageSelectionStep from "../components/ImageSelectionStep";
import DescriptionStep from "../components/DescriptionStep";
import { showErrorToast } from "../components/Toast";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import "./HomePage.css";

function HomePage() {
  const { user } = useAuth();
  const { invalidateAll } = usePdfCache();
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [propertyData, setPropertyData] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [description, setDescription] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [actionMode, setActionMode] = useState(null); // 'pdf' or 'download'

  const handleGeneratePDF = async () => {
    // Validate URL
    if (!url.trim()) {
      setError("Por favor, insira uma URL válida");
      return;
    }

    // Basic URL validation
    try {
      new URL(url);
    } catch {
      setError(
        "URL inválida. Por favor, insira uma URL completa (ex: https://exemplo.com)",
      );
      return;
    }

    setError("");
    setLoading(true);

    try {
      // Get Firebase authentication token
      const token = await user.getIdToken();

      // Call API with token
      const response = await fetchPropertyData(url, token);

      // Store property data and open action selection modal
      setPropertyData(response);
      setSelectedImages([]);
      setDescription(response.data.property?.description || "");
      setCurrentStep(1);
      setIsActionModalOpen(true);
    } catch (err) {
      setError("Erro ao gerar PDF. Por favor, tente novamente.");
      console.error("Error generating PDF:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleActionModalClose = () => {
    setIsActionModalOpen(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setPropertyData(null);
    setSelectedImages([]);
    setDescription("");
    setCurrentStep(1);
    setActionMode(null);
  };

  const handlePdfAction = () => {
    setActionMode("pdf");
    setIsActionModalOpen(false);
    setIsModalOpen(true);
  };

  const handleDownloadAction = () => {
    setActionMode("download");
    setIsActionModalOpen(false);
    setIsModalOpen(true);
  };

  const handleImageSelectionChange = (images) => {
    setSelectedImages(images);
  };

  const handleDescriptionChange = (text) => {
    setDescription(text);
  };

  const handleStepperNext = () => {
    // For now, only one step exists
    // Future steps will be added here
    setCurrentStep((prev) => prev + 1);
  };

  const handleStepperPrevious = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const handleStepperFinish = async () => {
    if (actionMode === "pdf") {
      await handlePdfGeneration();
    } else if (actionMode === "download") {
      await handleImageDownload();
    }
  };

  const handlePdfGeneration = async () => {
    // Process selected images and navigate to PDF preview
    if (selectedImages.length > 0 && propertyData) {
      try {
        setIsProcessing(true);

        // Get Firebase authentication token
        const token = await user.getIdToken();

        const pdfData = {
          ...propertyData.data,
          property: {
            ...propertyData.data.property,
            gallery: selectedImages,
            description,
          },
          type: "pdf",
          url,
        };

        // Call API to create PDF
        const createdPdf = await createPdf(pdfData, token);

        console.log("Upload response:", createdPdf);

        // Invalidate cache after creating new PDF
        invalidateAll();

        // Update state with processed data
        setPropertyData({
          data: createdPdf,
        });

        // Close modal first
        handleModalClose();

        // Then navigate to PDF preview
        // Small delay to ensure modal closes before navigation
        setTimeout(() => {
          navigate(`/pdf-preview/${createdPdf.pdfId}`);
        }, 100);
      } catch (err) {
        console.error("Error processing images:", err);

        // Check if error is due to no credits available
        if (err.code === "NO_CREDITS_AVAILABLE") {
          showErrorToast("Créditos insuficientes.");
          // Close modal when credits are not available
          handleModalClose();
        } else {
          setError("Erro ao processar imagens. Por favor, tente novamente.");
        }

        setIsProcessing(false);
      }
    }
  };

  const handleImageDownload = async () => {
    if (selectedImages.length > 0) {
      try {
        setIsProcessing(true);

        // Get Firebase authentication token
        const token = await user.getIdToken();
        const pdfData = {
          ...propertyData.data,
          property: {
            ...propertyData.data.property,
            gallery: selectedImages,
            description,
          },
          type: "gallery",
          url,
        };

        // Call API to create PDF
        const createdPdf = await createPdf(pdfData, token);

        const imageUrls = createdPdf.property?.gallery || [];

        if (!Array.isArray(imageUrls)) {
          throw new Error("Invalid response format from server");
        }

        // Create ZIP file
        const zip = new JSZip();
        const imageFolder = zip.folder("imagens");

        // Fetch and add each image to ZIP
        const imagePromises = imageUrls.map(async (imageUrl, index) => {
          try {
            const imageResponse = await fetch(imageUrl);
            const imageBlob = await imageResponse.blob();
            const extension = imageUrl.split(".").pop().split("?")[0] || "jpg";
            imageFolder.file(`imagem_${index + 1}.${extension}`, imageBlob);
          } catch (err) {
            console.error(`Error fetching image ${index + 1}:`, err);
          }
        });

        await Promise.all(imagePromises);

        // Generate ZIP file
        const zipBlob = await zip.generateAsync({ type: "blob" });

        // Trigger download
        const propertyName = propertyData.data.property?.title || "imovel";
        const sanitizedName = propertyName
          .replace(/[^a-z0-9]/gi, "_")
          .toLowerCase();
        saveAs(zipBlob, `${sanitizedName}_imagens.zip`);

        // Close modal
        handleModalClose();
      } catch (err) {
        console.error("Error downloading images:", err);
        setError("Erro ao baixar imagens. Por favor, tente novamente.");
        setIsProcessing(false);
      }
    }
  };

  return (
    <div className="home-container">
      {/* Top Navigation Bar */}
      <Header />

      {/* Animated Background */}
      <div className="home-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      {/* Main Content */}
      <main className="home-main">
        <div className="hero-section">
          <h1 className="hero-title">
            Transforme imóveis em
            <span className="gradient-text"> PDFs incríveis</span>
          </h1>
          <p className="hero-subtitle">
            Cole a URL da imobiliária e crie apresentações profissionais em
            segundos
          </p>

          <div className="url-input-container">
            <div className="input-wrapper">
              <svg
                className="input-icon"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M8.5 14.5L3.5 9.5L8.5 4.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16.5 9.5H3.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input
                type="url"
                className={`url-input ${error ? "url-input-error" : ""}`}
                placeholder="https://exemplo.com/imovel/12345"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  setError("");
                }}
                onKeyPress={(e) =>
                  e.key === "Enter" && !loading && handleGeneratePDF()
                }
                disabled={loading}
              />
            </div>
            <Button
              variant="primary"
              onClick={handleGeneratePDF}
              disabled={loading}
            >
              {loading ? "Transformando..." : "Transformar"}
            </Button>
          </div>

          {error && (
            <div className="error-message">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M10 6V10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M10 14H10.01"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              {error}
            </div>
          )}

          {/* <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3 className="feature-title">Rápido</h3>
              <p className="feature-description">Gere PDFs em segundos</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3 className="feature-title">Profissional</h3>
              <p className="feature-description">Design moderno e elegante</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3 className="feature-title">Responsivo</h3>
              <p className="feature-description">
                Perfeito em qualquer dispositivo
              </p>
            </div>
          </div> */}
        </div>

        {/* Recent PDFs Section */}
        <RecentPdfsSection user={user} />
      </main>

      {/* Action Selection Modal */}
      <ActionSelectionModal
        isOpen={isActionModalOpen}
        onClose={handleActionModalClose}
        onPdfAction={handlePdfAction}
        onDownloadAction={handleDownloadAction}
      />

      {/* Image Selection Modal */}
      {propertyData && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          title={
            actionMode === "pdf"
              ? "Personalizar PDF"
              : "Selecionar Imagens para Download"
          }
          size="large"
        >
          <Stepper
            steps={
              actionMode === "pdf"
                ? [
                    {
                      id: "images",
                      label: "Imagens",
                      component: (
                        <ImageSelectionStep
                          images={propertyData.data.property?.gallery || []}
                          onSelectionChange={handleImageSelectionChange}
                          maxSelection={parseInt(
                            import.meta.env.VITE_MAX_IMAGES_PER_PDF || "10",
                          )}
                        />
                      ),
                    },
                    {
                      id: "description",
                      label: "Descrição",
                      component: (
                        <DescriptionStep
                          description={description}
                          onDescriptionChange={handleDescriptionChange}
                          maxLength={2000}
                        />
                      ),
                    },
                  ]
                : [
                    {
                      id: "images",
                      label: "Imagens",
                      component: (
                        <ImageSelectionStep
                          images={propertyData.data.property?.gallery || []}
                          onSelectionChange={handleImageSelectionChange}
                          maxSelection={parseInt(
                            import.meta.env.VITE_MAX_IMAGES_PER_PDF || "10",
                          )}
                        />
                      ),
                    },
                  ]
            }
            currentStep={currentStep}
            onStepChange={setCurrentStep}
            canGoNext={selectedImages.length > 0 && !isProcessing}
            canGoPrevious={!isProcessing}
            onNext={handleStepperNext}
            onPrevious={handleStepperPrevious}
            onFinish={handleStepperFinish}
            isLastStep={
              actionMode === "pdf" ? currentStep === 2 : currentStep === 1
            }
            isProcessing={isProcessing}
            processingMessage={
              actionMode === "pdf" ? "Criando PDF..." : "Baixando imagens..."
            }
          />
        </Modal>
      )}
    </div>
  );
}

export default HomePage;
