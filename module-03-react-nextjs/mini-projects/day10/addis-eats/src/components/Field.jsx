import PropTypes from 'prop-types';

function Field({ id, label, value, error, touched, onChange, onBlur, inputRef, type, autoFocus }) {
  const showError = touched && error;

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={id}
        type={type}
        ref={inputRef}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        autoFocus={autoFocus}
        aria-invalid={!!showError}
        aria-describedby={showError ? `${id}-error` : undefined}
        className={showError ? 'field-input field-input-error' : 'field-input'}
      />
      {showError && (
        <span id={`${id}-error`} role="alert" className="field-error">
          ⚠ {error}
        </span>
      )}
    </div>
  );
}

Field.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  touched: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  inputRef: PropTypes.object,
  type: PropTypes.string,
  autoFocus: PropTypes.bool,
};

Field.defaultProps = {
  error: '',
  touched: false,
  inputRef: null,
  type: 'text',
  autoFocus: false,
};

export default Field;
