// import "./styles/App.css";
import { routes } from "./routes/routes.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useState, useEffect, Suspense } from "react";
import Layout from "./pages/Layout.jsx";
import { Squircle } from "ldrs/react";
import "ldrs/react/Squircle.css";

// Loading spinner component
const LoadingFallback = (
  <div className="flex items-center justify-center min-h-screen">
    <Squircle
      size="37"
      stroke="5"
      strokeLength="0.15"
      bgOpacity="0.1"
      speed="0.9"
      color="black"
    />
  </div>
);

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  
  // function to toggle dark mode
  const handleDarkMode = () => setIsDarkMode((prev) => !prev);
  
  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Inject props into Layout for the router
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout isDarkMode={isDarkMode} handleDarkMode={handleDarkMode} />
      ),
      children: routes[0].children,
    },
  ]);

  if (showLoader) return LoadingFallback;

  return (
    <Suspense fallback={LoadingFallback}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;