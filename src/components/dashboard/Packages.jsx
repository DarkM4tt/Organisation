/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useState } from "react";
import {
  Button,
  IconButton,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Menu,
  InputAdornment,
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import searchIcon from "../../assets/searchIcon.svg";
import settingsIcon from "../../assets/settingsIcon.svg";
import twoLeft from "../../assets/twoLeft.svg";
import oneLeft from "../../assets/oneLeft.svg";
import twoRight from "../../assets/twoRight.svg";
import CustomSelectDropdown from "../common/CustomSelectDropdown";
import PackageRideModal from "./PackageRideModal";
import LoadingAnimation from "../common/LoadingAnimation";

const rides = [
  {
    rideId: "#1954",
    status: "Pending",
    vehicleNo: "WB14CV0002",
    driverName: "Cameron Williamson",
    from: "Sector 9, Badshahpur road, Gurgaon",
    toLocation: "DLF phase 3, Cyber hub, Delhi",
    stop: 1,
    distanceTime: "20km/28min",
  },
  {
    rideId: "#1953",
    status: "Ongoing",
    vehicleNo: "WB14CV0002",
    driverName: "Cameron Williamson",
    from: "Sector 9, Badshahpur road, Gurgaon",
    toLocation: "DLF phase 3, Cyber hub, Delhi",
    stop: 2,
    distanceTime: "20km/28min",
  },
  {
    rideId: "#1952",
    status: "Ongoing",
    vehicleNo: "WB14CV0002",
    driverName: "Cameron Williamson",
    from: "Sector 9, Badshahpur road, Gurgaon",
    toLocation: "DLF phase 3, Cyber hub, Delhi",
    stop: 3,
    distanceTime: "20km/28min",
  },
  {
    rideId: "#1951",
    status: "Pending",
    vehicleNo: "WB14CV0002",
    driverName: "Cameron Williamson",
    from: "Sector 9, Badshahpur road, Gurgaon",
    toLocation: "DLF phase 3, Cyber hub, Delhi",
    stop: 4,
    distanceTime: "20km/28min",
  },
  {
    rideId: "#1950",
    status: "Pending",
    vehicleNo: "WB14CV0002",
    driverName: "Cameron Williamson",
    from: "Sector 9, Badshahpur road, Gurgaon",
    toLocation: "DLF phase 3, Cyber hub, Delhi",
    stop: 5,
    distanceTime: "20km/28min",
  },
];

const Packages = () => {
  const [showRidesModal, setShowRidesModal] = useState(false);
  const [allRides, setAllRides] = useState([]);
  const [filteredRides, setFilteredRides] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [state, setState] = useState("");
  const [current, setCurrent] = useState("");
  const [search, setSearch] = useState("");
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedRideId, setSelectedRideId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [addresses, setAddresses] = useState({});
  const [fromandtolocation, setfromandtoloaction] = useState(null);

  const getAddress = useCallback(async (latitude, longitude, rideId, type) => {
    const apiKey = "AIzaSyADUMklpWkHyXBGAWiMIXS5-dseLt5Q314";
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.status === "OK") {
        setAddresses((prev) => ({
          ...prev,
          [rideId]: {
            ...prev[rideId],
            [type]: data.results[0].formatted_address,
          },
        }));
      } else {
        setAddresses((prev) => ({
          ...prev,
          [rideId]: {
            ...prev[rideId],
            [type]: "Unable to fetch address",
          },
        }));
      }
    } catch (error) {
      setAddresses((prev) => ({
        ...prev,
        [rideId]: {
          ...prev[rideId],
          [type]: "Error fetching data",
        },
      }));
    }
  }, []);

  const fetchRidesData = useCallback(async () => {
    const orgId = localStorage.getItem("org_id");
    const url = `${
      import.meta.env.VITE_DEV_URL
    }/organization/${orgId}/getallRides`;
    setLoading(true);
    try {
      const res = await fetch(url);
      if (!res.ok) {
        setError("Error in fetching vehicles!");
        setLoading(false);
        return;
      }
      const response = await res.json();
      setAllRides(response.rides);
      setFilteredRides(response.rides);

      // Fetch addresses for all rides
      response.rides.forEach((ride) => {
        if (ride.pickup_location) {
          getAddress(
            ride.pickup_location.latitude,
            ride.pickup_location.longitude,
            ride._id,
            "pickup"
          );
        }
        if (ride.dropoff_location) {
          getAddress(
            ride.dropoff_location.latitude,
            ride.dropoff_location.longitude,
            ride._id,
            "dropoff"
          );
        }
      });
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [getAddress]);

  useEffect(() => {
    fetchRidesData();
  }, [fetchRidesData]);

  const handleFilter = useCallback(() => {
    let filtered = allRides;

    if (!showAll) {
      if (state) {
        filtered = filtered.filter((ride) => {
          return ride?.status.toLowerCase() === state.toLowerCase();
        });
      }
      if (current) {
        console.log(current);
      }
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter((ride) => {
        return ride?.driver_id?.full_name.toLowerCase() === searchLower;
      });
    }

    setFilteredRides(filtered);
  }, [showAll, state, current, search, allRides]);

  useEffect(() => {
    handleFilter();
  }, [showAll, state, current, search, handleFilter]);

  const handleStateChange = (event) => {
    setShowAll(false);
    const value = event.target.value;
    setState((prev) => (prev === value ? "" : value));
  };
  const handleCurrentChange = (event) => {
    setShowAll(false);
    const value = event.target.value;
    setCurrent((prev) => (prev === value ? "" : value));
  };

  const handleMenuOpen = (event, rideId) => {
    setMenuAnchor(event.currentTarget);
    setSelectedRideId(rideId);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedRideId(null);
  };

  const handleRideClick = (rideId) => {
    setShowRidesModal(true);
    setSelectedRideId(rideId);
    setfromandtoloaction({
      fromlocation: addresses[rideId]?.pickup,
      tolocation: addresses[rideId]?.dropoff,
    });
  };

  const handleAllClick = () => {
    setShowAll(true);
    setState("");
    setSearch("");
    setFilteredRides(allRides);
  };

  const getStatus = (status) => {
    if (status === "ACCEPTED") {
      return <p className="font-normal text-sm text-green-500">Accepted</p>;
    } else if (status === "FINISHED") {
      return <p className="font-normal text-sm text-green-500">Finished</p>;
    } else if (status === "CANCELED") {
      return <p className="font-normal text-sm text-[]">Canceled</p>;
    } else if (status === "REQUESTING") {
      return <p className="font-normal text-sm text-[]">Requesting</p>;
    } else if (status === "ONROUTE") {
      return <p className="font-normal text-sm text-green-500">Onroute</p>;
    } else {
      return <p className="font-normal text-sm text-[]">Waiting</p>;
    }
  };

  const handleClose = () => setShowRidesModal(false);

  const truncateAddress = (address, wordLimit = 7) => {
    const words = address.split(" ");
    if (words.length <= wordLimit) return address;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  if (loading) {
    return (
      <div className="mx-auto w-full h-full ">
        <LoadingAnimation height={500} width={500} />
      </div>
    );
  }

  if (error) {
    return <h1 className="text-red-400 text-3xl p-4 font-bold">{error}</h1>;
  }

  return (
    <div className="flex flex-col gap-8 p-4">
      <h1 className="text-2xl font-bold">Rides</h1>
      <div className="flex justify-between">
        <div className="flex space-x-4 h-10">
          <Button
            variant={showAll ? "contained" : "outlined"}
            sx={{
              border: "none",
              textTransform: "none",
              fontWeight: "600",
              fontSize: "16px",
              backgroundColor: showAll ? "black" : "#EEEEEE",
              color: showAll ? "white" : "black",
              borderRadius: "10px",
              "&:hover": {
                backgroundColor: showAll ? "black" : "#EEEEEE",
                border: "none",
              },
            }}
            onClick={handleAllClick}
          >
            All
          </Button>
          <CustomSelectDropdown
            value={state}
            onChange={handleStateChange}
            name="Status"
            options={[
              "Waiting",
              "Canceled",
              "Accepted",
              "Finished",
              "Onroute",
              "Requesting",
            ]}
          />
          <CustomSelectDropdown
            value={current}
            onChange={handleCurrentChange}
            name="Current"
            options={["Assigned", "Not assigned"]}
          />
        </div>
        <div className="flex space-x-4 h-10">
          <TextField
            variant="outlined"
            placeholder="Search for Rides"
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
              width: "150%",
              ".MuiOutlinedInput-input": {
                padding: "10px 4px",
              },
            }}
          />
        </div>
      </div>
      {/* {filteredRides && filteredRides.length === 0 && (
        <p className="text-red-400 text-xl p-4 font-bold">
          No cab ride created till now!
        </p>
      )} */}
      {/* {filteredRides && filteredRides.length > 0 && ( */}
      <>
        <TableContainer>
          <Table
            sx={{
              border: "1px solid rgba(221, 221, 221, 1)",
            }}
          >
            <TableHead
              sx={{
                backgroundColor: "rgba(238, 238, 238, 1)",
                borderRadius: "10px",
              }}
            >
              <TableRow>
                <TableCell
                  sx={{
                    fontSize: "16px",
                    fontWeight: "700",
                  }}
                >
                  Ride ID
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "16px",
                    fontWeight: "700",
                  }}
                >
                  Status
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "16px",
                    fontWeight: "700",
                  }}
                >
                  Vehicle No.
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "16px",
                    fontWeight: "700",
                  }}
                >
                  Driver Name
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "16px",
                    fontWeight: "700",
                  }}
                >
                  From
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "16px",
                    fontWeight: "700",
                  }}
                >
                  To location
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontSize: "16px",
                    fontWeight: "700",
                  }}
                >
                  Stop
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "16px",
                    fontWeight: "700",
                  }}
                >
                  Distance/Time
                </TableCell>
                <TableCell align="right">
                  <img src={settingsIcon} alt="settingsIcon" />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rides.map((ride, index) => (
                <TableRow
                  onClick={(e) => handleRideClick(ride?.rideId)}
                  key={index}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell onClick={(e) => handleRideClick(ride?.rideId)}>
                    <p className="font-normal text-base">{ride?.rideId}</p>
                  </TableCell>
                  <TableCell>{getStatus(ride?.status)}</TableCell>
                  <TableCell>
                    <p className="font-normal text-sm">{ride?.vehicleNo}</p>
                  </TableCell>
                  <TableCell>
                    <p className="font-normal text-sm">{ride?.driverName}</p>
                  </TableCell>
                  <TableCell>
                    {/* <div className="relative group">
                      <p className="font-normal text-sm">
                        {truncateAddress(
                          addresses[ride._id]?.pickup || "Fetching address..."
                        )}
                      </p>
                      <div className="absolute bottom-full left-0 hidden group-hover:block bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                        {addresses[ride._id]?.pickup || "Fetching address..."}
                      </div>
                    </div> */}
                    {ride?.from}
                  </TableCell>
                  <TableCell>
                    {/* <div className="relative group">
                      <p className="font-normal text-sm">
                        {truncateAddress(
                          addresses[ride._id]?.dropoff || "Fetching address..."
                        )}
                      </p>
                      <div className="absolute bottom-full left-0 hidden group-hover:block bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                        {addresses[ride._id]?.dropoff || "Fetching address..."}
                      </div>
                    </div> */}
                    {ride?.toLocation}
                  </TableCell>
                  <TableCell align="center">
                    <p className="font-normal text-base">{ride?.stop}</p>
                  </TableCell>
                  <TableCell>
                    {/* <p className="font-normal text-base">
                      {ride?.distance_in_kilometers + "km/" + "28min"}
                    </p> */}
                    {ride.distanceTime}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={(e) => handleMenuOpen(e, ride)}>
                      <MoreVert />
                    </IconButton>
                    <Menu
                      anchorEl={menuAnchor}
                      open={Boolean(menuAnchor)}
                      onClose={handleMenuClose}
                    >
                      <MenuItem onClick={handleMenuClose}>Option 1</MenuItem>
                      <MenuItem onClick={handleMenuClose}>Option 2</MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="flex justify-between items-center">
          <Select
            value="10"
            onChange={() => {}}
            sx={{
              backgroundColor: "white",
              fontWeight: "600",
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
          >
            <MenuItem value="10">10 lines</MenuItem>
            <MenuItem value="20">20 lines</MenuItem>
            <MenuItem value="50">50 lines</MenuItem>
          </Select>
          <div className="flex gap-4">
            <Button
              sx={{
                color: "rgba(119, 119, 119, 1)",
                paddingInline: "20px",
                paddingBlock: "10px",
                backgroundColor: "rgba(238, 238, 238, 1)",
                fontSize: "14px",
                fontWeight: "500",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "rgba(238, 238, 238, 1)",
                },
              }}
            >
              <img src={twoLeft} alt="twoLeft" className="mr-1" />
              First page
            </Button>
            <Button
              sx={{
                color: "rgba(119, 119, 119, 1)",
                paddingInline: "20px",
                backgroundColor: "rgba(238, 238, 238, 1)",
                fontSize: "14px",
                fontWeight: "500",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "rgba(238, 238, 238, 1)",
                },
              }}
            >
              <img src={oneLeft} alt="oneLeft" className="mr-2" />
              Anterior
            </Button>
            <Button
              sx={{
                color: "rgba(119, 119, 119, 1)",
                paddingInline: "20px",
                backgroundColor: "rgba(238, 238, 238, 1)",
                fontSize: "14px",
                fontWeight: "500",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "rgba(238, 238, 238, 1)",
                },
              }}
            >
              Following
              <img src={twoRight} alt="twoRight" className="ml-1" />
            </Button>
          </div>
        </div>
      </>
      {/* )} */}
      {selectedRideId && (
        <PackageRideModal
          selectedRideId={selectedRideId}
          open={showRidesModal}
          handleClose={handleClose}
          fromandtolocation={fromandtolocation}
        />
      )}
    </div>
  );
};

export default Packages;
