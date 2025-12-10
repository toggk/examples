import { themes, ThemeContext } from './themes/ThemeContext.js';
import ThemedButton from './ThemeButton';
import ThemedWindow from './ThemeWindow';

function App() {
  return (
    <div className="App">
      <ThemeContext.Provider value={themes.dark}>
        <ThemedWindow />
        <ThemedButton />
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
