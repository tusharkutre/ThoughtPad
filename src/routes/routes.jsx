import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Navbar from "../components/Navbar";
import Pastes from "../pages/Pastes";
import ViewPaste from "../pages/ViewPaste";

// basic routing
export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Navbar />
        <Home />
      </div>
    ),
  },
  {
    path: "/pastes",
    element: (
      <div>
        <Navbar />
        <Pastes />
      </div>
    ),
  },
  {
    path: "/pastes/:id",
    element: (
      <div>
        <Navbar />
        <ViewPaste />
      </div>
    ),
  },
]);