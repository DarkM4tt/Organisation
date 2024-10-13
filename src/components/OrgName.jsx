import { TextField, Checkbox, FormControlLabel } from "@mui/material";
import PropTypes from "prop-types";

const OrgName = ({
  orgName,
  handleOrgNameChange,
  isChecked,
  handleCheckboxChange,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-mxl font-semibold font-redhat">What’s your organization name?</h2>
      <p className="text-lg font-normal text-gray">
        Let us know how to properly address you
      </p>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Enter organization name"
        className="mb-4"
        value={orgName}
        onChange={handleOrgNameChange}
        sx={{
          marginTop: "30px",
          marginBottom: "30px",
        }}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={isChecked}
            onChange={handleCheckboxChange}
            sx={{
              color: "#18C4B8",
              "&.Mui-checked": {
                color: "#18C4B8",
              },
              "& .MuiSvgIcon-root": {
                fill: isChecked ? "#18C4B8" : "#18C4B8",
              },
              "& .MuiSvgIcon-root path": {
            
              },
            }}
          />
        }
        label={
          <p className="text-sm font-normal text-gray">
            I agree to the{" "}
            <a href="#" className="text-boldCyan underline">
              Terms
            </a>{" "}
            and{" "}
            <a href="#" className="text-boldCyan underline">
              Privacy Policy
            </a>
            .
          </p>
        }
      />
    </div>
  );
};

OrgName.propTypes = {
  orgName: PropTypes.string,
  handleOrgNameChange: PropTypes.func,
  isChecked: PropTypes.bool,
  handleCheckboxChange: PropTypes.func,
};

export default OrgName;
