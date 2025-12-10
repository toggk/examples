# Custom Hooks Demo: Theme Switcher

A React application demonstrating the benefits of custom hooks vs direct context usage.

## Features

- **Custom Hook Pattern**: `useTheme()` hook that encapsulates context logic
- **Theme Switching**: Toggle between light and dark modes
- **Error Handling**: Prevents hook usage outside of Provider
- **Clean Architecture**: Separation of concerns with context, hooks, and components

## Project Structure

```
src/
├── context/
│   └── ThemeContext.js      # Context and Provider component
├── hooks/
│   └── useTheme.js          # Custom hook wrapper
├── components/
│   ├── ThemeButton.js       # Toggle button
│   └── ThemeWindow.js       # Theme display
├── App.js                   # Main app
├── App.css                  # Styling
└── index.js                 # Entry point
```

## Key Concepts

### Why Custom Hooks?

**Without Custom Hook:**
```javascript
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

function MyComponent() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('...');
  // ... use context
}
```

**With Custom Hook:**
```javascript
import useTheme from '../hooks/useTheme';

function MyComponent() {
  const { theme, toggleTheme } = useTheme();
  // Clean and simple!
}
```

### Benefits:

1. **Encapsulation**: Hides implementation details
2. **Error Handling**: Built-in validation
3. **Reusability**: Single hook for all components
4. **Cleaner Code**: Less boilerplate

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view in your browser.

### Build for Production

```bash
npm run build
```

## Components

### ThemeProvider
Wraps the app and provides theme state to all children via Context API.

### useTheme Hook
Custom hook that wraps `useContext(ThemeContext)` with error handling.

### ThemeButton
Demonstrates using the hook to access the `toggleTheme` function.

### ThemeWindow
Demonstrates using the hook to read the current theme state.

## Learn More

- [React Context API](https://react.dev/reference/react/useContext)
- [Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [React Best Practices](https://react.dev/learn)
