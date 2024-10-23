/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from "react";
import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import LoadingAnimation from "./../common/LoadingAnimation";
import vehiclesIcon from "../../assets/vehicle.svg";
import settingsIcon from "../../assets/settingsIcon.svg";
import AddFleet from "./AddFleet";

const Fleets = ({ onFleetClick }) => {
  const [showAddFleetModal, setShowAddFleetModal] = useState(false);
  const [fetchedFleets, setFetchedFleets] = useState([]);
  const [fetchedVehicles, setFetchedVehicles] = useState([]);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [fleetName, setFleetName] = useState("");
  const [fleetDesc, setFleetDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [error, setError] = useState("");
  const [addError, setAddError] = useState("");
  const [vin, setVin] = useState("");
  const [selectedFleet, setSelectedFleet] = useState(null);

  const fetchFleetsData = useCallback(async () => {
    const orgId = localStorage.getItem("org_id");
    const url = `${import.meta.env.VITE_DEV_URL}/organization/${orgId}/fleets`;
    setLoading(true);
    try {
      const res = await fetch(url);
      if (!res.ok) {
        setError("Error in fetching fleets!");
        setLoading(false);
        return;
      }
      const response = await res.json();
      if (response.message === "Organization not Found") {
        setError("Organization not Found");
        return;
      }
      setFetchedFleets(response.fleets);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchVehicleData = useCallback(async () => {
    const orgId = localStorage.getItem("org_id");
    const url = `${
      import.meta.env.VITE_DEV_URL
    }/organization/${orgId}/vehicle?vin=${vin}`;
    setButtonLoading(true);

    const vehicleExists = fetchedVehicles.some(
      (vehicle) => vehicle.vin === vin
    );

    if (vehicleExists) {
      setAddError("Vehicle already added!");
      setVin("");
      setButtonLoading(false);
      return;
    }

    try {
      const res = await fetch(url, {
        method: "GET",
      });
      if (!res.ok) {
        setAddError("Error in fetching vehicle data!");
        setButtonLoading(false);
        return;
      }
      const response = await res.json();
      if (!response.vehicle) {
        setAddError(response.message);
        setVin("");
      } else {
        setFetchedVehicles([...fetchedVehicles, response.vehicle]);
        setVin("");
      }
    } catch (err) {
      setAddError(err || "An unexpected error occurred.");
    } finally {
      setButtonLoading(false);
    }
  }, [fetchedVehicles, vin]);

  useEffect(() => {
    fetchFleetsData();
  }, [fetchFleetsData]);

  const handleAddFleet = async () => {
    const fleetVehicles = [];
    fetchedVehicles.map((vehicle) => fleetVehicles.push(vehicle._id));
    setButtonLoading(true);
    const formData = {
      name: fleetName,
      description: fleetDesc,
      vehicles: fleetVehicles,
    };
    const orgId = localStorage.getItem("org_id");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_DEV_URL}/organization/${orgId}/fleet`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        setAddError("Error in adding this vehicle");
        setButtonLoading(false);
        return;
      }
      const result = await response.json();
      setShowAddFleetModal(false);
      setFleetDesc("");
      setFleetName("");
      setFetchedVehicles([]);
      fetchFleetsData();
    } catch (error) {
      setAddError(error);
    } finally {
      setButtonLoading(false);
    }
  };

  const handleMenuOpen = (event, fleet) => {
    setMenuAnchor(event.currentTarget);
    setSelectedFleet(fleet);
  };

  const handleEditFleet = () => {
    onFleetClick(selectedFleet._id);
  };

  const handleRemoveFleet = async () => {
    const orgId = localStorage.getItem("org_id");
    const url = `${import.meta.env.VITE_DEV_URL}/organization/${orgId}/fleet/`;
    setLoading(true);
    try {
      const response = await fetch(`${url}${selectedFleet._id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        setError("Error in deleting this vehicle");
        setLoading(false);
        return;
      }
      const result = await response.json();
      fetchFleetsData();
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
      handleMenuClose();
    }
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedFleet(null);
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
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Fleets</h1>
        <Button
          variant="contained"
          startIcon={<img src={vehiclesIcon} alt="Add vehicle" />}
          sx={{
            backgroundColor: showAddFleetModal ? "#BBBBBB" : "black",
            color: "white",
            textTransform: "none",
            padding: "12px 24px",
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: showAddFleetModal ? "#BBBBBB" : "black",
            },
          }}
          onClick={() => {
            setAddError(false);
            setShowAddFleetModal((prevValue) => !prevValue);
          }}
        >
          Add fleet
        </Button>
      </div>
      {showAddFleetModal && (
        <AddFleet
          fleetName={fleetName}
          setFleetName={setFleetName}
          fleetDesc={fleetDesc}
          setFleetDesc={setFleetDesc}
          handleAddFleet={handleAddFleet}
          handleAddVehicle={fetchVehicleData}
          handleClose={() => {
            setAddError(false);
            setShowAddFleetModal((prevValue) => !prevValue);
          }}
          setAddError={setAddError}
          buttonLoading={buttonLoading}
          addError={addError}
          fetchedVehicles={fetchedVehicles}
          setFetchedVehicles={setFetchedVehicles}
          vin={vin}
          setVin={setVin}
        />
      )}
      {fetchedFleets?.length === 0 && (
        <p className="text-red-400 font-redhat text-xl p-4 font-bold">
          No fleets added till now!
        </p>
      )}
      {fetchedFleets && fetchedFleets?.length !== 0 && (
        <TableContainer className="">
          <Table
            sx={{
              borderCollapse: "separate",
              borderSpacing: "0px 16px",
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontSize: "16px",
                    fontWeight: "700",
                    borderBottomWidth: "0px",
                    paddingBottom: "0px",
                  }}
                >
                  Fleet name
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "16px",
                    fontWeight: "700",
                    borderBottomWidth: "0px",
                    paddingBottom: "0px",
                  }}
                >
                  Vehicles
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ borderBottomWidth: "0px", paddingBottom: "0px" }}
                >
                  <img src={settingsIcon} alt="settingicon" className="pl-2" />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fetchedFleets?.map((fleet, index) => (
                <TableRow
                  key={index}
                  sx={{
                    borderRadius: "8px",
                    backgroundColor: "#EEEEEE",
                  }}
                >
                  <TableCell
                    onClick={() => onFleetClick(fleet._id)}
                    sx={{
                      fontSize: "14px",
                      fontWeight: "700",
                      cursor: "pointer",
                    }}
                  >
                    {fleet.name}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                  >
                    {fleet?.vehicles?.length}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={(e) => handleMenuOpen(e, fleet)}>
                      <MoreVert />
                      <Menu
                        anchorEl={menuAnchor}
                        open={Boolean(menuAnchor)}
                        onClose={(e) => {
                          e.stopPropagation();
                          handleMenuClose();
                        }}
                      >
                        <MenuItem onClick={handleEditFleet}>Edit</MenuItem>
                        <MenuItem onClick={handleRemoveFleet}>Remove</MenuItem>
                      </Menu>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default Fleets;
