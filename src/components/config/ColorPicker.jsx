import { useState } from "react";
import PropTypes from "prop-types";
import "./ColorPicker.css";

function ColorPicker({ label, value, onChange }) {
  const [hexInput, setHexInput] = useState(value);

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setHexInput(newColor);
    onChange(newColor);
  };

  const handleHexInputChange = (e) => {
    let input = e.target.value;
    // Ensure it starts with #
    if (!input.startsWith("#")) {
      input = "#" + input;
    }
    setHexInput(input);
  };

  const handleHexInputBlur = () => {
    // Validate hex color
    const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    if (hexRegex.test(hexInput)) {
      onChange(hexInput);
    } else {
      // Reset to current value if invalid
      setHexInput(value);
    }
  };

  return (
    <div className="color-picker">
      <label className="color-picker-label">{label}</label>
      <div className="color-picker-controls">
        <div className="color-preview-wrapper">
          <input
            type="color"
            value={value}
            onChange={handleColorChange}
            className="color-input"
          />
          <div
            className="color-preview"
            style={{ backgroundColor: value }}
          ></div>
        </div>
        <input
          type="text"
          value={hexInput}
          onChange={handleHexInputChange}
          onBlur={handleHexInputBlur}
          className="hex-input"
          placeholder="#000000"
          maxLength={7}
        />
      </div>
    </div>
  );
}

ColorPicker.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ColorPicker;
