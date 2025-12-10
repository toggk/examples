// src/context/ThemeContext.js
import { createContext, useState } from 'react';

export const ThemeContext = createContext();

export const themes = {
  light: {
    name: 'light',
    foreground: '#000000',
    background: '#eeeeee',
    buttonBackground: '#ffffff',
    buttonText: '#000000',
    border: '#cccccc'
  },
  dark: {
    name: 'dark',
    foreground: '#ffffff',
    background: '#222222',
    buttonBackground: '#333333',
    buttonText: '#ffffff',
    border: '#444444'
  }
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(themes.light);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === themes.light ? themes.dark : themes.light));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};