import PropTypes from "prop-types";
import { Autocomplete, Box, Paper, Popper, TextField } from "@mui/material";
import { countries } from "../utils/countries";
import "./extra.css"

const InputMobileNumber = ({
  countryCode,
  handleCountryCodeChange,
  mobileNumber,
  handleMobileNumberChange,
  isError,
}) => {
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
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <h2 className="text-mxl font-semibold font-redhat mb-12">Enter your mobile number</h2>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Autocomplete
        sx={{height:"56px"}}
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
        <TextField
          placeholder="Enter your phone no."
          variant="outlined"
          value={mobileNumber}
          onChange={handleMobileNumberChange}
          error={isError}
          inputProps={{
            style: {
              color: isError ? "red" : "black",
            },
          }}
          sx={{
            ml: 2,
            flexGrow: 1,
          }}
        />
      </Box>
      {isError && (
        <p className="text-sm text-red text-red-600">
          Please enter a valid mobile number.
        </p>
      )}
    </Box>
  );
};

InputMobileNumber.propTypes = {
  countryCode: PropTypes.string,
  handleCountryCodeChange: PropTypes.func,
  mobileNumber: PropTypes.string,
  handleMobileNumberChange: PropTypes.func,
  isError: PropTypes.bool,
};

export default InputMobileNumber;
