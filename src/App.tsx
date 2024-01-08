import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import './index.css'
function App() {
  return (
    <div className="flex flex-col gap-2">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
