import { useContext } from 'react';
import { ThemeContext } from './themes/ThemeContext.js';

function ThemedButton() {
  const theme = useContext(ThemeContext);

  const buttonStyle = {
    backgroundColor: theme.buttonBackground,
    color: theme.buttonText,
    padding: '10px 20px',
    border: `1px solid ${theme.border}`,
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    margin: '10px'
  };

  return (
    <button style={buttonStyle}>
      I am styled by {theme.name} theme!
    </button>
  );
}

export default ThemedButton;
