// src/context/CartContext.js
// Example demonstrating passing multiple functions through Context API

import { createContext, useState, useCallback } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Function 1: Add item to cart
  const addToCart = useCallback((product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === product.id);

      if (existingItem) {
        // Update quantity if item exists
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      // Add new item
      return [...prevCart, { ...product, quantity: 1 }];
    });

    addNotification(`Added ${product.name} to cart`);
  }, []);

  // Function 2: Remove item from cart
  const removeFromCart = useCallback((productId) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== productId));
    addNotification('Item removed from cart');
  }, []);

  // Function 3: Update item quantity
  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  }, [removeFromCart]);

  // Function 4: Clear entire cart
  const clearCart = useCallback(() => {
    setCart([]);
    addNotification('Cart cleared');
  }, []);

  // Function 5: Calculate total
  const getTotal = useCallback(() => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [cart]);

  // Function 6: Get item count
  const getItemCount = useCallback(() => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  }, [cart]);

  // Function 7: Add notification (internal helper)
  const addNotification = useCallback((message) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message }]);

    // Auto-remove notification after 3 seconds
    setTimeout(() => {
      setNotifications((prev) => prev.filter(n => n.id !== id));
    }, 3000);
  }, []);

  // Function 8: Dismiss notification
  const dismissNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter(n => n.id !== id));
  }, []);

  // Function 9: Check if item is in cart
  const isInCart = useCallback((productId) => {
    return cart.some(item => item.id === productId);
  }, [cart]);

  // Function 10: Apply discount
  const applyDiscount = useCallback((discountPercent) => {
    const total = getTotal();
    const discountAmount = total * (discountPercent / 100);
    addNotification(`Discount applied! Saved $${discountAmount.toFixed(2)}`);
    return total - discountAmount;
  }, [getTotal]);

  // The value object contains all state and functions
  const value = {
    // State
    cart,
    notifications,

    // Functions
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotal,
    getItemCount,
    dismissNotification,
    isInCart,
    applyDiscount,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
