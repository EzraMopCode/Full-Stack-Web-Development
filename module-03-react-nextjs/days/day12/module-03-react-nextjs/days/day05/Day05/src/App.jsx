import { ThemeProvider, useTheme } from "./ThemeContext";
import { CartProvider } from "./CartProvider";
import Menu from "./Menu";

function DeeplyNestedThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className={theme}>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Toggle Theme
      </button>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <div className="app-container">
          <DeeplyNestedThemeToggle />
          <Menu />
        </div>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
