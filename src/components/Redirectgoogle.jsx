import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Redirectgoogle() {
  const navigate = useNavigate();

  useEffect(() => {
    // Parse the URL search parameters to get accessToken, isNew, and registrationToken
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("accessToken");
    const isNew = params.get("isNew") === "true";
    const registrationToken = params.get("registrationToken");

    // You can store tokens in localStorage/sessionStorage if needed
    if (accessToken !== "null") {
      localStorage.setItem("access_token", accessToken);
    }

    // Handle navigation based on the `isNew` parameter
    if (isNew) {
      navigate("/signup", {
        state: {
          registrationToken,
          isPrevVerified: false,
        },
      });
    } else {
      navigate("/home");
    }
  }, [navigate]);

  return (
    <div>
      <h1>Redirecting...</h1>
    </div>
  );
}

export default Redirectgoogle;
