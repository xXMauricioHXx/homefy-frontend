import { createContext, useContext, useState, useCallback } from "react";
import { fetchUserPdfs, fetchPdfById } from "../services/api";

const PdfCacheContext = createContext();

export function PdfCacheProvider({ children }) {
  const [cache, setCache] = useState({
    pdfList: {
      data: null,
      timestamp: null,
      isValid: false,
    },
    pdfDetails: {},
  });

  // Get PDF list with caching
  const getPdfList = useCallback(
    async (token, forceRefresh = false) => {
      // Return cached data if valid and not forcing refresh
      if (cache.pdfList.isValid && cache.pdfList.data && !forceRefresh) {
        return cache.pdfList.data;
      }

      // Fetch from backend
      const data = await fetchUserPdfs(token);

      // Update cache
      setCache((prev) => ({
        ...prev,
        pdfList: {
          data,
          timestamp: new Date(),
          isValid: true,
        },
      }));

      return data;
    },
    [cache.pdfList.isValid, cache.pdfList.data],
  );

  // Get PDF by ID with caching
  const getPdfById = useCallback(
    async (pdfId, token, forceRefresh = false) => {
      // Return cached data if valid and not forcing refresh
      const cachedPdf = cache.pdfDetails[pdfId];
      if (cachedPdf?.isValid && cachedPdf.data && !forceRefresh) {
        return cachedPdf.data;
      }

      // Fetch from backend
      const data = await fetchPdfById(pdfId, token);

      // Update cache
      setCache((prev) => ({
        ...prev,
        pdfDetails: {
          ...prev.pdfDetails,
          [pdfId]: {
            data,
            timestamp: new Date(),
            isValid: true,
          },
        },
      }));

      return data;
    },
    [cache.pdfDetails],
  );

  // Invalidate all cache
  const invalidateAll = useCallback(() => {
    setCache({
      pdfList: {
        data: null,
        timestamp: null,
        isValid: false,
      },
      pdfDetails: {},
    });
  }, []);

  // Invalidate PDF list cache only
  const invalidatePdfList = useCallback(() => {
    setCache((prev) => ({
      ...prev,
      pdfList: {
        data: null,
        timestamp: null,
        isValid: false,
      },
    }));
  }, []);

  // Invalidate specific PDF details cache
  const invalidatePdfDetails = useCallback((pdfId) => {
    setCache((prev) => {
      const newPdfDetails = { ...prev.pdfDetails };
      if (newPdfDetails[pdfId]) {
        newPdfDetails[pdfId] = {
          ...newPdfDetails[pdfId],
          isValid: false,
        };
      }
      return {
        ...prev,
        pdfDetails: newPdfDetails,
      };
    });
  }, []);

  const value = {
    getPdfList,
    getPdfById,
    invalidateAll,
    invalidatePdfList,
    invalidatePdfDetails,
  };

  return (
    <PdfCacheContext.Provider value={value}>
      {children}
    </PdfCacheContext.Provider>
  );
}

export function usePdfCache() {
  const context = useContext(PdfCacheContext);
  if (!context) {
    throw new Error("usePdfCache must be used within a PdfCacheProvider");
  }
  return context;
}
