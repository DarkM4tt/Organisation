/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Modal, Box, Button, TextField, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { MenuItem, Select } from "@mui/material";
import radioButtonChecked from "../../assets/radioButtonChecked.svg";
import radioButtonUnChecked from "../../assets/radioButtonUnChecked.svg";

const CustomSelectDropdown = ({
  value,
  onChange,
  name,
  options,
  placeholderstyles,
}) => {
  return (
    <Select
      value={value}
      onChange={onChange}
      displayEmpty
      renderValue={(selected) => {
        if (!selected) {
          return (
            <span
              style={
                placeholderstyles
                  ? placeholderstyles
                  : {
                      color: "black",
                      fontSize: "16px",
                      fontWeight: "600",
                    }
              }
            >
              {name}
            </span>
          );
        }
        const selectedOption = options?.find(
          (option) => option.vehicle_category === selected
        );
        return selectedOption ? selectedOption.carType : selected;
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
      {options?.map((option) => (
        <MenuItem
          key={option?.vehicle_category}
          value={option?.vehicle_category} // Use _id as the value
          sx={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: option.vehicle_category
              ? "#F5F5F5"
              : "transparent",
            "&:hover": {
              backgroundColor: "#F5F5F5",
            },
          }}
        >
          {option?.carType} {/* Display the name of the car option */}
          {value === option?.vehicle_category ? (
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

const style = {
  position: "absolute",
  overflow: "auto",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const ZonesModal = ({ open, handleClose, zoneName, carOptions }) => {
  const initialRow = { carType: "", waitingCharges: "", perKmCharges: "" };
  console.log(carOptions);
  const [rows, setRows] = useState([initialRow]);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);

  useEffect(() => {
    const allFieldsFilled = rows.every(
      (row) =>
        row.carType &&
        row.waitingCharges &&
        row.perKmCharges &&
        !isNaN(row.waitingCharges) &&
        !isNaN(row.perKmCharges)
    );
    setIsSaveDisabled(!allFieldsFilled);
  }, [rows]);

  const handleAddRow = () => {
    if (rows.length < carOptions?.length) {
      setRows([...rows, initialRow]);
    }
  };

  const handleChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const handleCancel = () => {
    setRows([initialRow]);
    handleClose();
  };

  const handleSave = () => {
    const zoneData = {
      zone_id: Date.now(),
      zone_name: zoneName || "New Zone",
      prices: rows,
    };

    setRows([initialRow]);
    handleClose(zoneData);
  };

  const handleKeyDown = (event) => {
    const allowedKeys = [
      "Backspace",
      "ArrowLeft",
      "ArrowRight",
      "Delete",
      "Tab",
      ".",
    ];

    if (
      !allowedKeys.includes(event.key) &&
      !(event.key >= "0" && event.key <= "9")
    ) {
      event.preventDefault();
    }
  };

  const getAvailableOptions = (currentIndex) => {
    const selectedOptions = rows
      .map((row, index) => index !== currentIndex && row.carType)
      .filter(Boolean);
    return carOptions?.filter(
      (option) => !selectedOptions.includes(option?.vehicle_category)
    );
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style} className="space-y-4">
          <div className="flex justify-between items-center pb-4">
            <h2 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold font-redhat">
              New business zone created successfully!
            </h2>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <div className="border-[1px] border-[#DDDDDD] rounded-lg mt-4 overflow-hidden">
            <div className="grid grid-cols-3 gap-4 text-gray-500 bg-[#F5F5F5] py-3 px-6">
              <div className="font-bold text-sm font-redhat md:text-base lg:text-lg xl:text-xl">
                Car type
              </div>
              <div className="font-bold text-sm font-redhat md:text-base lg:text-lg xl:text-xl">
                Waiting charges
              </div>
              <div className="font-bold text-sm font-redhat md:text-base lg:text-lg xl:text-xl">
                Per km charges
              </div>
            </div>
            <div className="overflow-hidden p-6">
              {rows.map((row, index) => (
                <div key={index} className="grid grid-cols-3 gap-4 mb-6">
                  <CustomSelectDropdown
                    value={row.carType}
                    onChange={(e) =>
                      handleChange(index, "carType", e.target.value)
                    }
                    name="Select car type"
                    options={getAvailableOptions(index)}
                    placeholderstyles={{
                      color: "#999999",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  />
                  <TextField
                    placeholder="Enter waiting charges"
                    value={row.waitingCharges}
                    onChange={(e) =>
                      handleChange(index, "waitingCharges", e.target.value)
                    }
                    inputMode="numeric"
                    InputProps={{
                      inputProps: { pattern: "[0-9]*" },
                      sx: {
                        "& input::placeholder": {
                          color: "#999999",
                          fontSize: "14px",
                          fontWeight: "600",
                        },
                      },
                    }}
                    onKeyDown={handleKeyDown}
                  />
                  <TextField
                    placeholder="Enter per km charges"
                    value={row.perKmCharges}
                    onChange={(e) =>
                      handleChange(index, "perKmCharges", e.target.value)
                    }
                    inputMode="numeric"
                    InputProps={{
                      inputProps: { pattern: "[0-9]*" },
                      sx: {
                        "& input::placeholder": {
                          color: "#999999",
                          fontSize: "14px",
                          fontWeight: "600",
                        },
                      },
                    }}
                    onKeyDown={handleKeyDown}
                  />
                </div>
              ))}
              <Button
                onClick={handleAddRow}
                variant="text"
                sx={{
                  backgroundColor: "#F5F5F5",
                  fontWeight: 600,
                  color: "black",
                  width: "100%",
                  fontSize: "16px",
                  fontFamily: "Red Hat Display, sans-serif",
                  textTransform: "none",
                  padding: "12px 24px",
                  borderRadius: "4px",
                  "&:hover": {
                    backgroundColor: "#F5F5F5",
                  },
                }}
                className=""
                disabled={rows.length >= carOptions?.length}
              >
                Add more row
              </Button>
            </div>
          </div>
          <div className="flex flex-row-reverse py-4 gap-4">
            <Button
              className="text-xs md:text-sm lg:text-base"
              variant="contained"
              sx={{
                backgroundColor: "black",
                fontWeight: 600,
                color: "white",
                fontFamily: "Red Hat Display, sans-serif",
                textTransform: "none",
                padding: "12px 24px",
                borderRadius: "4px",
                "&:hover": {
                  backgroundColor: "black",
                },
              }}
              onClick={handleSave}
              disabled={isSaveDisabled}
            >
              Save
            </Button>
            <Button
              className="text-xs md:text-sm lg:text-base"
              variant="contained"
              sx={{
                backgroundColor: "#EEEEEE",
                fontWeight: 600,
                color: "black",
                textTransform: "none",
                padding: "12px 24px",
                borderRadius: "4px",
                "&:hover": {
                  backgroundColor: "#EEEEEE",
                },
              }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ZonesModal;
