import { Outlet } from "react-router-dom";
import Navigation from "../src/components/Navigation";
const App = () => {
  return (
    <div>
      <Navigation />
      <Outlet />
    </div>
  );
};

export default App;
