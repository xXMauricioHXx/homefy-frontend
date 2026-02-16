import { forwardRef } from "react";
import PropTypes from "prop-types";
import "./Input.css";

const Input = forwardRef(
  (
    {
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
      error,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={`form-group ${className} ${error ? "has-error" : ""}`}>
        {label && (
          <label htmlFor={id} className="form-label">
            {label}
          </label>
        )}
        <input
          id={id}
          ref={ref}
          type={type}
          className={`form-input ${error ? "input-error" : ""}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          minLength={minLength}
          {...props}
        />
        {error && <span className="field-error-message">{error}</span>}
      </div>
    );
  },
);

Input.displayName = "Input";

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  minLength: PropTypes.number,
  className: PropTypes.string,
  error: PropTypes.string,
};

export default Input;
