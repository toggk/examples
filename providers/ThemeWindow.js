import { useContext } from 'react';
import { ThemeContext } from './themes/ThemeContext.js';

function ThemedWindow() {
  const theme = useContext(ThemeContext);

  const windowStyle = {
    backgroundColor: theme.background,
    color: theme.foreground,
    padding: '20px',
    border: `2px solid ${theme.border}`,
    borderRadius: '8px',
    margin: '10px',
    minHeight: '100px'
  };

  return (
    <div style={windowStyle}>
      <h2>Themed Window</h2>
      <p>This window is using the {theme.name} theme.</p>
      <p>Background: {theme.background}</p>
      <p>Foreground: {theme.foreground}</p>
    </div>
  );
}

export default ThemedWindow;
