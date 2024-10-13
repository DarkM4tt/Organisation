/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import { useState } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import crossIcon from "../../assets/crossIcon.svg";
import LoadingAnimation from "../common/LoadingAnimation";
import redDot from "../../assets/redDot.svg";
import greenDot from "../../assets/greenDot.svg";
import carImage from "../../assets/carImage.png";
import wrongIcon from "../../assets/crossBig.svg";
import wrongSmallIcon from "../../assets/wrongIcon.svg";
import infoYellow from "../../assets/infoYellow.svg";
import CheckedIcon from "../../assets/checked.svg";
import UnCheckedIcon from "../../assets/unchecked.svg";

const AddFleet = ({
  fleetName,
  setFleetName,
  fleetDesc,
  setFleetDesc,
  handleAddFleet,
  handleClose,
  buttonLoading,
  addError,
  setAddError,
  fetchedVehicles,
  setFetchedVehicles,
  handleAddVehicle,
  vin,
  setVin,
}) => {
  const isFormValid =
    fleetName.length > 2 &&
    fleetDesc.length > 30 &&
    fetchedVehicles.length !== 0;

  const [selectedVehicles, setSelectedVehicles] = useState([]);

  const handleRemoveSelectedVehicles = () => {
    const updatedVehicles = fetchedVehicles.filter(
      (vehicle) => !selectedVehicles.includes(vehicle?._id)
    );
    setFetchedVehicles(updatedVehicles);
    setSelectedVehicles([]);
  };

  const handleToggleVehicleSelection = (vehicleId) => {
    setSelectedVehicles((prevSelected) =>
      prevSelected.includes(vehicleId)
        ? prevSelected.filter((id) => id !== vehicleId)
        : [...prevSelected, vehicleId]
    );
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

  const handleRemoveVehicle = (vehicleId) => {
    const updatedVehicles = fetchedVehicles.filter(
      (vehicle) => vehicle?._id !== vehicleId
    );
    setFetchedVehicles(updatedVehicles);
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
          Create new fleet
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
            Fleet name
          </Typography>
          <TextField
            value={fleetName}
            onChange={(e) => {
              setFleetName(e.target.value);
              fleetName.length > 25
                ? setAddError("Name should not be more than of 25 characters")
                : setAddError("");
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
            onChange={(e) => {
              setFleetDesc(e.target.value);
              fleetDesc.length < 30
                ? setAddError("Discription should be atleast of 30 characters")
                : setAddError("");
            }}
            placeholder="Lorem ipsum dolor sit amet consectetur. Turpis nunc auctor vel amet convallis non viverra. Vel aliquam cras scelerisque rhoncus nunc sed vitae aliquet morbi."
            fullWidth
            variant="outlined"
            multiline
            minRows={4}
            sx={{
              "& .MuiOutlinedInput-root": {
                height: "100px",
                alignItems: "flex-start",
              },
            }}
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
          <Button
            variant="contained"
            color="secondary"
            onClick={handleRemoveSelectedVehicles}
            disabled={selectedVehicles.length === 0}
            sx={{
              backgroundColor: selectedVehicles.length > 0 ? "#FFF0F0" : "grey",
              color: "#FF2D2D",
              textTransform: "none",
              padding: "8px 40px",
              borderRadius: "5px",
              fontSize: "16px",
              fontWeight: "600",
              "&:hover": {
                backgroundColor: "#FFF0F0",
              },
            }}
          >
            Remove
          </Button>
          <TextField
            variant="outlined"
            placeholder="Enter VIN to add vehicles"
            value={vin.toUpperCase()}
            onChange={(e) => setVin(e.target.value)}
            sx={{
              width: "150%",
              ".MuiOutlinedInput-input": {
                padding: "10px 14px",
              },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddVehicle}
            disabled={!vin}
            sx={{
              backgroundColor: vin ? "black" : "rgba(238, 238, 238, 1)",
              color: vin ? "white" : "black",
              textTransform: "none",
              padding: "10px 15px",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: "600",
              "&:hover": {
                backgroundColor: vin ? "black" : "grey",
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
      {fetchedVehicles && fetchedVehicles.length === 0 && (
        <p className="mt-2 font-semibold text-red-400">
          Add vehicles from above box.
        </p>
      )}
      {fetchedVehicles && fetchedVehicles.length !== 0 && (
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
                <TableCell>
                  <img
                    src={
                      selectedVehicles.length === fetchedVehicles.length &&
                      fetchedVehicles.length > 0
                        ? CheckedIcon
                        : UnCheckedIcon
                    }
                    alt="select-all"
                    onClick={() => {
                      if (selectedVehicles.length === fetchedVehicles.length) {
                        setSelectedVehicles([]);
                      } else {
                        setSelectedVehicles(
                          fetchedVehicles.map((vehicle) => vehicle?._id)
                        );
                      }
                    }}
                    className="cursor-pointer"
                  />
                </TableCell>
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
              {fetchedVehicles?.map((vehicle, index) => {
                const documents = vehicle?.documents || {};
                const { status, notUploadedCount, pendingCount } =
                  getVerificationStatus(documents);

                return (
                  <TableRow key={index}>
                    <TableCell>
                      <img
                        src={
                          selectedVehicles.includes(vehicle?._id)
                            ? CheckedIcon
                            : UnCheckedIcon
                        }
                        alt="checkbox"
                        onClick={() =>
                          handleToggleVehicleSelection(vehicle?._id)
                        }
                        className="cursor-pointer"
                      />
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center cursor-pointer">
                        <img src={carImage} alt="vehicle" className="mr-2" />
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
                                src={wrongSmallIcon}
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
                        src={wrongIcon}
                        alt="wrongIcon"
                        className="mr-1 cursor-pointer"
                        onClick={() => handleRemoveVehicle(vehicle._id)}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 2,
          mt: 3,
        }}
      >
        <Button
          variant="outlined"
          sx={{
            color: "black",
            textTransform: "none",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            fontSize: "16px",
            fontWeight: "600",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.1)",
              border: "none",
            },
          }}
          onClick={handleClose}
        >
          Discard
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: "black",
            color: "white",
            textTransform: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            fontSize: "16px",
            fontWeight: "600",
            "&:hover": {
              backgroundColor: "black",
            },
          }}
          onClick={handleAddFleet}
          disabled={!isFormValid}
        >
          {buttonLoading ? <LoadingAnimation width={30} height={30} /> : "Save"}
        </Button>
      </Box>
      <Box sx={{ mt: 3, mb: 1, color: "#aaa" }}>
        Lorem ipsum dolor sit amet consectetur. Turpis nunc auctor vel amet
        convallis non viverra. Vel aliquam cras scelerisque rhoncus nunc sed
        vitae aliquet morbi.
      </Box>
      {addError && <p className="mt-2 text-red-400">{addError.toString()}</p>}
    </Box>
  );
};

AddFleet.propTypes = {
  fleetName: PropTypes.string.isRequired,
  setFleetName: PropTypes.func.isRequired,
  fleetDesc: PropTypes.string.isRequired,
  setFleetDesc: PropTypes.func.isRequired,
  handleAddFleet: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  buttonLoading: PropTypes.bool.isRequired,
  addError: PropTypes.string.isRequired,
  fetchedVehicles: PropTypes.array.isRequired,
};

export default AddFleet;
