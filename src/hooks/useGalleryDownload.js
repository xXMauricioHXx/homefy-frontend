import { useState, useCallback } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";

/**
 * Custom hook for handling gallery image downloads
 * Supports individual and batch (ZIP) downloads with progress tracking
 */
export function useGalleryDownload() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState({
    current: 0,
    total: 0,
  });
  const [error, setError] = useState(null);

  /**
   * Download a single image
   * @param {string} imageUrl - URL of the image to download
   * @param {string} filename - Desired filename for the download
   */
  const downloadSingleImage = useCallback(async (imageUrl, filename) => {
    try {
      setError(null);

      // Try to fetch and download the image
      const response = await fetch(imageUrl);

      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Create temporary link and trigger download
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up
      window.URL.revokeObjectURL(url);

      return true;
    } catch (err) {
      console.error("Error downloading image:", err);

      // CORS fallback: open in new tab
      window.open(imageUrl, "_blank");
      setError("Não foi possível baixar a imagem. Abrindo em nova aba...");

      return false;
    }
  }, []);

  /**
   * Generate a friendly filename for an image
   * @param {string} brandName - Brand name
   * @param {string} reference - Property reference
   * @param {number} index - Image index (1-based)
   * @param {string} imageUrl - Original image URL
   */
  const generateFilename = useCallback(
    (brandName, reference, index, imageUrl) => {
      // Create slug from brand name
      const brandSlug = brandName
        .toLowerCase()
        .replace(/[^a-z0-9]/gi, "_")
        .replace(/_+/g, "_")
        .replace(/^_|_$/g, "");

      // Extract extension from URL
      const urlParts = imageUrl.split(".");
      const extension = urlParts[urlParts.length - 1].split("?")[0] || "jpg";

      // Format: homefy_brandslug_ref_01.jpg
      const paddedIndex = String(index).padStart(2, "0");
      return `homefy_${brandSlug}_${reference}_${paddedIndex}.${extension}`;
    },
    [],
  );

  /**
   * Download multiple images as a ZIP file
   * @param {Array<string>} imageUrls - Array of image URLs
   * @param {string} brandName - Brand name for filename
   * @param {string} reference - Property reference for filename
   * @param {Function} onProgress - Optional progress callback
   */
  const downloadAsZip = useCallback(
    async (imageUrls, brandName, reference, onProgress) => {
      if (!imageUrls || imageUrls.length === 0) {
        setError("Nenhuma imagem selecionada");
        return false;
      }

      try {
        setIsDownloading(true);
        setError(null);
        setDownloadProgress({ current: 0, total: imageUrls.length });

        const zip = new JSZip();
        const imageFolder = zip.folder("imagens");

        // Download images with concurrency limit (3 at a time)
        const concurrencyLimit = 3;
        let completed = 0;

        for (let i = 0; i < imageUrls.length; i += concurrencyLimit) {
          const batch = imageUrls.slice(i, i + concurrencyLimit);

          const batchPromises = batch.map(async (imageUrl, batchIndex) => {
            const globalIndex = i + batchIndex;

            try {
              const response = await fetch(imageUrl);

              if (!response.ok) {
                throw new Error(`Failed to fetch image ${globalIndex + 1}`);
              }

              const blob = await response.blob();
              const filename = generateFilename(
                brandName,
                reference,
                globalIndex + 1,
                imageUrl,
              );

              imageFolder.file(filename, blob);

              completed++;
              setDownloadProgress({
                current: completed,
                total: imageUrls.length,
              });

              if (onProgress) {
                onProgress(completed, imageUrls.length);
              }
            } catch (err) {
              console.error(`Error fetching image ${globalIndex + 1}:`, err);
              // Continue with other images even if one fails
            }
          });

          await Promise.all(batchPromises);
        }

        // Generate ZIP file
        const zipBlob = await zip.generateAsync({
          type: "blob",
          compression: "DEFLATE",
          compressionOptions: { level: 6 },
        });

        // Create ZIP filename
        const brandSlug = brandName
          .toLowerCase()
          .replace(/[^a-z0-9]/gi, "_")
          .replace(/_+/g, "_")
          .replace(/^_|_$/g, "");

        const zipFilename = `homefy_${brandSlug}_${reference}_imagens.zip`;

        // Trigger download
        saveAs(zipBlob, zipFilename);

        setIsDownloading(false);
        setDownloadProgress({ current: 0, total: 0 });

        return true;
      } catch (err) {
        console.error("Error creating ZIP:", err);
        setError("Erro ao criar arquivo ZIP. Por favor, tente novamente.");
        setIsDownloading(false);
        setDownloadProgress({ current: 0, total: 0 });

        return false;
      }
    },
    [generateFilename],
  );

  /**
   * Cancel ongoing download
   */
  const cancelDownload = useCallback(() => {
    setIsDownloading(false);
    setDownloadProgress({ current: 0, total: 0 });
    setError(null);
  }, []);

  return {
    downloadSingleImage,
    downloadAsZip,
    cancelDownload,
    isDownloading,
    downloadProgress,
    error,
    generateFilename,
  };
}
