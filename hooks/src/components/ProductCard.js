// src/components/ProductCard.js
// Example component using functions from custom hook

import useCart from '../hooks/useCart';

const ProductCard = ({ product }) => {
  // Get functions from the custom hook
  const { addToCart, removeFromCart, isInCart, updateQuantity, cart } = useCart();

  const inCart = isInCart(product.id);
  const cartItem = cart.find(item => item.id === product.id);

  // Handler that uses the context function
  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleRemove = () => {
    removeFromCart(product.id);
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    updateQuantity(product.id, newQuantity);
  };

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p className="price">${product.price.toFixed(2)}</p>
      <p className="description">{product.description}</p>

      {!inCart ? (
        <button onClick={handleAddToCart} className="add-to-cart-btn">
          Add to Cart
        </button>
      ) : (
        <div className="cart-controls">
          <label>
            Quantity:
            <input
              type="number"
              min="1"
              value={cartItem?.quantity || 1}
              onChange={handleQuantityChange}
              style={{ width: '60px', marginLeft: '8px' }}
            />
          </label>
          <button onClick={handleRemove} className="remove-btn">
            Remove
          </button>
        </div>
      )}

      {inCart && (
        <p className="in-cart-indicator">✓ In cart ({cartItem?.quantity})</p>
      )}
    </div>
  );
};

export default ProductCard;
