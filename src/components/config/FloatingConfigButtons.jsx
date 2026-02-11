import PropTypes from "prop-types";
import "./FloatingConfigButtons.css";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import WysiwygOutlinedIcon from "@mui/icons-material/WysiwygOutlined";
import ArrowCircleDownOutlinedIcon from "@mui/icons-material/ArrowCircleDownOutlined";

function FloatingConfigButtons({ onSectionSelect, onDownload }) {
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
      id: "download",
      icon: <ArrowCircleDownOutlinedIcon color="white" />,
      label: "Baixar",
      color: "#d45520",
    },
  ];

  return (
    <div className="floating-config-buttons">
      {sections.map((section) => (
        <button
          key={section.id}
          className="floating-config-btn"
          onClick={() =>
            section.id === "download"
              ? onDownload()
              : onSectionSelect(section.id)
          }
          aria-label={
            section.id === "download"
              ? "Baixar PDF"
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
};

export default FloatingConfigButtons;
