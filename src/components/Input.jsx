import PropTypes from "prop-types";
import "./Input.css";

function Input({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  disabled = false,
  minLength,
  className = "",
}) {
  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label htmlFor={id} className="form-label">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        className="form-input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        minLength={minLength}
      />
    </div>
  );
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  minLength: PropTypes.number,
  className: PropTypes.string,
};

export default Input;
