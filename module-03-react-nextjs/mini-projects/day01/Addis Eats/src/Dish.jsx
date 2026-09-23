function Dish({ name, price }) {
  return (
    <div className="dish">
      <h3 className="dish-name">{name}</h3>
      <p className="dish-price">{price} ETB</p>
    </div>
  );
}

export default Dish;
