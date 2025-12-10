// src/components/CartExample.js
// Main component that brings everything together

import { CartProvider } from '../context/CartContext';
import ProductCard from './ProductCard';
import CartSummary from './CartSummary';
import Notifications from './Notifications';
import { useCartState } from '../hooks/useCart';

// Sample products
const SAMPLE_PRODUCTS = [
  { id: 1, name: 'Laptop', price: 999.99, description: 'High-performance laptop' },
  { id: 2, name: 'Mouse', price: 29.99, description: 'Wireless mouse' },
  { id: 3, name: 'Keyboard', price: 79.99, description: 'Mechanical keyboard' },
  { id: 4, name: 'Monitor', price: 299.99, description: '27-inch 4K monitor' },
];

// Inner component that uses the cart state
const CartHeader = () => {
  const { itemCount, total } = useCartState();

  return (
    <div className="cart-header">
      <h1>Shopping Cart Demo</h1>
      <div className="cart-badge">
        <span className="badge-icon">🛒</span>
        <span className="badge-count">{itemCount}</span>
        <span className="badge-total">${total.toFixed(2)}</span>
      </div>
    </div>
  );
};

const CartExample = () => {
  return (
    // Wrap the app with the CartProvider to make functions available
    <CartProvider>
      <div className="cart-example-app">
        <CartHeader />
        <Notifications />

        <div className="cart-layout">
          <div className="products-section">
            <h2>Products</h2>
            <div className="products-grid">
              {SAMPLE_PRODUCTS.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          <div className="cart-section">
            <CartSummary />
          </div>
        </div>

        <div className="example-info">
          <h3>📚 How This Example Works:</h3>
          <ul>
            <li>
              <strong>Context Provider</strong> ([CartContext.js](../context/CartContext.js))
              defines and provides multiple functions using <code>useCallback</code>
            </li>
            <li>
              <strong>Custom Hook</strong> ([useCart.js](../hooks/useCart.js))
              wraps <code>useContext</code> and provides access to all functions
            </li>
            <li>
              <strong>Components</strong> use the custom hook to access specific functions they need:
              <ul>
                <li>[ProductCard.js](./ProductCard.js) - uses addToCart, removeFromCart, isInCart, updateQuantity</li>
                <li>[CartSummary.js](./CartSummary.js) - uses getTotal, clearCart, applyDiscount</li>
                <li>[Notifications.js](./Notifications.js) - uses specialized hook for notifications</li>
              </ul>
            </li>
            <li>
              <strong>No prop drilling</strong> - functions are passed through context,
              not manually through component props
            </li>
          </ul>
        </div>
      </div>
    </CartProvider>
  );
};

export default CartExample;
