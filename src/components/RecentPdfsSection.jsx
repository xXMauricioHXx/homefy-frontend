import { useState, useEffect } from "react";
import { usePdfCache } from "../contexts/PdfCacheContext";
import RecentPdfCard from "./RecentPdfCard";
import "./RecentPdfsSection.css";

function RecentPdfsSection({ user }) {
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getPdfList } = usePdfCache();

  useEffect(() => {
    const loadPdfs = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const token = await user.getIdToken();
        const data = await getPdfList(token);
        setPdfs(data.pdfs || []);
      } catch (err) {
        console.error("Error loading PDFs:", err);
        setError("Erro ao carregar PDFs recentes");
      } finally {
        setLoading(false);
      }
    };

    loadPdfs();
  }, [user, getPdfList]);

  // Don't render section if no user
  if (!user) {
    return null;
  }

  return (
    <section className="recent-pdfs-section">
      <div className="recent-pdfs-container">
        <div className="recent-pdfs-header">
          <h2 className="recent-pdfs-title">
            PDFs <span className="gradient-text">Recentes</span>
          </h2>
          <p className="recent-pdfs-subtitle">
            Seus últimos PDFs gerados estão aqui
          </p>
        </div>

        {loading && (
          <div className="recent-pdfs-loading">
            <div className="loading-spinner"></div>
            <p>Carregando PDFs...</p>
          </div>
        )}

        {error && (
          <div className="recent-pdfs-error">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
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
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && pdfs.length === 0 && (
          <div className="recent-pdfs-empty">
            <div className="empty-icon">📄</div>
            <h3>Nenhum PDF gerado ainda</h3>
            <p>Comece gerando seu primeiro PDF usando o formulário acima</p>
          </div>
        )}

        {!loading && !error && pdfs.length > 0 && (
          <div className="recent-pdfs-grid">
            {pdfs.map((pdf) => (
              <RecentPdfCard key={pdf.id} pdf={pdf} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default RecentPdfsSection;
