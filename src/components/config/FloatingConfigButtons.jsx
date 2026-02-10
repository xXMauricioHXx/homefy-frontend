import PropTypes from "prop-types";
import "./FloatingConfigButtons.css";

function FloatingConfigButtons({ onSectionSelect }) {
  const sections = [
    {
      id: "colors",
      icon: "🎨",
      label: "Cores",
      color: "#ed6325",
    },
    {
      id: "summary",
      icon: "📋",
      label: "Resumo",
      color: "#d45520",
    },
  ];

  return (
    <div className="floating-config-buttons">
      {sections.map((section) => (
        <button
          key={section.id}
          className="floating-config-btn"
          onClick={() => onSectionSelect(section.id)}
          aria-label={`Abrir configurações de ${section.label}`}
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
};

export default FloatingConfigButtons;
