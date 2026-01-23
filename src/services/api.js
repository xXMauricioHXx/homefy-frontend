/**
 * API Service for Homefy
 * Handles all HTTP requests to the backend
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Fetch property data from the scraping endpoint
 * @param {string} url - The real estate property URL to scrape
 * @param {string} token - Firebase authentication token
 * @returns {Promise<{pdfId: string, data: object}>} The scraped property data
 */
export async function fetchPropertyData(url, token) {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    // Add Authorization header if token is provided
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/scrap-getPageContent`, {
      method: "POST",
      headers,
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching property data:", error);
    throw error;
  }
}

/**
 * Fetch user's PDFs from the database
 * @param {string} token - Firebase authentication token
 * @returns {Promise<{pdfs: Array, total: number}>} The user's PDFs
 */
export async function fetchUserPdfs(token) {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    // Add Authorization header
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/scrap-getPdfsByUserId`, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user PDFs:", error);
    throw error;
  }
}

/**
 * Fetch a specific PDF by its ID
 * @param {string} pdfId - The PDF ID to fetch
 * @param {string} token - Firebase authentication token
 * @returns {Promise<object>} The PDF data
 */
export async function fetchPdfById(pdfId, token) {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    // Add Authorization header
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(
      `${API_BASE_URL}/scrap-getPdfById?pdfId=${pdfId}`,
      {
        method: "GET",
        headers,
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching PDF by ID:", error);
    throw error;
  }
}
