export function cartReducer(state, action) {
  switch (action.type) {
    case "add":
      return { items: [...state.items, action.dish] };

    case "remove":
      return { items: state.items.filter((d) => d.id !== action.id) };

    case "clear":
      return { items: [] };
      
    default:
      return state;
  }
}
