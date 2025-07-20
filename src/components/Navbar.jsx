import { Moon, Sun } from "lucide-react";
import { NavLink } from "react-router-dom";

const Navbar = ({isDarkMode,handleDarkMode}) => {
  
  const tabs = [
    { name: "Home🏠", path: "/" },
    { name: "Pastes📝", path: "/pastes" }
  ];

  return (
    <>
      <section className={`sticky opacity-90 top-0 z-50 ${isDarkMode ? "dark bg-gray-900" : ""}`}>
        <div className="flex items-center justify-between mx-1 sm:mx-5 md:mx-10">
          <h2 className={`font-semibold hidden sm:block absolute text-center text-2xl ${isDarkMode  ? "text-white" : " text-black"}`}>
            NotePad🗒️
          </h2>
          <div className="flex drop-shadow-2xl  drop-shadow-purple-400 relative md:items-center md:justify-center justify-between bg-slate-200 w-fit rounded-2xl sm:mx-auto  m-5 flex-row gap-2 p-1 bg-light">
            {tabs.map((tab, index) => (
              <NavLink
                key={index}
                to={tab.path}
                className={({ isActive }) =>
                  `font-medium rounded-xl p-3 text-lg text-decoration-none text-dark ${
                    isActive ? "bg-black text-white" : ""
                  }`
                }
              >
                {tab.name}
              </NavLink>
            ))}
          </div>
            <button className={`${isDarkMode ? "bg-white text-black" : "bg-black text-white"} p-3 font-medium rounded-2xl`} onClick={handleDarkMode}>
              {isDarkMode ? <Sun/> : <Moon/>}
            </button>
        </div>
      </section>
    </>
  );
};

export default Navbar;
