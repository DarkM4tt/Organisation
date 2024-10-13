import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import radioButtonChecked from "../../assets/radioButtonChecked.svg";
import radioButtonUnChecked from "../../assets/radioButtonUnChecked.svg";
import searchIcon from "../../assets/searchIcon.svg";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import driverimage from "../../assets/driver.png";
import phoneicon from "../../assets/phoneicon.svg";
import moremenuicon from "../../assets/moremenu.svg";
import downicon from "../../assets/downicon.svg";
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
import "leaflet/dist/leaflet.css";
import "../extra.css";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const drivers = [
  {
    name: "Marcus Cilliamson",
    phone: "(603) 555-0123",
    position: [38.736946, -9.142685],
  },
  {
    name: "Cameron Williamson",
    phone: "(603) 555-0123",
    position: [38.696946, -9.142685],
  },
  {
    name: "Cameron Williamson",
    phone: "(603) 555-0123",
    position: [36.696946, -9.142685],
  },
];

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const LiveMap = () => {
  const [selectedDriver, setSelectedDriver] = useState("Driver");
  const [state, setState] = useState(null);
  const [search, setSearch] = useState("");
  const [height, setHeight] = useState(180);

  const handleDriverChange = (event) => {
    setSelectedDriver(event.target.value);
  };

  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  const handleMouseDown = (e) => {
    const startY = e.clientY;
    const startHeight = height;

    const onMouseMove = (e) => {
      const newHeight = startHeight + (e.clientY - startY);
      if (newHeight > 180) {
        setHeight(newHeight);
      }
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

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
                  fontWeight: 600,
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
          borderRadius: "10px",
          ".MuiSvgIcon-root": {
            color: value ? "black" : "black",
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
            backgroundColor: value ? "#EEEEEE" : "#EEEEEE",
            color: "black",
            fontFamily: "Red Hat Display, sans-serif",
            fontSize: {
              xs: "0.5", // default font size for small devices
              sm: "0.75", // for devices with min-width: 600px
              md: "0.87rem", // for devices with min-width: 960px
              lg: "1rem", // for devices with min-width: 1280px
            },
            fontWeight: 600,

            borderRadius: "8px",
          },
          ".MuiInputBase-root": {
            borderRadius: "8px",
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
                },
              },
              color: "black",
              fontFamily: "Red Hat Display, sans-serif",
              fontSize: {
                xs: "0.5", // default font size for small devices
                sm: "0.75", // for devices with min-width: 600px
                md: "0.87rem", // for devices with min-width: 960px
                lg: "1rem", // for devices with min-width: 1280px
              },
              fontWeight: 600,
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

  const filteredDrivers = drivers.filter((driver) =>
    driver.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col relative h-full">
      <MapContainer
        center={[38.736946, -9.142685]}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {filteredDrivers.map((driver, idx) => (
          <Marker key={idx} position={driver.position}>
            <Popup>
              {driver.name} <br /> {driver.phone} <br />
              <Button variant="contained">Details</Button>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <div className="max-w-[60%] sm:max-w-[40%] overflow-y-auto absolute max-h-[80%] z-[999] bg-white top-[8%] left-[4%]">
        <div className="flex justify-between flex-col sm:flex-row items-start sm:items-center p-4 pb-0 gap-4">
          <CustomSelectDropdown
            value={selectedDriver}
            onChange={handleDriverChange}
            name="Driver"
            options={["Driver", "Vehicle"]}
          />

          <TextField
            variant="outlined"
            placeholder="Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <img
                    src={searchIcon}
                    alt="search icon"
                    style={{ width: 25 }}
                  />
                </InputAdornment>
              ),
            }}
            sx={{
              maxWidth:"100%",
              ".MuiOutlinedInput-input": {
                padding: "10px 4px",
              },
            }}
          />
        </div>
        <div className=" p-4 ">
          <CustomSelectDropdown
            value={state}
            onChange={handleStateChange}
            name="State"
            options={["All", "Available", "On the way to pickup", "In ride"]}
          />
        </div>
        <div
          className="hidescrollbar"
          style={{
            height: `${height}px`,
            overflowY: "auto",
            boxSizing: "border-box",
          }}
        >
          {filteredDrivers.map((driver, index) => (
            <div
              key={index}
              className="flex border-t-[1px] border-[#DDDDDD]  justify-between p-4  items-center"
            >
              <div className="flex gap-2 items-center">
                <div>
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                  >
                    <Avatar alt="Remy Sharp" src={driverimage} />
                  </StyledBadge>
                </div>
                <div>
                  <p className="font-redhat font-semibold text-sm md:text-base lg:text-lg">
                    {driver.name}
                  </p>
                  <div className="flex gap-2">
                    <img src={phoneicon} alt="phoneicon" />
                    <p className="font-redhat font-semibold text-sm  lg:text-base text-[#777777]">
                      {driver.phone}
                    </p>
                  </div>
                </div>
              </div>
              <IconButton>
                <img src={moremenuicon} alt="moremenu" />
              </IconButton>
            </div>
          ))}
        </div>
        <div
          className="border-t-[1px] border-[#DDDDDD] py-2 cursor-pointer"
          style={{
            // cursor: "row-resize",
            textAlign: "center",
          }}
          onMouseDown={handleMouseDown}
        >
          <img src={downicon} className="mx-auto" alt="downicon" />
        </div>
      </div>
    </div>
  );
};

export default LiveMap;
