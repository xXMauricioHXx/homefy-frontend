import { useNavigate } from "react-router-dom";
import "./RecentPdfCard.css";

function RecentPdfCard({ pdf }) {
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to PDF preview page with PDF ID
    navigate(`/pdf-preview/${pdf.id}`);
  };

  // Format date
  const formatDate = (timestamp) => {
    if (!timestamp || !timestamp._seconds) return "";
    const date = new Date(timestamp._seconds * 1000);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="recent-pdf-card" onClick={handleClick}>
      <div className="pdf-card-image-container">
        <img
          src={pdf.property.mainImage}
          alt={pdf.brand.name}
          className="pdf-card-image"
          loading="lazy"
        />
        <div className="pdf-card-overlay">
          <svg
            className="pdf-card-icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M15 12L9 16.5V7.5L15 12Z"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div className="pdf-card-content">
        <div className="pdf-card-header">
          <h3 className="pdf-card-title">{pdf.brand.name}</h3>
          <span className="pdf-card-location">{pdf.brand.location}</span>
        </div>

        <p className="pdf-card-description">{pdf.property.resume}</p>

        <div className="pdf-card-footer">
          <span className="pdf-card-price">{pdf.property.price}</span>
          <span className="pdf-card-date">{formatDate(pdf.createdAt)}</span>
        </div>
      </div>
    </div>
  );
}

export default RecentPdfCard;
