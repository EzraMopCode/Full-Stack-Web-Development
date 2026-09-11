import Menu from "./Menu";
import menu from "./data";

function App() {
  return (
    <div>
      <h1>Addis Eats</h1>
      <Menu dishes={menu} category="Main" />
    </div>
  );
}

export default App;
