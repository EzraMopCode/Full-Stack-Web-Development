function Category({ categories, selected, onSelect }) {
  return (
    <div className="category-bar">
      {categories.map((c) => (
        <button
          key={c}
          onClick={() => onSelect(c)}
          className={selected === c ? "active" : ""}
        >
          {c}
        </button>
      ))}
    </div>
  );
}

export default Category;
