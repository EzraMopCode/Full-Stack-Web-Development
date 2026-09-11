import Header from "./Header";
import Menu from "./Menu";
import { menuData } from "./data";

function App() {
  return (
    <div className="app-container">
      <Header />
      <Menu items={menuData} />
    </div>
  );
}

export default App;
