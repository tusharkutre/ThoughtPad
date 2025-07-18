import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Pastes from "../pages/Pastes";
import ViewPaste from "../pages/ViewPaste";
import Layout from "../pages/Layout";

// basic routing
export const routes = [
  {
    path: "/",
    element: <Layout />, // props will be injected from App.jsx
    children: [
      { index: true, element: <Home /> },
      { path: "pastes", element: <Pastes /> },
      { path: "pastes/:id", element: <ViewPaste /> },
    ],
  },
];