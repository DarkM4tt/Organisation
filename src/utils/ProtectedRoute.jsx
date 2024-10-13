import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const orgId = localStorage.getItem("org_id");

  if (!orgId || orgId === "undefined") {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
