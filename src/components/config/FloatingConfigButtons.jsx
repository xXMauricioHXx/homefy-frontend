import PropTypes from "prop-types";
import "./FloatingConfigButtons.css";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import WysiwygOutlinedIcon from "@mui/icons-material/WysiwygOutlined";
import ArrowCircleDownOutlinedIcon from "@mui/icons-material/ArrowCircleDownOutlined";
import PermMediaOutlinedIcon from "@mui/icons-material/PermMediaOutlined";

function FloatingConfigButtons({
  onSectionSelect,
  onDownload,
  onDownloadImages,
}) {
  const sections = [
    {
      id: "colors",
      icon: <ColorLensOutlinedIcon color="white" />,
      label: "Cores",
      color: "#ed6325",
    },
    {
      id: "summary",
      icon: <WysiwygOutlinedIcon color="white" />,
      label: "Resumo",
      color: "#d45520",
    },
    {
      id: "images",
      icon: <PermMediaOutlinedIcon color="white" />,
      label: "Imagens",
      color: "#c44a1c",
    },
    {
      id: "download",
      icon: <ArrowCircleDownOutlinedIcon color="white" />,
      label: "PDF",
      color: "#d45520",
    },
  ];

  return (
    <div className="floating-config-buttons">
      {sections.map((section) => (
        <button
          key={section.id}
          className="floating-config-btn"
          onClick={() => {
            if (section.id === "download") {
              onDownload();
            } else if (section.id === "images") {
              onDownloadImages();
            } else {
              onSectionSelect(section.id);
            }
          }}
          aria-label={
            section.id === "download"
              ? "Baixar PDF"
              : section.id === "images"
                ? "Baixar Imagens"
                : `Abrir configurações de ${section.label}`
          }
          style={{ "--btn-color": section.color }}
        >
          <span className="floating-config-btn-icon">{section.icon}</span>
          <span className="floating-config-btn-label">{section.label}</span>
        </button>
      ))}
    </div>
  );
}

FloatingConfigButtons.propTypes = {
  onSectionSelect: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired,
  onDownloadImages: PropTypes.func.isRequired,
};

export default FloatingConfigButtons;
