import PropTypes from "prop-types";
import {
  Autocomplete,
  Box,
  Button,
  Paper,
  Popper,
  TextField,
  Typography,
} from "@mui/material";
import crossIcon from "../../assets/crossIcon.svg";
import LoadingAnimation from "../common/LoadingAnimation";
import { countries } from "../../utils/countries";

const AddDriver = ({
  input,
  setInput,
  handleAddDriver,
  handleClose,
  addLoading,
  addError,
  addSuccess,
  countryCode,
  handleCountryCodeChange,
}) => {
  const isFormValid = input.length > 5;

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
    <Box
      sx={{
        p: 3,
        width: "100%",
        border: "1px solid #ccc",
        borderRadius: "5px",
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" fontWeight="700">
          Invite Drivers
        </Typography>
        <img
          src={crossIcon}
          alt="crossIcon"
          className="cursor-pointer"
          onClick={handleClose}
        />
      </Box>
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="body1" sx={{ mb: 1 }} fontWeight="700">
            Enter driver’s email <span className="text-red-500">*</span>
          </Typography>
          <TextField
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter driver’s email or phone to invite"
            fullWidth
            variant="outlined"
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="body1" sx={{ mb: 1 }} fontWeight="700">
            Enter driver’s phone number <span className="text-red-500">*</span>
          </Typography>
          <Box sx={{ display: "flex", gap: "8px" }}>
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
            <TextField
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter driver’s email or phone to invite"
              fullWidth
              variant="outlined"
            />
          </Box>
        </Box>
      </Box>
      <Box sx={{ width: "50%" }}>
        <Typography variant="body1" sx={{ mb: 1 }} fontWeight="700">
          Recommendation code
        </Typography>
        <TextField
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter driver’s email or phone to invite"
          fullWidth
          variant="outlined"
        />
      </Box>
      <Box sx={{ my: 3, color: "#aaa" }}>
        Lorem ipsum dolor sit amet consectetur. Turpis nunc auctor vel amet
        convallis non viverra. Vel aliquam cras scelerisque rhoncus nunc sed
        vitae aliquet morbi.
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddDriver}
        disabled={!isFormValid}
        sx={{
          backgroundColor: isFormValid ? "black" : "rgba(238, 238, 238, 1)",
          color: isFormValid ? "white" : "black",
          textTransform: "none",
          padding: "10px 15px",
          borderRadius: "10px",
          fontSize: "16px",
          fontWeight: "600",
          "&:hover": {
            backgroundColor: isFormValid ? "black" : "grey",
          },
        }}
      >
        {addLoading ? (
          <LoadingAnimation width={30} height={30} />
        ) : (
          "Invite driver"
        )}
      </Button>
      {addError && <p className="mt-2 text-red-400">{addError}</p>}
      {addSuccess && (
        <p className="mt-2 text-green-400">Invitation link sent to driver</p>
      )}
    </Box>
  );
};

AddDriver.propTypes = {
  setInput: PropTypes.func.isRequired,
  handleAddDriver: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  input: PropTypes.string.isRequired,
  addLoading: PropTypes.bool.isRequired,
  addSuccess: PropTypes.bool.isRequired,
  addError: PropTypes.string.isRequired,
  countryCode: PropTypes.string.isRequired,
  handleCountryCodeChange: PropTypes.func.isRequired,
};

export default AddDriver;