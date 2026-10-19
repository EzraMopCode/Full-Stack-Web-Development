export function Spinner({ label = "Loading…" }) {
  return (
    <div className="spinner" role="status" aria-live="polite">
      <div className="spinner-dot" />
      <span>{label}</span>
    </div>
  );
}
