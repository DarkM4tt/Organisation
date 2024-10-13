import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FooterButtons from "../components/FooterButtons";
import SignupHeader from "./common/SignupHeader";
import {
  useVerifyEmailOTPMutation,
  useSendEmailOTPMutation,
  useSendMobileOTPMutation,
  useLazyLoginWithEmailQuery,
  useLazyLoginWithPhoneQuery,
} from "../features/auth/authSlice";

function OtpForm() {
  const location = useLocation();
  const { input, isEmail, isPrevVerified, prevInput } = location.state;

  const otpLength = isEmail ? 4 : 6;
  const [otp, setOtp] = useState("".padEnd(otpLength, " "));
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpError, setOtpError] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const [verifyEmailOTP] = useVerifyEmailOTPMutation();
  const [sendEmailOTP] = useSendEmailOTPMutation();
  const [sendMobileOTP] = useSendMobileOTPMutation();
  const [triggerLoginWithEmail] = useLazyLoginWithEmailQuery();
  const [triggerLoginWithPhone] = useLazyLoginWithPhoneQuery();

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]?$/.test(value)) {
      setError(false);
      let newOtp = otp.split("");
      newOtp[index] = value;
      setOtp(newOtp.join(""));
      if (value && index < otpLength - 1) {
        inputRefs.current[index + 1].focus();
      }
    } else {
      setError(true);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      let newOtp = otp.split("");
      if (otp[index] === " " && index > 0) {
        inputRefs.current[index - 1].focus();
        newOtp[index - 1] = " ";
      } else {
        newOtp[index] = " ";
      }
      setOtp(newOtp.join(""));
    }
  };

  const isNextEnabled = otp.trim().length === otpLength;

  const handleEmailOtpVerify = async () => {
    setLoading(true);
    try {
      const response = await verifyEmailOTP({
        otp,
        token: localStorage.getItem("auth_token"),
      }).unwrap();
      console.log("EMAIL RES", response.isNew);
      const loginResponse = await triggerLoginWithEmail().unwrap();
      const org_id = loginResponse?.org?._id;
      localStorage.setItem("org_id", org_id);
      if (org_id) {
        navigate("/home");
      } else {
        navigate("/signup", {
          state: {
            input,
            isEmail,
            isPrevVerified,
            ...(prevInput && { prevInput }),
          },
        });
      }
    } catch (error) {
      console.error("Error: ", error);
      setOtpError(true);
      setLoading(false);
    }
  };

  const handleMobileNumberVerify = async () => {
    setLoading(true);
    try {
      const response = await verifyEmailOTP({
        otp,
        token: localStorage.getItem("auth_token"),
      }).unwrap();
      console.log("MOB RES", response.isNew);
      const loginResponse = await triggerLoginWithPhone().unwrap();
      const org_id = loginResponse?.org?._id;
      localStorage.setItem("org_id", org_id);
      if (org_id) {
        navigate("/home");
      } else {
        navigate("/signup", {
          state: {
            input,
            isEmail,
            isPrevVerified,
            ...(prevInput && { prevInput }),
          },
        });
      }
    } catch (error) {
      console.error("Error: ", error);
      setOtpError(true);
      setLoading(false);
    }
  };

  const maskPhoneNumber = (phone) => {
    return phone.slice(0, -2).replace(/[0-9]/g, "*") + phone.slice(-2);
  };

  const handleNextClick = async () => {
    isEmail ? handleEmailOtpVerify() : handleMobileNumberVerify();
  };

  const handleResendClick = async () => {
    if (isEmail) {
      setError(false);
      setLoading(true);
      try {
        const response = await sendEmailOTP({
          email: input,
          entity: "org",
        }).unwrap();
        const token = response.token;
        localStorage.setItem("auth_token", token);
        setResendTimer(30);
      } catch (error) {
        console.error("Error: ", error);
        setError(true);
        setLoading(false);
        return;
      }
      setLoading(false);
    } else {
      setError(false);
      setLoading(true);
      try {
        const response = await sendMobileOTP({
          mobile_number: input,
          entity: "org",
        }).unwrap();
        const token = response.token;
        localStorage.setItem("auth_token", token);
        setResendTimer(30);
      } catch (error) {
        console.error("Error: ", error);
        setError(true);
        setLoading(false);
        return;
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    if (resendTimer > 0) {
      const timerId = setTimeout(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    }
  }, [resendTimer]);

  return (
    <div className="w-screen h-screen flex flex-col overflow-y-auto">
      <SignupHeader />
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="flex flex-col py-8">
          <h2 className="text-mxl font-semibold font-redhat">
            Enter the {`${isEmail ? "4-digit" : "6-digit"}`} code sent to you
            at:
          </h2>
          <h2 className="text-mxl font-semibold font-redhat">
            {isEmail ? input : maskPhoneNumber(input)}
          </h2>
          <div className="flex mt-12">
            {otp.split("").map((digit, index) => (
              <TextField
                key={index}
                id={`otp-input-${index}`}
                value={digit.trim()}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                inputProps={{ maxLength: 1, type: "text" }}
                error={error || otpError}
                inputRef={(el) => (inputRefs.current[index] = el)}
                sx={{
                  width: "3rem",
                  marginRight: "1rem",
                  "& input": {
                    textAlign: "center",
                  },
                }}
              />
            ))}
          </div>
          {error && (
            <div className="text-red-500 text-xs">
              Please enter only numbers
            </div>
          )}
          {otpError && (
            <div className="text-red-500 text-xs">
              Please re-enter correct otp
            </div>
          )}
          <p className="text-lg mt-4 xl:mt-6 font-normal text-gray">
            Tip: check your spam and inbox folder
          </p>
          <div id="recaptcha-container" className="mt-4"></div>
          <Button
            variant="outlined"
            onClick={handleResendClick}
            disabled={resendTimer > 0}
            className="text-gray-600 w-fit"
            sx={{
              borderRadius: "10px",
              marginTop: "40px",
              textTransform: "none",
              fontSize: "18px",
              fontWeight: "700",
              color: "#1E293B",
              border: "1px solid #DDDDDD",
              "&:hover": {
                border: "1px solid gray",
              },
            }}
          >
            {resendTimer > 0
              ? `Please wait for ${resendTimer} seconds`
              : "Resend OTP"}
          </Button>
          <FooterButtons
            loading={loading}
            isNextEnabled={isNextEnabled}
            onNextClick={handleNextClick}
          />
        </div>
      </div>
    </div>
  );
}

export default OtpForm;
