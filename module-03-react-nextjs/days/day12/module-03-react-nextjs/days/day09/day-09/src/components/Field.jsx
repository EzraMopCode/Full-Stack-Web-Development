import { forwardRef } from "react";

export const Field = forwardRef(({
  label, id, name, type = "text", value, onChange, onBlur, error, touched, as = "input", options
}, ref) => {
  const showError = touched && error;
  const errorId = `${id}-error`;

  const commonProps = {
    id, name, value, onChange, onBlur, ref,
    "aria-invalid": !!showError,
    "aria-describedby": showError ? errorId : undefined
  };

  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>

      {as === "select" ? (
        <select {...commonProps}>
          <option value="">Select...</option>
          {options?.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      ) : as === "textarea" ? (
        <textarea {...commonProps} rows="3" />
      ) : (
        <input type={type} {...commonProps} />
      )}

      {showError && (
        <span id={errorId} className="field-error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
});
