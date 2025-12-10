// src/components/ThemeWindow.js
import useTheme from '../hooks/useTheme';

const ThemeWindow = () => {
  const { theme } = useTheme();

  return (
    <div className={`theme-window ${theme}`}>
      <h2>Current Theme: {theme}</h2>
      <p>
        This component demonstrates using the custom <code>useTheme</code> hook
        to access theme context without prop drilling.
      </p>
      <div className="theme-info">
        <h3>Benefits of Custom Hooks:</h3>
        <ul>
          <li>Encapsulates context logic</li>
          <li>Provides better error handling</li>
          <li>Cleaner component code</li>
          <li>Reusable across components</li>
        </ul>
      </div>
    </div>
  );
};

export default ThemeWindow;
