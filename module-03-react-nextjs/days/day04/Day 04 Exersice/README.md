# Focus Effect Note
The `focus()` call must be placed inside `useEffect` because the input element does not exist in the DOM until after the initial render finishes.
