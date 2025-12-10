import { createContext } from 'react';

// Define theme objects
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

// Create context with light theme as default
export const ThemeContext = createContext(themes.light);
