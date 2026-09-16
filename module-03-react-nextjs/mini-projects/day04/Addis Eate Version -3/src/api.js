export async function getDishes(category, signal) {
  const res = await fetch("/dishes.json", { signal });

  if (!res.ok) {
    throw new Error("Could not load the menu. Please try again.");
  }

  const dishes = await res.json();

  return dishes.filter((dish) => dish.category === category);
}
