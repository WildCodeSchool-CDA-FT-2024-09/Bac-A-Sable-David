import "./App.css";
import { NavLink, Outlet } from "react-router-dom";

function App() {

  return (
    <>
      <nav>
        <NavLink to="/repo">Repos</NavLink>
        <NavLink to="languages">Languages</NavLink>
      </nav>
      <Outlet/>
    </>
  );
}

export default App;
