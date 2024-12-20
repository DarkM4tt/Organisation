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
import PackageRideModal from "./PackageRideModal";
import LoadingAnimation from "../common/LoadingAnimation";

const Packages = () => {
  const [showRidesModal, setShowRidesModal] = useState(false);
  const [allPackages, setAllPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [state, setState] = useState("");
  const [search, setSearch] = useState("");
  const [selectedRideId, setSelectedRideId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPackagesData = useCallback(async () => {
    const orgId = localStorage.getItem("org_id");
    const url = `${
      import.meta.env.VITE_DEV_URL
    }/organization/${orgId}/get_packages`;
    setLoading(true);
    try {
      const res = await fetch(url);
      if (!res.ok) {
        setError("Error in fetching vehicles!");
        setLoading(false);
        return;
      }
      const response = await res?.json();
      const reversedPackages = response?.reverse();
      setAllPackages(reversedPackages);
      setFilteredPackages(reversedPackages);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPackagesData();
  }, [fetchPackagesData]);

  const handleFilter = useCallback(() => {
    let filtered = allPackages;

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
        return ride?.driver_name?.toLowerCase().includes(searchLower);
      });
    }

    setFilteredPackages(filtered);
  }, [showAll, state, search, allPackages]);

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
    setFilteredPackages(allPackages);
  };

  const getStatus = (status) => {
    if (status === "REACHED") {
      return <p className="font-normal text-sm text-lime-500">Reached</p>;
    } else if (status === "DELIVERED") {
      return <p className="font-normal text-sm text-green-500">Delivered</p>;
    } else if (status === "PICKUP_FAILED ") {
      return <p className="font-normal text-sm text-red-500">Failed</p>;
    } else if (status === "SHIPED") {
      return <p className="font-normal text-sm text-violet-500">Shiped</p>;
    } else if (status === "ENROUTE") {
      return <p className="font-normal text-sm text-blue-500">Onroute</p>;
    } else {
      return <p className="font-normal text-sm text-yellow-500">Pending</p>;
    }
  };

  const handleClose = () => setShowRidesModal(false);

  const truncateAddress = (address, wordLimit = 4) => {
    const words = address?.split(" ");
    if (words?.length <= wordLimit) return address;
    return words?.slice(0, wordLimit)?.join(" ") + "...";
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
      <h1 className="text-2xl font-bold">Packages</h1>
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
      {filteredPackages && filteredPackages.length === 0 && (
        <p className="text-red-400 text-xl p-4 font-bold">
          No package ride created till now!
        </p>
      )}
      {filteredPackages && filteredPackages.length > 0 && (
        <>
          <TableContainer
            sx={{
              maxHeight: "60vh",
              border: "1px solid rgba(221, 221, 221, 1)",
              overflow: "auto",
            }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {[
                    { label: "Ride ID", width: "12%" },
                    { label: "Status", width: "12%" },
                    { label: "Vehicle VIN", width: "15%" },
                    { label: "Driver Name", width: "18%" },
                    { label: "Pickup", width: "15%" },
                    { label: "Drop", width: "18%" },
                    { label: "Weight", width: "5%" },
                    { label: "Distance", width: "5%" },
                  ].map((header, index) => (
                    <TableCell
                      key={index}
                      align="left"
                      sx={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        backgroundColor: "rgba(238, 238, 238, 1)",
                        width: header.width,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {header.label}
                    </TableCell>
                  ))}
                  <TableCell
                    align="center"
                    sx={{
                      width: "5%",
                      backgroundColor: "rgba(238, 238, 238, 1)",
                    }}
                  >
                    <IconButton>
                      <img src={settingsIcon} alt="settingsIcon" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredPackages.map((packageDetails, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      cursor: "pointer",
                      "&:hover": { backgroundColor: "rgba(245, 245, 245, 1)" },
                    }}
                    onClick={() => handleRideClick(packageDetails?._id)}
                  >
                    <TableCell
                      sx={{
                        width: "12%",
                        whiteSpace: "nowrap",
                      }}
                    >
                      #{packageDetails?._id.slice(-5).toUpperCase()}
                    </TableCell>

                    <TableCell sx={{ width: "12%" }}>
                      {getStatus(packageDetails?.status)}
                    </TableCell>

                    <TableCell sx={{ width: "15%" }}>
                      {packageDetails?.vehicle_vin ? (
                        packageDetails.vehicle_vin
                      ) : (
                        <span style={{ color: "red" }}>Null</span>
                      )}
                    </TableCell>

                    <TableCell sx={{ width: "15%" }}>
                      {packageDetails?.driver_name ? (
                        packageDetails?.driver_name
                      ) : (
                        <p className="text-red-500">Not accepted yet</p>
                      )}
                    </TableCell>

                    <TableCell sx={{ width: "18%" }}>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr auto",
                          alignItems: "center",
                        }}
                      >
                        <div className="relative group">
                          <span>
                            {truncateAddress(packageDetails?.pickup_address)}
                          </span>
                          <div className="absolute z-10 bottom-full left-0 hidden group-hover:block bg-black text-white text-xs rounded px-2 py-1 max-w-52">
                            {packageDetails?.pickup_address ||
                              "Fetching address..."}
                          </div>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell sx={{ width: "18%" }}>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr auto",
                          alignItems: "center",
                        }}
                      >
                        <div className="relative group">
                          <span>
                            {truncateAddress(packageDetails?.delivery_address)}
                          </span>
                          <div className="absolute z-10 bottom-full left-0 hidden group-hover:block bg-black text-white text-xs rounded px-2 py-1 max-w-52">
                            {packageDetails?.delivery_address ||
                              "Fetching address..."}
                          </div>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell sx={{ width: "5%", textAlign: "center" }}>
                      {packageDetails?.dimensions?.weight || "Null"} kg
                    </TableCell>

                    <TableCell sx={{ width: "5%", textAlign: "center" }}>
                      {packageDetails?.distance_in_meters / 1000} km
                    </TableCell>

                    <TableCell sx={{ width: "5%", textAlign: "center" }}>
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
        <PackageRideModal
          selectedRideId={selectedRideId}
          open={showRidesModal}
          handleClose={handleClose}
        />
      )}
    </div>
  );
};

export default Packages;
