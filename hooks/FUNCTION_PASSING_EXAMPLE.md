# Passing Functions with Providers and Custom Hooks

This example demonstrates how to pass multiple functions down through React Context API using providers and custom hooks, avoiding prop drilling.

## 📁 File Structure

```
src/
├── context/
│   └── CartContext.js      # Provider with multiple functions
├── hooks/
│   └── useCart.js          # Custom hook(s) to access functions
└── components/
    ├── ProductCard.js      # Uses addToCart, removeFromCart, etc.
    ├── CartSummary.js      # Uses getTotal, clearCart, etc.
    ├── Notifications.js    # Uses notification functions
    └── CartExample.js      # Main app component
```

## 🔑 Key Concepts

### 1. **Context Provider** (CartContext.js)

The provider:
- Creates state using `useState`
- Defines functions using `useCallback` for performance
- Packages everything into a `value` object
- Provides it to child components via `<Provider>`

```javascript
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = useCallback((product) => {
    // Function implementation
  }, []);

  const removeFromCart = useCallback((productId) => {
    // Function implementation
  }, []);

  // ... more functions

  const value = {
    cart,
    addToCart,
    removeFromCart,
    // ... all state and functions
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
```

### 2. **Custom Hook** (useCart.js)

The custom hook:
- Wraps `useContext(CartContext)`
- Provides error handling
- Returns all functions and state
- Can create specialized hooks for specific use cases

```javascript
const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context; // Returns all functions and state
};
```

### 3. **Components Use Functions**

Components import the hook and destructure what they need:

```javascript
const ProductCard = ({ product }) => {
  const { addToCart, removeFromCart, isInCart } = useCart();

  return (
    <button onClick={() => addToCart(product)}>
      Add to Cart
    </button>
  );
};
```

## 🎯 Benefits

1. **No Prop Drilling** - Functions available anywhere in the component tree
2. **Clean Separation** - Logic in context, UI in components
3. **Reusability** - Custom hook can be used in any component
4. **Type Safety** - Easy to add TypeScript types
5. **Performance** - `useCallback` prevents unnecessary re-renders
6. **Error Handling** - Centralized error checking in custom hook

## 📝 Functions Demonstrated

The example includes 10 different functions:

1. `addToCart(product)` - Add item to cart
2. `removeFromCart(productId)` - Remove item from cart
3. `updateQuantity(productId, quantity)` - Update item quantity
4. `clearCart()` - Clear entire cart
5. `getTotal()` - Calculate total price
6. `getItemCount()` - Get total number of items
7. `dismissNotification(id)` - Dismiss a notification
8. `isInCart(productId)` - Check if item is in cart
9. `applyDiscount(percent)` - Apply discount to total
10. `addNotification(message)` - Add notification (internal)

## 🚀 Usage

```javascript
import { CartProvider } from './context/CartContext';
import CartExample from './components/CartExample';

function App() {
  return (
    <CartProvider>
      <CartExample />
    </CartProvider>
  );
}
```

## 🎨 Specialized Hooks Pattern

You can also create specialized hooks for specific functionality:

```javascript
// Only get cart actions
export const useCartActions = () => {
  const { addToCart, removeFromCart, updateQuantity } = useCart();
  return { addToCart, removeFromCart, updateQuantity };
};

// Only get cart state
export const useCartState = () => {
  const { cart, getTotal, getItemCount } = useCart();
  return { cart, total: getTotal(), itemCount: getItemCount() };
};
```

## 💡 Best Practices

1. **Use `useCallback`** for functions to prevent unnecessary re-renders
2. **Memoize expensive computations** with `useMemo`
3. **Error handling** in custom hooks
4. **Descriptive names** for functions
5. **Single responsibility** - each function does one thing
6. **Compose functions** - functions can call other functions

## 🔄 Comparison to Prop Drilling

**Without Context (Prop Drilling):**
```javascript
<App>
  <Header addToCart={addToCart} removeFromCart={removeFromCart} />
    <ProductList addToCart={addToCart} />
      <ProductCard addToCart={addToCart} />
</App>
```

**With Context + Custom Hook:**
```javascript
<CartProvider>
  <App>
    <Header />
    <ProductList />
    <ProductCard /> {/* Uses useCart() internally */}
  </App>
</CartProvider>
```

## 📚 Further Reading

- [React Context API](https://react.dev/reference/react/createContext)
- [Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [useCallback Hook](https://react.dev/reference/react/useCallback)
- [useMemo Hook](https://react.dev/reference/react/useMemo)
