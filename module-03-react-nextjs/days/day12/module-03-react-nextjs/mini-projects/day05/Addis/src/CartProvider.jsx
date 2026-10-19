import { useMemo, useReducer } from 'react';
import PropTypes from 'prop-types';
import { cartReducer } from './cartReducer';
import { CartContext } from './CartContext';

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const total = state.items.reduce((sum, dish) => sum + dish.price, 0);

  const value = useMemo(
    () => ({ items: state.items, dispatch, total }),
    [state.items, total]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CartProvider;
