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
import CustomSelectDropdown from "../common/CustomSelectDropdown";
import AddVehicle from "./AddVehicle";
import LoadingAnimation from "./../common/LoadingAnimation";
import vehiclesIcon from "../../assets/vehicle.svg";
import carImage from "../../assets/carImage.png";
import wrongIcon from "../../assets/wrongIcon.svg";
import infoYellow from "../../assets/infoYellow.svg";
import searchIcon from "../../assets/searchIcon.svg";
import settingsIcon from "../../assets/settingsIcon.svg";
import twoLeft from "../../assets/twoLeft.svg";
import oneLeft from "../../assets/oneLeft.svg";
import twoRight from "../../assets/twoRight.svg";
import redDot from "../../assets/redDot.svg";
import greenDot from "../../assets/greenDot.svg";

// eslint-disable-next-line react/prop-types
const Vehicles = ({ onVehicleClick }) => {
  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);
  const [fetchedVehicles, setFetchedVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [vehicleCategories, setVehicleCategories] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [state, setState] = useState("");
  const [assignment, setAssignment] = useState("");
  const [documents, setDocuments] = useState("");
  const [search, setSearch] = useState("");
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [addVehicleFormData, setAddVehicleFormData] = useState({
    registration_number: "",
    vin: "",
    brand_name: "",
    category_id: "",
    model: "",
    color: "",
    pet_friendly: false,
    intercity: false,
    jump_start: false,
    assist: false,
    rental: false,
    hourly_charges: "",
    security_deposit: "",
    fleet_id: "",
    seats: "",
    insurancePolicy: null,
    technicalInspection: null,
    specialConditionsPolicy: null,
    rentalAgreement: null,
  });
  const [loadingFiles, setLoadingFiles] = useState({
    insurancePolicy: false,
    technicalInspection: false,
    specialConditionsPolicy: false,
    rentalAgreement: false,
  });
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [error, setError] = useState("");
  const [addError, setAddError] = useState("");
  const [categoryError, setCategoryError] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const fetchVehiclesData = useCallback(async () => {
    const orgId = localStorage.getItem("org_id");
    const url = `${
      import.meta.env.VITE_DEV_URL
    }/organization/${orgId}/vehicles`;
    setLoading(true);
    setCategoryError(false);
    try {
      const res = await fetch(url);
      if (!res.ok) {
        setError("Error in fetching vehicles!");
        setLoading(false);
        return;
      }
      const response = await res?.json();
      const reversedVehicles = response?.vehicles?.reverse();
      setFetchedVehicles(reversedVehicles);
      setFilteredVehicles(reversedVehicles);
    } catch (err) {
      setError(err || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchVehicleCategories = useCallback(async () => {
    const url = `${
      import.meta.env.VITE_DEV_URL
    }/organization/vehicleCategories`;
    setLoading(true);
    setCategoryError(false);
    try {
      const res = await fetch(url);
      if (!res.ok) {
        setCategoryError(true);
        setLoading(false);
        return;
      }
      const response = await res.json();
      setVehicleCategories(response.categories);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVehiclesData();
    fetchVehicleCategories();
  }, [fetchVehiclesData, fetchVehicleCategories]);

  const handleFilter = useCallback(() => {
    let filtered = fetchedVehicles;

    if (!showAll) {
      if (state) {
        filtered = filtered.filter((vehicle) => {
          if (state === "Active") {
            return vehicle?.isActive;
          }
          if (state === "Inactive") {
            return !vehicle?.isActive;
          }
          return true;
        });
      }
      if (assignment) {
        assignment === "Not assigned"
          ? (filtered = filtered.filter(
              (vehicle) => vehicle?.assigned_driver_id !== null
            ))
          : (filtered = filtered.filter(
              (vehicle) => vehicle?.assigned_driver_id === null
            ));
      }
      if (documents) {
        filtered = filtered.filter((vehicle) => {
          const docs = vehicle?.documents || {};
          const docCount = Object.keys(docs).length;
          const approvedCount = Object.values(docs).filter(
            (doc) => doc.status === "APPROVED"
          ).length;
          const pendingCount = Object.values(docs).filter(
            (doc) => doc.status === "PENDING"
          ).length;

          if (documents === "Approved") {
            return docCount === 4 && approvedCount === 4;
          }
          if (documents === "Pending") {
            return pendingCount > 0;
          }
          if (documents === "Lacking") {
            return docCount < 4;
          }
          return true;
        });
      }
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter((vehicle) => {
        const yearStr = vehicle?.year?.toString().toLowerCase() || "";
        const modelStr = vehicle?.vehicle_model?.toLowerCase() || "";
        const vinStr = vehicle?.vin?.toLowerCase() || "";
        const makeStr = vehicle?.make?.toLowerCase() || "";

        return (
          yearStr.includes(searchLower) ||
          modelStr.includes(searchLower) ||
          vinStr.includes(searchLower) ||
          makeStr.includes(searchLower)
        );
      });
    }

    setFilteredVehicles(filtered);
  }, [showAll, state, assignment, search, documents, fetchedVehicles]);

  useEffect(() => {
    handleFilter();
  }, [showAll, state, assignment, search, handleFilter]);

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setAddVehicleFormData((prevData) => ({
        ...prevData,
        [fieldName]: file,
      }));
      setLoadingFiles((prevLoading) => ({
        ...prevLoading,
        [fieldName]: false,
      }));
    }
  };

  const handleFileInputClick = (fieldName) => {
    setLoadingFiles((prevLoading) => ({
      ...prevLoading,
      [fieldName]: true,
    }));
  };

  const handleStateChange = (event) => {
    const value = event.target.value;
    setShowAll(false);
    setState((prev) => (prev === value ? "" : value));
  };
  const handleAssignmentChange = (event) => {
    const value = event.target.value;
    setShowAll(false);
    setAssignment((prev) => (prev === value ? "" : value));
  };
  const handleDocumentsChange = (event) => {
    const value = event.target.value;
    setShowAll(false);
    setDocuments((prev) => (prev === value ? "" : value));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name);

    if (name === "hourly_charges" || name === "security_deposit") {
      setAddVehicleFormData((prevFormData) => ({
        ...prevFormData,
        [name]: parseFloat(value),
      }));
      return;
    }
    setAddVehicleFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleAddVehicle = async () => {
    setButtonLoading(true);
    const orgId = localStorage.getItem("org_id");

    const formData = new FormData();
    formData.append(
      "registration_number",
      addVehicleFormData.registration_number
    );
    formData.append("vin", addVehicleFormData.vin.toUpperCase());
    formData.append("brand_name", addVehicleFormData.brand_name);
    formData.append("category_id", addVehicleFormData.category_id);
    formData.append("model", addVehicleFormData.model);
    formData.append("color", addVehicleFormData.color);
    formData.append("seats", addVehicleFormData.seats);
    formData.append("pet_friendly", addVehicleFormData.pet_friendly);
    formData.append("jump_start", addVehicleFormData.jump_start);
    formData.append("assist", addVehicleFormData.assist);
    formData.append("intercity", addVehicleFormData.intercity);
    formData.append("rental", addVehicleFormData.rental);
    addVehicleFormData.rental &&
      formData.append("rent_hourly_charges", addVehicleFormData.hourly_charges);
    addVehicleFormData.rental &&
      formData.append("security_deposit", addVehicleFormData.security_deposit);
    addVehicleFormData.fleet_id &&
      formData.append("vehicle_id", addVehicleFormData.fleet_id);

    if (addVehicleFormData.insurancePolicy) {
      formData.append("green_card", addVehicleFormData.insurancePolicy);
    }
    if (addVehicleFormData.technicalInspection) {
      formData.append(
        "periodic_inspection",
        addVehicleFormData.technicalInspection
      );
    }
    if (addVehicleFormData.specialConditionsPolicy) {
      formData.append(
        "insurance_policy",
        addVehicleFormData.specialConditionsPolicy
      );
    }
    if (addVehicleFormData.rentalAgreement) {
      formData.append("dua", addVehicleFormData.rentalAgreement);
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_DEV_URL}/organization/${orgId}/createVehicle`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const result = await response.json();
        setAddError(result.message || "Error in adding this vehicle.");
        setButtonLoading(false);
        return;
      }

      setShowAddVehicleModal(false);
      setAddVehicleFormData({
        registration_number: "",
        fleet_id: "",
        vin: "",
        brand_name: "",
        category_id: "",
        model: "",
        color: "",
        pet_friendly: false,
        jump_start: false,
        rental: false,
        hourly_charges: 0,
        assist: false,
        insurancePolicy: null,
        rentalAgreement: null,
        specialConditionsPolicy: null,
        technicalInspection: null,
      });
      fetchVehiclesData();
    } catch (error) {
      setAddError(error.message || "An error occurred");
    } finally {
      setButtonLoading(false);
    }
  };

  const handleAllClick = () => {
    setShowAll(true);
    setState("");
    setAssignment("");
    setDocuments("");
    setSearch("");
    setFilteredVehicles(fetchedVehicles);
  };

  const handleMenuOpen = (event, vehicle) => {
    setMenuAnchor(event.currentTarget);
    setSelectedVehicle(vehicle);
  };

  const handleEditVehicle = () => {
    onVehicleClick(selectedVehicle?._id);
  };

  const handleRemoveVehicle = async () => {
    const orgId = localStorage.getItem("org_id");
    const url = `${
      import.meta.env.VITE_DEV_URL
    }/organization/${orgId}/vehicle/`;
    setLoading(true);
    try {
      const response = await fetch(`${url}${selectedVehicle._id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        setError("Error in deleting this vehicle");
        setLoading(false);
        return;
      }
      fetchVehiclesData();
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
      handleMenuClose();
    }
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedVehicle(null);
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

  console.log("FILTERED VEHICLES: ", filteredVehicles);

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
        <h1 className="text-2xl font-bold">Vehicles</h1>
        <Button
          variant="contained"
          startIcon={<img src={vehiclesIcon} alt="Add vehicle" />}
          sx={{
            backgroundColor: showAddVehicleModal ? "#BBBBBB" : "black",
            color: "white",
            textTransform: "none",
            padding: "12px 24px",
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: showAddVehicleModal ? "#BBBBBB" : "black",
            },
          }}
          onClick={() => {
            setCategoryError(false);
            setAddError(false);
            setShowAddVehicleModal((prevValue) => !prevValue);
          }}
        >
          Add vehicle
        </Button>
      </div>
      {showAddVehicleModal && (
        <AddVehicle
          formData={addVehicleFormData}
          handleChange={handleChange}
          handleAddVehicle={handleAddVehicle}
          vehicleCategories={vehicleCategories}
          handleClose={() => {
            setCategoryError(false);
            setAddError(false);
            setShowAddVehicleModal((prevValue) => !prevValue);
          }}
          buttonLoading={buttonLoading}
          addError={addError}
          categoryError={categoryError}
          handleFileChange={handleFileChange}
          handleFileInputClick={handleFileInputClick}
          loadingFiles={loadingFiles}
        />
      )}
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
            options={["Active", "Inactive"]}
          />
          <CustomSelectDropdown
            value={assignment}
            onChange={handleAssignmentChange}
            name="Assignment"
            options={["Assigned", "Not assigned"]}
          />
          <CustomSelectDropdown
            value={documents}
            onChange={handleDocumentsChange}
            name="Documents"
            options={[
              "Approved",
              "Pending",
              "Lacking",
              "Rejected Documents",
              "About to expire",
            ]}
          />
        </div>
        <div className="flex space-x-4 h-10">
          {/* <CustomSelectDropdown
            value={registration}
            onChange={handleRegistrationChange}
            name="Registration"
            options={[
              "Approved",
              "Pending",
              "Lacking",
              "Rejected Documents",
              "About to expire",
            ]}
          /> */}
          <TextField
            variant="outlined"
            placeholder="Search for vehicles"
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
      {filteredVehicles?.length === 0 && (
        <p className="text-red-400 font-redhat text-xl p-4 font-bold">
          No vehicles added till now!
        </p>
      )}
      {filteredVehicles?.length !== 0 && (
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
                    VIN
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
                  <TableCell align="right">
                    <img src={settingsIcon} alt="settingsIcon" />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredVehicles?.map((vehicle, index) => {
                  const documents = vehicle?.documents || {};
                  const { notUploadedCount, pendingCount, status } =
                    getVerificationStatus(documents);

                  return (
                    <TableRow key={index}>
                      <TableCell onClick={() => onVehicleClick(vehicle?._id)}>
                        <div className="flex items-center cursor-pointer">
                          <img src={carImage} alt="vehicle" className="mr-2" />
                          <p className="font-redHat font-bold text-base">
                            {vehicle?.brand} {vehicle?.vehicle_model}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {vehicle?.isActive ? (
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
                          {vehicle?.assigned_driver_id !== "undefined" ||
                          vehicle?.assigned_driver_id === null
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
                        <IconButton onClick={(e) => handleMenuOpen(e, vehicle)}>
                          <MoreVert />
                        </IconButton>
                        <Menu
                          anchorEl={menuAnchor}
                          open={Boolean(menuAnchor)}
                          onClose={handleMenuClose}
                        >
                          <MenuItem onClick={handleEditVehicle}>Edit</MenuItem>
                          <MenuItem onClick={handleRemoveVehicle}>
                            Remove
                          </MenuItem>
                        </Menu>
                      </TableCell>
                    </TableRow>
                  );
                })}
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
    </div>
  );
};

export default Vehicles;
