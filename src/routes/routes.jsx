import { createBrowserRouter } from "react-router-dom";
import React from "react";
const Home = React.lazy(() => import("../pages/Home"));
const Pastes = React.lazy(() => import("../pages/Pastes"));
const ViewPaste = React.lazy(() => import("../pages/ViewPaste"));
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