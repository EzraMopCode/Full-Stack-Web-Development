const DISHES_URL = '/dishes.json';

export async function fetchDishes(signal) {
  const res = await fetch(DISHES_URL, { signal });
  if (!res.ok) {
    throw new Error('Could not load the menu. Please check your connection and try again.');
  }
  return res.json();
}
