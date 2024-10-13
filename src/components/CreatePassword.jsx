import { useState } from "react";
import PropTypes from "prop-types";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import PasswordRequirement from "./PasswordRequirement";

const CreatePassword = ({ password, handlePasswordChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleClickShowPassword = (event) => {
    event.preventDefault();
    setShowPassword((show) => !show);
  };
  const handleFocus = () => setIsFocused(true);
  const handleBlur = (event) => {
    if (event.relatedTarget?.type !== "button") {
      setIsFocused(false);
    }
  };

  const hasMinLength = password.length >= 8;
  const hasDigit = /\d/.test(password);
  const hasNonDigit = /\D/.test(password);

  return (
    <div className="flex flex-col gap-4 py-8">
      <h2 className="text-mxl font-semibold font-redhat">Create your account password</h2>
      <p className="text-lg font-normal text-gray ">
        your password must be at least 8 characters long, and contain at least
        one digit and one non-digit character
      </p>
      <TextField
        type={showPassword ? "text" : "password"}
        placeholder="Enter your password"
        variant="outlined"
        fullWidth
        value={password}
        onChange={handlePasswordChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          marginTop: "30px",
        }}
      />
      {isFocused && (
        <div className="flex flex-col gap-2 mt-8">
          <PasswordRequirement
            isValid={hasMinLength}
            text="Has at least 8 characters?"
          />
          <PasswordRequirement
            isValid={hasDigit}
            text="Has a digit character?"
          />
          <PasswordRequirement
            isValid={hasNonDigit}
            text="Has a non-digit character?"
          />
        </div>
      )}
    </div>
  );
};

CreatePassword.propTypes = {
  password: PropTypes.string,
  handlePasswordChange: PropTypes.func,
  isError: PropTypes.bool,
};

export default CreatePassword;
