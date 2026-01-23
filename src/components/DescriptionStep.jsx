import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import "./DescriptionStep.css";

function DescriptionStep({
  description,
  onDescriptionChange,
  maxLength = 2000,
}) {
  const [text, setText] = useState(description || "");

  // Notify parent component when description changes
  useEffect(() => {
    onDescriptionChange(text);
  }, [text, onDescriptionChange]);

  const handleChange = (e) => {
    const newText = e.target.value;
    if (newText.length <= maxLength) {
      setText(newText);
    }
  };

  const remainingChars = maxLength - text.length;
  const isNearLimit = remainingChars < 100;

  return (
    <div className="description-step-container">
      {/* Header */}
      <div className="description-step-header">
        <div className="description-step-header-content">
          <h3 className="description-step-title">Editar Descrição</h3>
          <p className="description-step-description">
            Personalize a descrição do imóvel que aparecerá no PDF
          </p>
        </div>
        <div
          className={`description-char-counter ${isNearLimit ? "warning" : ""}`}
        >
          <span className="counter-current">{text.length}</span>
          <span className="counter-separator">/</span>
          <span className="counter-max">{maxLength}</span>
        </div>
      </div>

      {/* Textarea */}
      <div className="description-textarea-wrapper">
        <textarea
          className="description-textarea"
          value={text}
          onChange={handleChange}
          placeholder="Digite a descrição do imóvel..."
          rows={12}
        />
      </div>

      {/* Footer info */}
      <div className="description-step-footer">
        <div className="description-tip">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M8 10.6667V8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M8 5.33333H8.00667"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span>
            Uma boa descrição destaca os principais atrativos e diferenciais do
            imóvel
          </span>
        </div>
      </div>
    </div>
  );
}

DescriptionStep.propTypes = {
  description: PropTypes.string,
  onDescriptionChange: PropTypes.func.isRequired,
  maxLength: PropTypes.number,
};

export default DescriptionStep;
