import React from 'react'
import useGoogleMapsLoader from '../../../useGoogleMapsLoader';
import radioButtonChecked from "../../../assets/radioButtonChecked.svg";
import radioButtonUnChecked from "../../../assets/radioButtonUnChecked.svg";
import {
    GoogleMap,
    Polygon,
    DrawingManager,
    Autocomplete,
  } from "@react-google-maps/api";
  import {
    styled,
    Button,
    Select,
    MenuItem,
    TextField,
    InputAdornment,
    Badge,
    Avatar,
    IconButton,
  } from "@mui/material";

  const CustomSelectDropdown = ({
    value,
    onChange,
    name,
    options,
    ...rest
  }) => {
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: 200,
        },
      },
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "left",
      },
      transformOrigin: {
        vertical: "top",
        horizontal: "left",
      },
    };
    return (
      <Select
        value={value}
        onChange={onChange}
        MenuProps={MenuProps}
        {...rest}
        displayEmpty
        renderValue={(selected) => {
          if (!selected) {
            return (
              <span
                className="text-sm lg:text-base"
                style={{
                  color: "black",
                  fontFamily: "Red Hat Display, sans-serif",
                  fontWeight: 400,
                  fontSize:"0.87rem",
                }}
              >
                {name}
              </span>
            );
          }
          return `${selected}`;
        }}
        sx={{
          backgroundColor: value ? "black" : "#EEEEEE",
          color: value ? "white" : "gray",
          borderRadius: "4px",
          ".MuiSvgIcon-root": {
            color: value ? "black" : "black",
          },
          ".MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent",
            borderRadius: "4px",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent",
          },
          ".MuiSelect-select": {
            paddingInline: 1,
            paddingBlock: 0.5,
            backgroundColor: value ? "#ffffff" : "#ffffff",
            border:"1px solid black",
            color: "black",
            fontFamily: "Red Hat Display, sans-serif",
            fontSize: {
              xs: "0.5", // default font size for small devices
              sm: "0.75", // for devices with min-width: 600px
              md: "0.87rem", // for devices with min-width: 960px
              lg: "0.87rem", // for devices with min-width: 1280px
            },
            fontWeight: 400,

            borderRadius: "4px",
          },
          ".MuiInputBase-root": {
            borderRadius: "4px",
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
                ".MuiMenuItem-root": {
                  paddingY: 0,
                  borderRadius:"4px"
                },
              },
              color: "black",
              borderRadius:"4px",
              fontFamily: "Red Hat Display, sans-serif",
              fontSize: {
                xs: "0.5", // default font size for small devices
                sm: "0.75", // for devices with min-width: 600px
                md: "0.87rem", // for devices with min-width: 960px
                lg: "0.87rem", // for devices with min-width: 1280px
              },
              fontWeight: 400,
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

const Dashboardzones = () => {
    
    const { isLoaded, loadError } = useGoogleMapsLoader();
  return (
    <div className='h-full p-4 flex flex-col justify-between'>
         {loadError && <div>Error loading maps</div>}
          {!isLoaded && <div>Loading Maps...</div>}
          {isLoaded && (
            <GoogleMap
              mapContainerStyle={{ height:"80%", width: "100%" }}
              center={{ lat: 40.756795, lng: -73.954298 }}
              zoom={13}
            />
          )}
          <div className="flex justify-between gap-4 items-center pt-3">
          <CustomSelectDropdown
            // value={state}
            // onChange={handleStateChange}
            name="Change zone"
            options={["Zone 1", "Zone 2", "Zone 3"]}
          />

          <p className="font-redhat font-bold text-sm ">22 Active cars<span className='font-semibold'> in this zone</span></p>
          </div>
      
    </div>
  )
}

export default Dashboardzones
