import { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { fetchGalleryByPdfId } from "../services/api";
import { useGalleryDownload } from "../hooks/useGalleryDownload";
import GalleryHeader from "../components/GalleryHeader";
import GalleryGrid from "../components/GalleryGrid";
import GalleryLightbox from "../components/GalleryLightbox";
import GalleryBottomBar from "../components/GalleryBottomBar";
import "./GalleryPage.css";

function GalleryPage() {
  const navigate = useNavigate();
  const { pdfId } = useParams();
  const { user } = useAuth();
  const {
    downloadSingleImage,
    downloadAsZip,
    isDownloading,
    downloadProgress,
  } = useGalleryDownload();

  const [galleryData, setGalleryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Fetch gallery data by pdfId
  useEffect(() => {
    const loadGallery = async () => {
      if (!user || !pdfId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const token = await user.getIdToken();
        const data = await fetchGalleryByPdfId(pdfId, token);
        setGalleryData(data);
      } catch (err) {
        console.error("Error loading gallery:", err);
        setError("Erro ao carregar galeria. Por favor, tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    loadGallery();
  }, [user, pdfId]);

  // Extract images from gallery with deduplication
  const images = useMemo(() => {
    if (!galleryData) return [];

    const { property } = galleryData;
    let imageList = [];

    // Primary source: property.gallery
    if (property.gallery && property.gallery.length > 0) {
      imageList = [...property.gallery];
    } else {
      // Fallback: mainImage + sideImages
      if (property.mainImage) {
        imageList.push(property.mainImage);
      }
      if (property.sideImages && property.sideImages.length > 0) {
        imageList.push(...property.sideImages);
      }
    }

    // Remove duplicates
    const uniqueImages = [...new Set(imageList)];
    console.log("Gallery images:", uniqueImages.length, uniqueImages);
    return uniqueImages;
  }, [galleryData]);

  const handleBack = () => {
    navigate("/");
  };

  const handleImageClick = (index) => {
    if (isSelectionMode) {
      toggleImageSelection(index);
    } else {
      setCurrentImageIndex(index);
      setLightboxOpen(true);
    }
  };

  const toggleImageSelection = (index) => {
    const imageUrl = images[index];
    setSelectedImages((prev) => {
      if (prev.includes(imageUrl)) {
        return prev.filter((url) => url !== imageUrl);
      } else {
        return [...prev, imageUrl];
      }
    });
  };

  const toggleSelectionMode = () => {
    setIsSelectionMode((prev) => !prev);
    if (isSelectionMode) {
      setSelectedImages([]);
    }
  };

  const handleDownloadAll = async () => {
    if (!galleryData) return;

    const imagesToDownload =
      isSelectionMode && selectedImages.length > 0 ? selectedImages : images;

    await downloadAsZip(
      imagesToDownload,
      galleryData.brand.name,
      galleryData.property.reference,
    );
  };

  const handleDownloadSingle = async (imageUrl, index) => {
    if (!galleryData) return;

    const filename = `homefy_${galleryData.brand.name.toLowerCase().replace(/[^a-z0-9]/gi, "_")}_${galleryData.property.reference}_${String(index + 1).padStart(2, "0")}.jpg`;
    await downloadSingleImage(imageUrl, filename);
  };

  const handleLightboxClose = () => {
    setLightboxOpen(false);
  };

  const handleLightboxNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handleLightboxPrevious = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Loading state
  if (loading) {
    return (
      <div className="gallery-page">
        <div className="gallery-loading">
          <div className="loading-spinner"></div>
          <p>Carregando galeria...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="gallery-page">
        <div className="gallery-error">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M12 8V12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M12 16H12.01"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <h3>{error}</h3>
          <button
            className="retry-button"
            onClick={() => window.location.reload()}
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (!galleryData || images.length === 0) {
    return (
      <div className="gallery-page">
        <GalleryHeader
          brandName={galleryData?.brand?.name || "Galeria"}
          location={galleryData?.brand?.location}
          reference={galleryData?.property?.reference}
          onBack={handleBack}
        />
        <div className="gallery-empty">
          <div className="empty-icon">🖼️</div>
          <h3>Nenhuma imagem encontrada</h3>
          <p>Este imóvel não possui imagens disponíveis.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="gallery-page">
      <GalleryHeader
        brandName={galleryData.brand.name}
        location={galleryData.brand.location}
        reference={galleryData.property.reference}
        onBack={handleBack}
      />

      <div className="gallery-content">
        <GalleryGrid
          images={images}
          selectedImages={selectedImages}
          isSelectionMode={isSelectionMode}
          onImageClick={handleImageClick}
        />
      </div>

      <GalleryBottomBar
        totalImages={images.length}
        selectedCount={selectedImages.length}
        isSelectionMode={isSelectionMode}
        isDownloading={isDownloading}
        downloadProgress={downloadProgress}
        onToggleSelection={toggleSelectionMode}
        onDownload={handleDownloadAll}
      />

      {lightboxOpen && (
        <GalleryLightbox
          images={images}
          currentIndex={currentImageIndex}
          onClose={handleLightboxClose}
          onNext={handleLightboxNext}
          onPrevious={handleLightboxPrevious}
          onDownload={() =>
            handleDownloadSingle(images[currentImageIndex], currentImageIndex)
          }
        />
      )}
    </div>
  );
}

export default GalleryPage;
