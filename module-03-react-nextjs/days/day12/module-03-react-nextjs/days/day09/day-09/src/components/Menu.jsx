import { useState, memo } from "react";
import { useCartStore } from "../store/cartStore";
import { DishModal } from "./DishModal";

const DishCard = memo(({ dish, onAdd, onOpenModal }) => {
  // Remove these lines so the menu can render:
  // if (dish.id === 2 && dish.crashTest) {
  //   throw new Error("Testing ErrorBoundary isolation");
  // }

  return (
    <div className="card">
      <h3>{dish.name}</h3>
      <p>${dish.price}</p>
      <div className="card-actions">
        <button onClick={() => onOpenModal(dish)}>Details</button>
        <button onClick={() => onAdd(dish)}>Add to Cart</button>
      </div>
    </div>
  );
});

const dishes = [
  { id: 1, name: "Doro Wat", price: 15 },
  { id: 2, name: "Shiro", price: 10, crashTest: true },
  { id: 3, name: "Tibs", price: 18 },
];

export const Menu = () => {
  const addItem = useCartStore((state) => state.addItem);
  const [selectedDish, setSelectedDish] = useState(null);

  return (
    <>
      <div className="menu-grid">
        {dishes.map((dish) => (
          <DishCard
            key={dish.id}
            dish={dish}
            onAdd={addItem}
            onOpenModal={setSelectedDish}
          />
        ))}
      </div>

      <DishModal
        isOpen={!!selectedDish}
        onClose={() => setSelectedDish(null)}
      >
        {selectedDish && (
          <div className="modal-body">
            <h2>{selectedDish.name}</h2>
            <p>Would you like to add {selectedDish.name} to your order?</p>
            <button
              className="submit-btn"
              onClick={() => {
                addItem(selectedDish);
                setSelectedDish(null);
              }}
            >
              Confirm Add
            </button>
          </div>
        )}
      </DishModal>
    </>
  );
};
