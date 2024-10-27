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
  InputAdornment,
} from "@mui/material";
import { Visibility } from "@mui/icons-material";
import searchIcon from "../../assets/searchIcon.svg";
import settingsIcon from "../../assets/settingsIcon.svg";
import twoLeft from "../../assets/twoLeft.svg";
import oneLeft from "../../assets/oneLeft.svg";
import twoRight from "../../assets/twoRight.svg";
import CustomSelectDropdown from "../common/CustomSelectDropdown";
import CabRideModal from "./CabRideModal";
import LoadingAnimation from "../common/LoadingAnimation";

const Cabs = () => {
  const [showRidesModal, setShowRidesModal] = useState(false);
  const [allRides, setAllRides] = useState([]);
  const [filteredRides, setFilteredRides] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [state, setState] = useState("");
  const [search, setSearch] = useState("");
  const [selectedRideId, setSelectedRideId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRidesData = useCallback(async () => {
    const orgId = localStorage.getItem("org_id");
    const url = `${import.meta.env.VITE_DEV_URL}/organization/${orgId}/getCabs`;
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
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

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
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter((ride) => {
        return ride?.driver_id?.full_name.toLowerCase() === searchLower;
      });
    }

    setFilteredRides(filtered);
  }, [showAll, state, search, allRides]);

  useEffect(() => {
    handleFilter();
  }, [showAll, state, search, handleFilter]);

  const handleStateChange = (event) => {
    setShowAll(false);
    const value = event.target.value;
    setState((prev) => (prev === value ? "" : value));
  };

  const handleRideClick = (rideId) => {
    setShowRidesModal(true);
    setSelectedRideId(rideId);
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

  const truncateAddress = (address, wordLimit = 4) => {
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
      <h1 className="text-2xl font-bold">Cab Rides</h1>
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
      {filteredRides && filteredRides.length === 0 && (
        <p className="text-red-400 text-xl p-4 font-bold">
          No cab ride created till now!
        </p>
      )}
      {filteredRides && filteredRides.length > 0 && (
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
                    Vehicle VIN
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
                    Stops
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "16px",
                      fontWeight: "700",
                    }}
                  >
                    Distance
                  </TableCell>
                  <TableCell align="right">
                    <img src={settingsIcon} alt="settingsIcon" />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRides.map((ride, index) => (
                  <TableRow
                    onClick={() => handleRideClick(ride?.ride_id)}
                    key={index}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell>
                      <p className="font-normal text-base">
                        #{ride?.ride_id?.slice(-5)}
                      </p>
                    </TableCell>
                    <TableCell>{getStatus(ride?.status)}</TableCell>
                    <TableCell>
                      <p className="font-normal text-sm">
                        {ride?.vehicle_vin || "NULL"}
                      </p>
                    </TableCell>
                    <TableCell>
                      <p className="font-normal text-sm">
                        {ride?.driver_full_name}
                      </p>
                    </TableCell>
                    <TableCell>
                      <div className="relative group">
                        <p className="font-normal text-sm">
                          {truncateAddress(
                            ride?.pickup_address || "Fetching address..."
                          )}
                        </p>
                        <div className="absolute bottom-full left-0 hidden group-hover:block bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                          {ride?.pickup_address || "Fetching address..."}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="relative group">
                        <p className="font-normal text-sm">
                          {truncateAddress(
                            ride?.dropoff_address || "Fetching address..."
                          )}
                        </p>
                        <div className="absolute bottom-full left-0 hidden group-hover:block bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                          {ride?.dropoff_address || "Fetching address..."}
                        </div>
                      </div>
                      {ride?.toLocation}
                    </TableCell>
                    <TableCell align="center">
                      <p className="font-normal text-base">
                        {ride?.stops?.length}
                      </p>
                    </TableCell>
                    <TableCell>
                      <p className="font-normal text-base">
                        {ride?.distance_in_kilometers + " km"}
                      </p>
                    </TableCell>
                    <TableCell>
                      <IconButton>
                        <Visibility />
                      </IconButton>
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
      )}
      {selectedRideId && (
        <CabRideModal
          selectedRideId={selectedRideId}
          open={showRidesModal}
          handleClose={handleClose}
        />
      )}
    </div>
  );
};

export default Cabs;
