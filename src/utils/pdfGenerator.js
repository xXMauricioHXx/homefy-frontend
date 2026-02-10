import jsPDF from "jspdf";
import html2canvas from "html2canvas";

/**
 * Generates a PDF from the PDF preview pages
 * @param {string} propertyName - Name of the property for the PDF filename
 * @returns {Promise<void>}
 */
export const generatePDFDownload = async (propertyName = "imovel") => {
  try {
    // Get all PDF pages from the pdf-container only (not from mobile carousel)
    const pdfPages = document.querySelectorAll(".pdf-container .pdf-page");

    if (pdfPages.length === 0) {
      console.error("No PDF pages found in .pdf-container");
      return;
    }

    // Create jsPDF instance with A4 dimensions
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // A4 dimensions in mm
    const pdfWidth = 210;
    const pdfHeight = 297;

    // Process each page
    for (let i = 0; i < pdfPages.length; i++) {
      const page = pdfPages[i];

      // Capture the page as canvas with high quality
      const canvas = await html2canvas(page, {
        scale: 2, // Higher scale for better quality
        useCORS: true, // Allow cross-origin images (requires CORS headers)
        logging: false,
        backgroundColor: "#ffffff",
        // Remove windowWidth/windowHeight to preserve aspect ratio
        // Let html2canvas use the actual element dimensions
      });

      // Convert canvas to image
      const imgData = canvas.toDataURL("image/jpeg", 0.95);

      // Add new page if not the first one
      if (i > 0) {
        pdf.addPage();
      }

      // Add image to PDF, fitting to A4 size
      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
    }

    // Generate filename with timestamp
    const timestamp = new Date().toISOString().split("T")[0];
    const filename = `${propertyName.replace(/\s+/g, "_")}_${timestamp}.pdf`;

    // Save the PDF
    pdf.save(filename);
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  }
};
