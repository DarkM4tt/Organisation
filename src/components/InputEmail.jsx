import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useSendEmailOTPMutation } from "../features/auth/authSlice";
import FooterButtons from "./FooterButtons";

const InputEmail = ({ email, mobileNumber, handleEmailChange, isError }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [sendEmailOTP] = useSendEmailOTPMutation();
  const navigate = useNavigate();

  const handleContinue = async () => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setError(true);
      return;
    }

    setLoading(true);
    try {
      const response = await sendEmailOTP({
        email: email,
        entity: "org",
      }).unwrap();
      const token = response.token;
      localStorage.setItem("auth_token", token);

      navigate("/otp", {
        state: {
          input: email,
          isEmail: true,
          isPrevVerified: true,
          prevInput: mobileNumber,
        },
      });
    } catch (error) {
      console.error("Error: ", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col gap-5 py-8">
      <p className="text-fontBlack text-mxl font-semibold">
        Enter your email ?
      </p>
      <div className="flex flex-col gap-2">
        <TextField
          placeholder="Enter your email "
          variant="outlined"
          value={email}
          error={isError}
          onChange={handleEmailChange}
        />
        {isError && <p className="text-red-500 text-xs">Enter a valid email</p>}
      </div>
      <FooterButtons
        loading={loading}
        isNextEnabled={!error}
        onNextClick={handleContinue}
        handleBack={handleBack}
      />
      {error && <p className="text-red-500 text-xs">Enter a valid email</p>}
    </div>
  );
};

InputEmail.propTypes = {
  email: PropTypes.string,
  mobileNumber: PropTypes.string,
  handleEmailChange: PropTypes.func,
  isError: PropTypes.bool,
};

export default InputEmail;
