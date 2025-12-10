// src/components/CartSummary.js
// Another example component using different functions from the same hook

import useCart from '../hooks/useCart';
import { useState } from 'react';

const CartSummary = () => {
  const [discountCode, setDiscountCode] = useState('');

  // Destructure multiple functions and state from the custom hook
  const {
    cart,
    getTotal,
    getItemCount,
    clearCart,
    removeFromCart,
    updateQuantity,
    applyDiscount,
  } = useCart();

  const total = getTotal();
  const itemCount = getItemCount();

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart();
    }
  };

  const handleApplyDiscount = () => {
    if (discountCode === 'SAVE10') {
      const discountedTotal = applyDiscount(10);
      console.log('New total:', discountedTotal);
      setDiscountCode('');
    } else {
      alert('Invalid discount code');
    }
  };

  const handleIncrement = (productId, currentQuantity) => {
    updateQuantity(productId, currentQuantity + 1);
  };

  const handleDecrement = (productId, currentQuantity) => {
    updateQuantity(productId, currentQuantity - 1);
  };

  if (cart.length === 0) {
    return (
      <div className="cart-summary empty">
        <h2>Your Cart</h2>
        <p>Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="cart-summary">
      <h2>Your Cart ({itemCount} items)</h2>

      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="item-info">
              <h4>{item.name}</h4>
              <p className="item-price">${item.price.toFixed(2)} each</p>
            </div>

            <div className="item-controls">
              <div className="quantity-controls">
                <button
                  onClick={() => handleDecrement(item.id, item.quantity)}
                  className="qty-btn"
                >
                  -
                </button>
                <span className="quantity">{item.quantity}</span>
                <button
                  onClick={() => handleIncrement(item.id, item.quantity)}
                  className="qty-btn"
                >
                  +
                </button>
              </div>

              <p className="item-total">
                ${(item.price * item.quantity).toFixed(2)}
              </p>

              <button
                onClick={() => removeFromCart(item.id)}
                className="remove-btn-small"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-totals">
        <div className="discount-section">
          <input
            type="text"
            placeholder="Discount code"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            className="discount-input"
          />
          <button onClick={handleApplyDiscount} className="apply-btn">
            Apply
          </button>
        </div>

        <div className="total-row">
          <strong>Total:</strong>
          <strong>${total.toFixed(2)}</strong>
        </div>

        <div className="cart-actions">
          <button onClick={handleClearCart} className="clear-btn">
            Clear Cart
          </button>
          <button className="checkout-btn">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
