import { MenuItem, Select } from "@mui/material";
import PropTypes from "prop-types";
import radioButtonChecked from "../../assets/radioButtonChecked.svg";
import radioButtonUnChecked from "../../assets/radioButtonUnChecked.svg";

const CustomSelectDropdown = ({ value, onChange, name, options, returnvalue, btnstyles,placeholderstyles }) => {
  return (
    <Select
    className={btnstyles?"bg-white":""}
      value={value}
      onChange={onChange}
      displayEmpty
      renderValue={(selected) => {
        if (!selected) {
          return (
            <span
              style={placeholderstyles?placeholderstyles:{
                color: "black",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              {name}
            </span>
          );
        }
        return returnvalue?returnvalue:`${name}: ${selected}`;
      }}
      sx={{
        width: "100%",
        backgroundColor: value ? "black" : "#EEEEEE",
        color: value ? "white" : "gray",
        borderRadius: "10px",
        ".MuiSvgIcon-root": {
          color: value ? "white" : "black",
        },
        ".MuiOutlinedInput-notchedOutline": {
          borderColor: "transparent",
          borderRadius: "10px",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "transparent",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "transparent",
        },
        ".MuiSelect-select": {
          paddingInline: 2,
          paddingBlock: 1,
          backgroundColor: value ? "black" : "#EEEEEE",
          borderRadius: "10px",
        },
        ".MuiInputBase-root": {
          borderRadius: "10px",
        },
        
      }}
    >
      {options.map((option, idx) => (
        <MenuItem
          key={idx}
          value={option}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: value === option ? "#F5F5F5" : "transparent",
            "&:hover": {
              backgroundColor: "#F5F5F5",
            },
          }}
        >
          {option}
          {value === option ? (
            <img
              src={radioButtonChecked}
              alt="radioButtonChecked"
              className="ml-4"
            />
          ) : (
            <img
              src={radioButtonUnChecked}
              alt="radioButtonUnChecked"
              className="ml-4"
            />
          )}
        </MenuItem>
      ))}
    </Select>
  );
};

CustomSelectDropdown.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
};

export default CustomSelectDropdown;
