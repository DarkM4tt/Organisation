import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LoadingAnimation from "./common/LoadingAnimation";
import {
  useSendEmailOTPMutation,
  useSendMobileOTPMutation,
} from "../features/auth/authSlice";
import { Autocomplete, Box, Paper, Popper } from "@mui/material";
import { countries } from "../utils/countries";

function LoginForm() {
  const [input, setInput] = useState("");
  const [phoneSignIn, setPhoneSignIn] = useState(false);
  const [countryCode, setCountryCode] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [sendEmailOTP] = useSendEmailOTPMutation();
  const [sendMobileOTP] = useSendMobileOTPMutation();

  const handleCountryCodeChange = (event, newValue) => {
    setCountryCode(newValue);
  };

  const handlePhoneSignIn = async () => {
    setError(false);
    setLoading(true);
    let mobile = "+" + countryCode.phone + input;
    try {
      const response = await sendMobileOTP({
        mobile_number: mobile,
        entity: "org",
      }).unwrap();
      const token = response.token;
      localStorage.setItem("auth_token", token);
      navigate("/otp", {
        state: { input: mobile, isEmail: false, isPrevVerified: false },
      });
    } catch (error) {
      console.error("Error: ", error);
      setError(true);
    }
    setLoading(false);
  };

  const handleEmailContinue = async () => {
    setError(false);
    setLoading(true);
    try {
      const response = await sendEmailOTP({
        email: input,
        entity: "org",
      }).unwrap();
      const token = response.token;
      localStorage.setItem("auth_token", token);
      navigate("/otp", {
        state: { input, isEmail: true, isPrevVerified: false },
      });
    } catch (error) {
      console.error("Error: ", error);
      setError(true);
    }
    setLoading(false);
  };

  const handleContinue = async () => {
    const emailRegex = /\S+@\S+\.\S+/;
    const phoneRegex = /^[0-9]{6,15}$/;

    if (!input) {
      setError(true);
      return;
    }

    if (!phoneSignIn && emailRegex.test(input)) {
      handleEmailContinue();
    } else if (phoneSignIn && countryCode && phoneRegex.test(input)) {
      setError(false);
      handlePhoneSignIn();
    } else {
      setError(true);
      return;
    }
  };

  const orgId = localStorage.getItem("org_id");

  if (orgId && orgId !== "undefined") {
    return <Navigate to="/home" />;
  }

  const CustomPopper = (props) => {
    return (
      <Popper
        {...props}
        style={{
          width: "fit-content",
          height: "200px",
          display: "flex",
        }}
      />
    );
  };

  const CustomPaper = (props) => {
    return (
      <Paper
        {...props}
        style={{ width: "fit-content", display: "flex", paddingBlock: "4px" }}
      />
    );
  };

  return (
    <div className="flex px-20 flex-col py-8 gap-4">
      <p className="text-fontBlack text-mxl font-semibold font-redhat">
        Enter your {phoneSignIn ? "phone number" : "email"}?
      </p>
      <div className="flex gap-2">
        {phoneSignIn && (
          <Autocomplete
            sx={{ height: "56px" }}
            options={countries}
            value={countryCode}
            onChange={handleCountryCodeChange}
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
              <div
                {...props}
                className="flex gap-2 cursor-pointer mb-4 mx-4 hover:bg-gray-100"
              >
                <img
                  loading="lazy"
                  src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                  srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                  alt=""
                  className="mr-2 "
                />
                <p>
                  {option.label} ({option.code}) +{option.phone}
                </p>
              </div>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label=""
                variant="outlined"
                sx={{ width: 100 }}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: countryCode ? (
                    <img
                      loading="lazy"
                      className="w-9"
                      src={`https://flagcdn.com/w20/${countryCode.code.toLowerCase()}.png`}
                      srcSet={`https://flagcdn.com/w40/${countryCode.code.toLowerCase()}.png 2x`}
                      alt=""
                      style={{ marginRight: "8px" }}
                    />
                  ) : null,
                  endAdornment: (
                    <Box
                      component="div"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <params.InputProps.endAdornment.type
                        {...params.InputProps.endAdornment.props}
                      />
                    </Box>
                  ),
                }}
                inputProps={{
                  ...params.inputProps,
                  readOnly: true,
                  sx: { textAlign: "center" },
                }}
              />
            )}
            PopperComponent={CustomPopper}
            PaperComponent={CustomPaper}
          />
        )}
        <TextField
          placeholder={`Enter ${phoneSignIn ? "phone number" : "email"}`}
          variant="outlined"
          value={input}
          error={error}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1"
        />
      </div>
      {error && (
        <p className="text-red-500 text-xs">
          Enter a valid{" "}
          {phoneSignIn ? "phone number with country code" : "email"}
        </p>
      )}
      <Button
        variant="contained"
        sx={{
          backgroundColor: "black",
          fontWeight: 700,
          fontFamily: "Red Hat Display, sans-serif",
          fontSize: "18px",
          textTransform: "none",
          color: "white",
          "&:hover": {
            backgroundColor: "black",
          },
          borderRadius: "10px",
          padding: "12px 0px",
        }}
        fullWidth
        onClick={handleContinue}
      >
        {loading ? <LoadingAnimation height={30} width={30} /> : "Continue"}
      </Button>
      <div className="flex items-center">
        <div className="flex-grow border-t border-borderGray"></div>
        <Typography
          sx={{
            marginInline: "10px",
            fontWeight: "600",
            fontFamily: "Red Hat Display, sans-serif",
          }}
          component="span"
          variant="body1"
        >
          or
        </Typography>
        <div className="flex-grow border-t border-borderGray"></div>
      </div>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "white",
          border: "1px solid #DDDDDD",
          fontWeight: 500,
          fontSize: "16px",
          fontFamily: "Red Hat Display, sans-serif",
          textTransform: "none",
          color: "black",
          "&:hover": {
            backgroundColor: "white",
          },
          borderRadius: "10px",
          padding: "12px 0px",
        }}
        fullWidth
        onClick={() => {
          setError(false);
          setPhoneSignIn(!phoneSignIn);
        }}
      >
        {phoneSignIn ? "Signup with email" : "Signup with phone"}
      </Button>
      <p className="text-gray text-lg font-normal font-sans">
        Lorem ipsum dolor sit amet consectetur. Eget venenatis est adipiscing
        senectus. Adipiscing lorem est scelerisque congue donec in.
      </p>
    </div>
  );
}

export default LoginForm;
