import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home";
import OtpForm from "./components/OtpForm.jsx";
import Signup from "./pages/Signup.jsx";
import theme from "./theme.jsx";
import { store } from "./app/Store.js";
import { Provider } from "react-redux";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";
import Redirectgoogle from "./components/Redirectgoogle.jsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/otp",
    element: <OtpForm />,
  },
  {
    path: "/googlecallback",
    element: <Redirectgoogle />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
