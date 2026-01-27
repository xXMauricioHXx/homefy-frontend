import { useState } from "react";
import PropTypes from "prop-types";
import "./ConfigSection.css";

function ConfigSection({ title, icon, children, defaultExpanded = true }) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className={`config-section ${isExpanded ? "expanded" : ""}`}>
      <button
        className="config-section-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="config-section-title">
          {icon && <span className="config-section-icon">{icon}</span>}
          <span>{title}</span>
        </div>
        <svg
          className="config-section-chevron"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M6 9L12 15L18 9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {isExpanded && <div className="config-section-content">{children}</div>}
    </div>
  );
}

ConfigSection.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  children: PropTypes.node.isRequired,
  defaultExpanded: PropTypes.bool,
};

export default ConfigSection;
