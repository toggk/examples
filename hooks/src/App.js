// src/App.js
import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import ThemeButton from './components/ThemeButton';
import ThemeWindow from './components/ThemeWindow';
import './App.css';

function WrapWithProvider({ children, provider }) {
  if (provider) {
    return <ThemeProvider>{children}</ThemeProvider>;
  } else {
    return <>{children}</>;
  }
}

function App() {
  const [useProvider, setUseProvider] = useState(true);

  return (
    <WrapWithProvider provider={useProvider}>
      <div className="app">
        <header className="app-header">
          <h1>Custom Hooks Demo: Theme Switcher</h1>
          <button
            onClick={() => setUseProvider(!useProvider)}
            style={{ marginLeft: '1rem', padding: '0.5rem' }}
          >
            Toggle Provider: {useProvider ? 'ON' : 'OFF'}
          </button>
          <ThemeButton />
        </header>

        <main className="app-main">
          <ThemeWindow />

          <div className="explanation">
            <h3>How it works:</h3>
            <ol>
              <li>
                <strong>WrapWithProvider</strong> - Conditionally wraps children with ThemeProvider
              </li>
              <li>
                <strong>ThemeContext</strong> - Creates context and provider with theme state
              </li>
              <li>
                <strong>useTheme hook</strong> - Custom hook that wraps useContext with error handling
              </li>
              <li>
                <strong>ThemeButton</strong> - Uses the hook to access toggleTheme function
              </li>
              <li>
                <strong>ThemeWindow</strong> - Uses the hook to display current theme
              </li>
            </ol>
          </div>
        </main>
      </div>
    </WrapWithProvider>
  );
}

export default App;
