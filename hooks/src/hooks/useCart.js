// src/hooks/useCart.js
// Custom hook to access cart context and functions

import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  // Return the entire context (includes all functions and state)
  return context;
};

export default useCart;

// Alternative: You can also create specialized hooks that return only specific functionality

export const useCartActions = () => {
  const { addToCart, removeFromCart, updateQuantity, clearCart } = useCart();

  return {
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
};

export const useCartState = () => {
  const { cart, getTotal, getItemCount } = useCart();

  return {
    cart,
    total: getTotal(),
    itemCount: getItemCount(),
  };
};

export const useCartNotifications = () => {
  const { notifications, dismissNotification } = useCart();

  return {
    notifications,
    dismissNotification,
  };
};
