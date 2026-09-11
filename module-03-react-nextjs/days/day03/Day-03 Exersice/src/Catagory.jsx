function Category({ categories, selected, onSelect }) {
  return (
    <div className="category-bar">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={selected === cat ? "active" : ""}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default Category;
