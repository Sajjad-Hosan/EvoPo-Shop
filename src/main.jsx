import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./HomePage.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./AuthProvider/AuthProvider.jsx";
import DetailsPage from "./pages/DetailsPage/DetailsPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    loader: () => fetch("http://localhost:3000/product-count"),
    errorElement: <div></div>,
  },
  {
    path: "/details/:id",
    loader: ({ params }) => fetch(`http://localhost:3000/product/${params.id}`),
    element: <DetailsPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <Toaster position="top-right" reverseOrder={false} />
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
