/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LoadingAnimation from "../common/LoadingAnimation";
import redDot from "../../assets/redDot.svg";
import greenDot from "../../assets/greenDot.svg";
import carImage from "../../assets/carImage.png";
import wrongIcon from "../../assets/wrongIcon.svg";
import wrongBigIcon from "../../assets/crossBig.svg";
import infoYellow from "../../assets/infoYellow.svg";
import searchIcon from "../../assets/searchIcon.svg";

const ColorButton = styled(Button)(() => ({
  fontSize: "16px",
  fontFamily: "Red Hat Display, sans-serif",
}));

const FleetInfo = ({
  selectedFleetId,
  setActiveComponent,
  setSelectedFleet,
}) => {
  const [fleetName, setFleetName] = useState("");
  const [fleetDesc, setFleetDesc] = useState("");
  const [updateError, setUpdateError] = useState("");
  const [fleetError, setFleetError] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fleetDetails, setFleetDetails] = useState(null);
  const [originalFleetData, setOriginalFleetData] = useState(null);
  const [search, setsearch] = useState(null);
  const [vehicleActions, setVehicleActions] = useState([]);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);

  const fetchFleetData = useCallback(async () => {
    const orgId = localStorage.getItem("org_id");
    const url = `https://boldrides.com/api/boldriders/organization/${orgId}/fleet/${selectedFleetId}`;
    setLoading(true);
    try {
      const res = await fetch(url);
      if (!res.ok) {
        setFleetError("Error in fetching fleet data!");
        setLoading(false);
        return;
      }
      const response = await res.json();
      console.log(response.fleet);
      setFleetDetails(response.fleet);
      setOriginalFleetData(response.fleet);
    } catch (err) {
      setFleetError(err);
    } finally {
      setLoading(false);
    }
  }, [selectedFleetId]);

  useEffect(() => {
    if (fleetDetails) {
      setFleetName(fleetDetails.name || "");
      setFleetDesc(fleetDetails.description || "");
    }
  }, [fleetDetails]);

  const validateDescription = () => {
    if (fleetDesc.length < 20) {
      setUpdateError("Discription should be atleast of 30 characters ");
    } else {
      setUpdateError("");
    }
  };

  const validateName = () => {
    if (fleetName.length > 25) {
      setUpdateError("Name should not be more than of 25 characters");
    }
  };

  useEffect(() => {
    const hasChanges =
      fleetName !== fleetDetails?.name ||
      fleetDesc !== fleetDetails?.description ||
      vehicleActions.length > 0;

    const isValid = fleetDesc.length >= 30;

    setIsSaveDisabled(!hasChanges || !isValid);
  }, [fleetName, fleetDesc, vehicleActions, fleetDetails]);

  useEffect(() => {
    fetchFleetData();
  }, [fetchFleetData]);

  const handleUppdateFleet = async () => {
    const orgId = localStorage.getItem("org_id");
    const vin = search; // Assuming the user enters the VIN in the search input
    const url = `https://boldrides.com/api/boldriders/organization/${orgId}/vehicle?vin=${vin}`;

    // Check if the VIN already exists in the fleetDetails.vehicles array
    const vinExists = fleetDetails.vehicles.some(
      (vehicle) => vehicle.vin === vin
    );

    if (vinExists) {
      setUpdateError("This vehicle is already in the fleet.");
      return;
    }

    setButtonLoading(true);
    try {
      const res = await fetch(url);
      if (!res.ok) {
        setUpdateError("Error fetching vehicle data.");
        return;
      }

      const vehicleData = await res.json();
      if (!vehicleData || !vehicleData.vehicle) {
        setUpdateError("Vehicle not found.");
        return;
      }

      // Add the vehicle to the vehicleActions list
      setVehicleActions((prevActions) => [
        ...prevActions,
        { vid: vehicleData.vehicle?._id, action: "add" },
      ]);

      // Update fleetDetails
      setFleetDetails((prevDetails) => ({
        ...prevDetails,
        vehicles: [...prevDetails.vehicles, vehicleData.vehicle],
      }));
    } catch (err) {
      setUpdateError("An error occurred while fetching the vehicle.");
    } finally {
      setButtonLoading(false);
    }
  };

  const handleRemoveVehicle = (vehicleVid, vehicleid) => {
    console.log("Before removal:", fleetDetails.vehicles);
    console.log(vehicleVid, originalFleetData);

    // if (originalFleetData.vehicles.some(vehicle => {
    //   console.log(vehicle)
    //   console.log(vehicle.vin,vehicleVid)
    //   vehicle.vin === vehicleVid})) {
    //   setVehicleActions((prevActions) => [
    //     ...prevActions,
    //     { vid:vehicleid , action: "remove" }
    //   ]);
    // }

    const vehicleExistsInOriginalFleet = originalFleetData?.vehicles.some(
      (vehicle) => vehicle.vin === vehicleVid
    );

    if (vehicleExistsInOriginalFleet) {
      // If the vehicle exists in the original data, mark it with the "remove" action
      setVehicleActions((prevActions) => [
        ...prevActions,
        { vid: vehicleid, action: "remove" },
      ]);
    } else {
      // If the vehicle does not exist in the original data, do nothing
      console.log("Vehicle not present in original data, cannot remove.");
    }

    const updatedVehicles = fleetDetails.vehicles.filter(
      (vehicle) => vehicle.vin !== vehicleVid
    );

    setFleetDetails((prevDetails) => ({
      ...prevDetails,
      vehicles: updatedVehicles,
    }));
  };

  const handleSave = async () => {
    const orgId = localStorage.getItem("org_id");
    const url = `https://boldrides.com/api/boldriders/organization/${orgId}/fleet/${selectedFleetId}`;

    const body = {
      name: fleetName,
      description: fleetDesc,
      vehicles: vehicleActions,
    };

    vehicleActions.length === 0 && delete body.vehicles;

    console.log(body);

    try {
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        setUpdateError("Error updating fleet data.");
        return;
      }

      // Clear vehicle actions after successful update
      setVehicleActions([]);
      setActiveComponent("Fleets");
    } catch (err) {
      setUpdateError("An error occurred while updating the fleet.");
    }
  };

  const isFormValid = fleetName.length > 3 && fleetDesc.length > 3;

  const handleDescriptionChange = (e) => {
    setFleetDesc(e.target.value);
    validateDescription();
  };

  const getVerificationStatus = (documents) => {
    const totalDocs = 4;
    if (!documents || Object.keys(documents).length === 0) {
      return {
        status: false,
        notUploadedCount: totalDocs,
        pendingCount: 0,
        approvedCount: 0,
      };
    }

    const pendingCount = Object.values(documents).filter(
      (doc) => doc.status === "PENDING"
    ).length;
    const approvedCount = Object.values(documents).filter(
      (doc) => doc.status === "APPROVED"
    ).length;
    const notUploadedCount = totalDocs - Object.keys(documents).length;

    const allApproved = approvedCount === totalDocs;

    return {
      status: allApproved,
      notUploadedCount,
      pendingCount,
      approvedCount,
    };
  };

  if (loading) {
    return (
      <div className="mx-auto w-full h-full ">
        <LoadingAnimation height={500} width={500} />
      </div>
    );
  }

  if (fleetError) {
    return (
      <h1 className="text-red-400 text-3xl p-4 font-bold">{fleetError}</h1>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-10 flex items-center cursor-pointer">
        <ArrowBackIcon
          sx={{ mr: 2 }}
          onClick={() => {
            setSelectedFleet(null);
            setActiveComponent("Fleets");
          }}
        />
        <Typography sx={{ fontSize: "24px", fontWeight: "700" }}>
          Fleet name detail/edit page
        </Typography>
      </div>

      <Box
        sx={{
          p: 3,
          width: "100%",
          border: "1px solid #ccc",
          borderRadius: "5px",
          position: "relative",
        }}
      >
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" sx={{ mb: 1 }} fontWeight="700">
              Fleet name
            </Typography>
            <TextField
              value={fleetName}
              onChange={(e) => {
                setFleetName(e.target.value);
                validateName();
              }}
              placeholder="Enter fleet name"
              fullWidth
              variant="outlined"
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" sx={{ mb: 1 }} fontWeight="700">
              Fleet description
            </Typography>
            <TextField
              value={fleetDesc}
              onChange={handleDescriptionChange}
              placeholder="Lorem ipsum dolor sit amet consectetur. Turpis nunc auctor vel amet convallis non viverra. Vel aliquam cras scelerisque rhoncus nunc sed vitae aliquet morbi."
              fullWidth
              variant="outlined"
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="body1" sx={{ mb: 1 }} fontWeight="700">
            Select Vehicle
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 3,
            }}
          >
            <TextField
              variant="outlined"
              placeholder="Search to add vehicles"
              value={search}
              onChange={(e) => setsearch(e.target.value)}
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
            <Button
              variant="contained"
              color="primary"
              onClick={handleUppdateFleet}
              disabled={!isFormValid}
              sx={{
                backgroundColor: isFormValid
                  ? "black"
                  : "rgba(238, 238, 238, 1)",
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
              {buttonLoading ? (
                <LoadingAnimation width={30} height={30} />
              ) : (
                "Add"
              )}
            </Button>
          </Box>
        </Box>

        {fleetDetails &&
          fleetDetails?.vehicles &&
          fleetDetails?.vehicles.length === 0 && (
            <p className="mt-2 font-semibold text-red-400">
              Add vehicles from above box.
            </p>
          )}

        {fleetDetails &&
          fleetDetails?.vehicles &&
          fleetDetails?.vehicles.length > 0 && (
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
                      Vehicle/ID
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
                      VIN and license plate
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "16px",
                        fontWeight: "700",
                      }}
                    >
                      Assignment
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "16px",
                        fontWeight: "700",
                      }}
                    >
                      Verification status
                    </TableCell>
                    <TableCell align="right"> </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {fleetDetails.vehicles.map((vehicle, index) => {
                    console.log(fleetDetails.vehicles);
                    const documents = vehicle.documents || {};
                    const { status, notUploadedCount, pendingCount } =
                      getVerificationStatus(documents);

                    return (
                      <TableRow key={index}>
                        <TableCell>
                          <div className="flex items-center cursor-pointer">
                            <img
                              src={carImage}
                              alt="vehicle"
                              className="mr-2"
                            />
                            <p className="font-redHat font-bold text-base">
                              {vehicle?.year} {vehicle?.make}{" "}
                              {vehicle?.vehicle_model}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          {status ? (
                            <span className="flex gap-2">
                              <img src={greenDot} alt="greenDot" />
                              <p className="font-redhat text-base font-semibold">
                                Active
                              </p>
                            </span>
                          ) : (
                            <span className="flex gap-2">
                              <img src={redDot} alt="redDot" />
                              <p className="font-redhat text-base font-semibold">
                                Inactive
                              </p>
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <p className="font-redhat text-base font-semibold">
                            {vehicle?.vin}
                          </p>
                          <p className="font-redhat text-base font-semibold text-semiGray mt-1">
                            {vehicle?.licensePlate}
                          </p>
                        </TableCell>
                        <TableCell>
                          <p className="font-redhat text-base font-semibold">
                            {vehicle?.assigned_driver_id === null
                              ? "Not assigned"
                              : "Assigned"}
                          </p>
                        </TableCell>
                        <TableCell>
                          {status ? (
                            <span className="bg-[#e6f7e6] px-4 py-2 rounded-2xl text-[#28a745]">
                              Approved
                            </span>
                          ) : (
                            <div className="flex">
                              {notUploadedCount > 0 && (
                                <span
                                  className={`bg-[#f9ecea] pl-4 pr-2 py-2 ${
                                    pendingCount > 0
                                      ? "rounded-l-2xl"
                                      : "rounded-2xl"
                                  } text-[#D40038] flex items-center`}
                                >
                                  <img
                                    src={wrongIcon}
                                    alt="wrongIcon"
                                    className="mr-1"
                                  />
                                  <p>{notUploadedCount}</p>
                                </span>
                              )}
                              {pendingCount > 0 && (
                                <span
                                  className={`bg-[#f9ecea] pl-2 pr-4 py-2 ${
                                    notUploadedCount > 0
                                      ? "rounded-r-2xl"
                                      : "rounded-2xl"
                                  } text-[#C07000] flex items-center`}
                                >
                                  <img
                                    src={infoYellow}
                                    alt="infoYellow"
                                    className="mr-1"
                                  />
                                  <p>{pendingCount}</p>
                                </span>
                              )}
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <img
                            onClick={() =>
                              handleRemoveVehicle(vehicle.vin, vehicle._id)
                            }
                            src={wrongBigIcon}
                            alt="wrongIcon"
                            className="mr-1 cursor-pointer"
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}

        <Box sx={{ mt: 3, mb: 1, color: "#aaa" }}>
          Lorem ipsum dolor sit amet consectetur. Turpis nunc auctor vel amet
          convallis non viverra. Vel aliquam cras scelerisque rhoncus nunc sed
          vitae aliquet morbi.
        </Box>
        {updateError && <p className="mt-2 text-red-400">{updateError}</p>}
      </Box>

      <div className="flex flex-row-reverse py-4 gap-4 pt-12">
        <ColorButton
          variant="contained"
          onClick={handleSave}
          disabled={isSaveDisabled}
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
        >
          Save
        </ColorButton>
        <ColorButton
          className="text-xs md:text-sm lg:text-base"
          variant="contained"
          onClick={() => setActiveComponent("Fleets")}
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
        >
          Cancel
        </ColorButton>
      </div>
    </div>
  );
};

export default FleetInfo;
