import Navbar from "../components/Navbar.jsx";
import { Outlet } from "react-router-dom";

const Layout = ({ isDarkMode, handleDarkMode }) => {
  return (
    <div className={isDarkMode ? "dark bg-gray-900 min-h-screen" : "min-h-screen"}>
      <Navbar isDarkMode={isDarkMode} handleDarkMode={handleDarkMode} />
      <Outlet />
    </div>
  );
};

export default Layout;
