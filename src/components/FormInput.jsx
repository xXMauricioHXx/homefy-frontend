import PropTypes from "prop-types";
import "./FormInput.css";

/**
 * Reusable form input component with react-hook-form integration
 */
export function FormInput({
  name,
  label,
  type = "text",
  placeholder,
  register,
  error,
  disabled = false,
  defaultValue,
  ...rest
}) {
  return (
    <div className="form-input-container">
      {label && (
        <label htmlFor={name} className="form-input-label">
          {label}
        </label>
      )}
      <input
        id={name}
        type={type}
        className={`form-input ${error ? "form-input-error" : ""}`}
        placeholder={placeholder}
        disabled={disabled}
        defaultValue={defaultValue}
        {...(register ? register(name) : {})}
        {...rest}
      />
      {error && (
        <span className="form-input-error-message">{error.message}</span>
      )}
    </div>
  );
}

FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  register: PropTypes.func,
  error: PropTypes.object,
  disabled: PropTypes.bool,
  defaultValue: PropTypes.string,
};

export default FormInput;
