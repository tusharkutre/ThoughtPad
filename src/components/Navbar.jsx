import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <section className="sticky top-0 z-50">
        <div className="flex items-center justify-between">    
        <div className="flex relative md:items-center md:justify-center justify-end bg-slate-200 w-fit rounded-2xl mx-auto m-5 flex-row gap-5 p-3 bg-light">
        <h2 className="font-semibold  text-center text-2xl">
          ThoughtPad🗒️
        </h2>
          <NavLink
            to="/"
            className="font-medium text-lg text-decoration-none text-dark"
          >
            Home🏠
          </NavLink>
          <span>|</span>
          <NavLink
            to="/pastes"
            className="font-medium text-lg text-decoration-none text-dark"
          >
            Pastes📝
          </NavLink>
        </div>
        </div>
      </section>
    </>
  );
};

export default Navbar;
