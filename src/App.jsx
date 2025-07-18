// import "./styles/App.css";
import { routes } from "./routes/routes.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useState } from "react";
import Layout from "./pages/Layout.jsx";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const handleDarkMode = () => setIsDarkMode((prev) => !prev);

  // Inject props into Layout for the router
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout isDarkMode={isDarkMode} handleDarkMode={handleDarkMode} />,
      children: routes[0].children,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;