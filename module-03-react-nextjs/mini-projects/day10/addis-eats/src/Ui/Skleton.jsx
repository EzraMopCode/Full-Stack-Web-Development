function Skeleton() {
  return (
    <div className="skeleton" aria-busy="true" aria-label="Loading">
      <div className="skeleton-line" />
      <div className="skeleton-line" />
      <div className="skeleton-line short" />
    </div>
  );
}

export default Skeleton;
