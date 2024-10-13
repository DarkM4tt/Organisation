/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from "react";
import {
  Button,
  Card,
  Typography,
  Avatar,
  TextField,
  Box,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import profileImage from "../../assets/profile.png";
import carImage from "../../assets/carBigImage.png";
import LoadingAnimation from "../common/LoadingAnimation";
import checkedIcon from "../../assets/checked.svg";
import uncheckedIcon from "../../assets/unchecked.svg";
// import { useUpdateVehicleMutation } from "../../features/Vehicle/vehicleSlice";

const VehicleInfo = ({
  selectedVehicleId,
  setActiveComponent,
  setSelectedVehicle,
}) => {
  const [vehicleDetails, setVehicleDetails] = useState(null);
  const [driverDetails, setDriverDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [error, setError] = useState("");
  const [removeError, setRemoveError] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [driverEmail, setDriverEmail] = useState("");
  const [assignLoading, setAssignLoading] = useState(false);
  const [assignError, setAssignError] = useState("");
  const [uploadingDocument, setUploadingDocument] = useState({});
  const [formData, setFormData] = useState({});
  const [savebuttondisable, setsavebuttondisable] = useState(true);
  // const [updateVehicle] = useUpdateVehicleMutation();

  const renderCheckboxGroup = (label, fieldName) => (
    <Box sx={{ flex: 1, display: "flex", gap: 2, alignItems: "center" }}>
      <Typography variant="body1" fontWeight="700">
        {label}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Box
          sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          onClick={() => {
            setFormData({ ...formData, [fieldName]: true });
            setsavebuttondisable(false);
          }}
        >
          <IconButton sx={{ p: 0 }}>
            <img
              src={formData?.[fieldName] ? checkedIcon : uncheckedIcon}
              alt="yes"
            />
          </IconButton>
          <Typography variant="body2" sx={{ ml: 1 }}>
            Yes
          </Typography>
        </Box>
        <Box
          sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          onClick={() => {
            setFormData({ ...formData, [fieldName]: false });
            setsavebuttondisable(false);
          }}
        >
          <IconButton sx={{ p: 0 }}>
            <img
              src={!formData?.[fieldName] ? checkedIcon : uncheckedIcon}
              alt="no"
            />
          </IconButton>
          <Typography variant="body2" sx={{ ml: 1 }}>
            No
          </Typography>
        </Box>
      </Box>
    </Box>
  );

  const fetchVehicleData = useCallback(async () => {
    const orgId = localStorage.getItem("org_id");
    const url = `https://boldrides.com/api/boldriders/organization/${orgId}/vehicle?vid=${selectedVehicleId}`;
    setLoading(true);
    try {
      const res = await fetch(url);
      if (!res.ok) {
        setError("Error in fetching vehicle details!");
        setLoading(false);
        return;
      }
      const response = await res.json();
      setVehicleDetails(response.vehicle);
      setFormData({
        rent_hourly_charges: response.vehicle?.rent_hourly_charges || 0,
        pet_friendly: response.vehicle?.pet_friendly || false,
        rentable: response.vehicle?.rental || false,
        jump_start: response.vehicle?.jump_start || false,
      });
      setDriverDetails(response.assigned_driver);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [selectedVehicleId]);

  const handleHourlycharges = (e) => {
    setFormData({ ...formData, rent_hourly_charges: parseInt(e.target.value) });
  };

  const handleUpload = (documentType) => {
    setUploadingDocument(documentType);

    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*,application/pdf";

    const cancelUpload = () => {
      setUploadingDocument(null);
      fileInput.removeEventListener("cancel", cancelUpload);
    };

    fileInput.addEventListener("cancel", cancelUpload);

    fileInput.onchange = async (event) => {
      const file = event.target.files[0];
      fileInput.removeEventListener("cancel", cancelUpload);
      if (!file) {
        setUploadingDocument(null);
        return;
      }
      if (file) {
        const baseURL = "https://boldrides.com/api/boldriders";
        const organizationId = localStorage.getItem("org_id");
        let apiUrl = "";
        let keyName = "";

        switch (documentType) {
          case "carInsurancePolicyGreenCard":
            apiUrl = `${baseURL}/organization/${organizationId}/carInsurancePolicyGreenCard/${selectedVehicleId}`;
            keyName = "car_insurance_policy_green_card";
            break;
          case "carInsuranceSpecialConditions":
            apiUrl = `${baseURL}/organization/${organizationId}/carInsuranceSpecialConditions/${selectedVehicleId}`;
            keyName = "car_insurance_special_conditions";
            break;
          case "duaSingleCarDocument":
            apiUrl = `${baseURL}/organization/${organizationId}/duaSingleCarDocument/${selectedVehicleId}`;
            keyName = "dua_single_car_document";
            break;
          case "periodicTechnicalInspection":
            apiUrl = `${baseURL}/organization/${organizationId}/periodicTechnicalInspection/${selectedVehicleId}`;
            keyName = "periodic_technical_inspection";
            break;
          default:
            setUploadingDocument(null);
            return;
        }

        const formData = new FormData();
        formData.append(keyName, file);

        try {
          const res = await fetch(apiUrl, {
            method: "POST",
            body: formData,
          });
          if (!res.ok) {
            setUploadError("Error in uploading document");
          }
          fetchVehicleData();
        } catch (error) {
          setUploadError("Error in uploading document");
        } finally {
          setUploadingDocument(null);
        }
      }
    };
    fileInput.click();
  };

  useEffect(() => {
    setRemoveError("");
    setAssignError("");
    fetchVehicleData();
  }, [fetchVehicleData]);

  const removeDriver = async () => {
    setRemoveLoading(true);
    const orgId = localStorage.getItem("org_id");
    try {
      const response = await fetch(
        `https://boldrides.com/api/boldriders/organization/${orgId}/disassociateVehicle/${vehicleDetails._id}/driver/${driverDetails._id}`,
        {
          method: "POST",
        }
      );
      if (!response.ok) {
        setRemoveError("Error in removing this driver");
        setRemoveLoading(false);
        return;
      }
      fetchVehicleData();
    } catch (error) {
      setRemoveError(error);
    } finally {
      setRemoveLoading(false);
    }
  };

  const handleAssignClick = async () => {
    setAssignLoading(true);
    const orgId = localStorage.getItem("org_id");
    const data = {
      driver_email: driverEmail,
    };
    try {
      const response = await fetch(
        `https://boldrides.com/api/boldriders/organization/${orgId}/assignVehicle/${vehicleDetails._id}/driver`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        setAssignError("Please enter valid driver email!");
        setAssignLoading(false);
        return;
      }
      fetchVehicleData();
    } catch (error) {
      setAssignError(error);
    } finally {
      setAssignLoading(false);
    }
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

  const handleSubmit = async () => {
    console.log(formData);

    try {
      // Make the PUT request with RTK Query
      // const response = await updateVehicle({
      //   vehicleId: vehicleDetails._id,
      //   data: formData, // Payload for PUT request
      // });

      // If request is successful (status 200)
      setsavebuttondisable(true); // Hide Save Changes button
    } catch (error) {
      setAssignError("Error updating vehicle");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between">
        <div className="mb-10 flex items-center cursor-pointer">
          <ArrowBackIcon
            sx={{ mr: 2 }}
            onClick={() => {
              setSelectedVehicle(null);
              setActiveComponent("Vehicles");
            }}
          />
          <Typography sx={{ fontSize: "24px", fontWeight: "700" }}>
            Return to Vehicles
          </Typography>
        </div>

        <div
          className={`Saveformchangesbutton ${
            savebuttondisable ? "hidden" : "block"
          }`}
        >
          <Button
            className="text-xs md:text-sm lg:text-base"
            variant="contained"
            onClick={handleSubmit}
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
            Save changes
          </Button>
        </div>
      </div>
      <div className="mb-10 flex justify-between">
        <div className="flex flex-col flex-1 gap-6">
          <Typography sx={{ fontWeight: "bold", fontSize: "40px" }}>
            {vehicleDetails?.year} {vehicleDetails?.make}{" "}
            {vehicleDetails?.vehicle_model}
          </Typography>
          <div className="flex flex-1 justify-between w-[70%]">
            <div className="flex flex-col">
              <Typography
                variant="body1"
                fontWeight="700"
                sx={{ color: "rgba(153, 153, 153, 1)" }}
              >
                VIN
              </Typography>
              <Typography variant="body1" fontWeight="600">
                {vehicleDetails?.vin}
              </Typography>
            </div>
            <div className="flex flex-col">
              <Typography
                variant="body1"
                fontWeight="700"
                sx={{ color: "rgba(153, 153, 153, 1)" }}
              >
                Color
              </Typography>
              <Typography variant="body1" fontWeight="600">
                {vehicleDetails?.color}
              </Typography>
            </div>
            <div className="flex flex-col">
              <Typography
                variant="body1"
                fontWeight="700"
                sx={{ color: "rgba(153, 153, 153, 1)" }}
              >
                Registration
              </Typography>
              <Typography variant="body1" fontWeight="600">
                {vehicleDetails?.registration_number}
              </Typography>
            </div>
          </div>
        </div>
        <div className="mr-20">
          <img src={carImage} alt="Car" />
        </div>
      </div>

      <Box sx={{ display: "flex", gap: 2, mb: 4, mt: 2 }}>
        {renderCheckboxGroup("Pet friendly vehicle", "pet_friendly")}
        {renderCheckboxGroup("Assist", "assist")}
        {renderCheckboxGroup("Jumpstart", "jump_start")}
      </Box>

      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        {renderCheckboxGroup("Rental", "rentable")}
        {formData.rentable && (
          <Box
            sx={{ flex: 1, display: "flex", gap: "8px", alignItems: "center" }}
          >
            <Typography variant="body1" sx={{ mb: 1 }} fontWeight="700">
              Hourly charges
            </Typography>
            <TextField
              name="hourly_charges"
              value={formData?.rent_hourly_charges}
              onChange={(e) => {
                handleHourlycharges(e);
              }}
              placeholder="In euro"
              sx={{ flex: 1 }}
              variant="outlined"
              type="number"
              inputProps={{ min: 0 }}
            />
          </Box>
        )}
      </Box>

      <div className="flex flex-col md:flex-row justify-between md:gap-[5%]">
        <div className="md:flex-[55%]">
          <Typography
            sx={{ fontSize: "24px", fontWeight: "700", marginBottom: "16px" }}
          >
            Required vehicle documents
          </Typography>
          {[
            {
              label: "[Partner Only] > Car Insurance Policy (Green Card)",
              date: "Valid until December 25, 2024",
              type: "carInsurancePolicyGreenCard",
              value: "car_insurance_policy_green_card",
            },
            {
              label:
                "[Partner Only] > Car Insurance Policy (Special Conditions)",
              date: "Valid until December 25, 2024",
              type: "carInsuranceSpecialConditions",
              value: "car_insurance_special_conditions",
            },
            {
              label:
                "[Partner Only] > DUA - Single Car Document (front and back) or Rental Agreement + DUA/DAV or Declaration of Assignment of Use +DUA/DAV",
              date: "Valid until December 25, 2024",
              type: "duaSingleCarDocument",
              value: "dua_single_car_document",
            },
            {
              label:
                "[Partner Only] > Periodic Technical Inspection (Vehicles over 1 year old)",
              date: "Valid until December 25, 2024",
              type: "periodicTechnicalInspection",
              value: "periodic_technical_inspection",
            },
          ].map((item, index) => (
            <Card
              key={index}
              sx={{
                marginBottom: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 0",
                borderBottom: "1px solid rgba(221, 221, 221, 1)",
              }}
            >
              <div className="md:max-w-[80%]">
                <Typography variant="body1" fontWeight="700">
                  {item.label}
                </Typography>
                <Typography
                  variant="body1"
                  fontWeight="500"
                  sx={{ color: "rgba(24, 196, 184, 1)", marginTop: 1 }}
                >
                  {item.date}
                </Typography>
              </div>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "rgba(238, 238, 238, 1)",
                  color: "#000",
                  fontSize: "16px",
                  fontWeight: "600",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "rgba(238, 238, 238, 1)",
                  },
                }}
                onClick={() => handleUpload(item.type)}
              >
                {uploadingDocument === item.type ? (
                  <LoadingAnimation width={30} height={30} />
                ) : vehicleDetails?.documents &&
                  vehicleDetails?.documents[item.value] ? (
                  "Re-upload"
                ) : (
                  "Upload"
                )}
              </Button>
              {uploadError && (
                <p className="mt-2 font-redhat text-red-400">{uploadError}</p>
              )}
            </Card>
          ))}
        </div>
        <div className="md:flex-[40%]">
          <Typography
            sx={{ fontSize: "24px", fontWeight: "700", marginBottom: "16px" }}
          >
            Driver Responsible
          </Typography>
          <Card
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "16px",
              border: "1px solid rgba(221, 221, 221, 1)",
              borderRadius: "10px",
            }}
          >
            {driverDetails ? (
              <div className="flex flex-col gap-2 w-full">
                <div className="flex">
                  <Avatar
                    src={profileImage}
                    alt="Profile"
                    sx={{ width: 104, height: 104, marginRight: "16px" }}
                  />
                  <div>
                    {driverDetails?.full_name && (
                      <Typography variant="body1" fontWeight="700">
                        {driverDetails?.full_name}
                      </Typography>
                    )}
                    <Typography variant="body1" fontWeight="600">
                      {driverDetails?.status === "ONLINE"
                        ? "Active"
                        : "Inactive"}
                    </Typography>
                    {driverDetails?.phone_number && (
                      <Typography variant="body1" fontWeight="600">
                        {driverDetails?.phone_number}
                      </Typography>
                    )}
                    {driverDetails?.email && (
                      <Typography variant="body1" fontWeight="600">
                        {driverDetails?.email}
                      </Typography>
                    )}
                  </div>
                </div>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "rgba(238, 238, 238, 1)",
                    color: "#000",
                    fontSize: "16px",
                    fontWeight: "600",
                    width: "100%",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "rgba(238, 238, 238, 1)",
                    },
                    borderRadius: "10px",
                  }}
                  onClick={removeDriver}
                >
                  {removeLoading ? (
                    <LoadingAnimation width={30} height={30} />
                  ) : (
                    "Remove Driver"
                  )}
                </Button>
                {removeError && (
                  <p className="text-red-400 text-sm">{removeError}</p>
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-4 w-full">
                <p className="font-redhat ml-2 font-bold text-base text-semiGray">
                  No driver assigned yet!
                </p>
                <TextField
                  variant="outlined"
                  placeholder="Enter driver email"
                  value={driverEmail}
                  onChange={(e) => setDriverEmail(e.target.value)}
                  sx={{
                    width: "100%",
                    ".MuiOutlinedInput-input": {
                      padding: "10px 14px",
                    },
                  }}
                />
                <Button
                  variant="contained"
                  disabled={!driverEmail}
                  sx={{
                    bgcolor: `${
                      driverEmail ? "black" : "rgba(153, 153, 153, 1)"
                    }`,
                    color: "white",
                    fontSize: "16px",
                    fontWeight: "600",
                    width: "100%",
                    textTransform: "none",
                    borderRadius: "10px",
                    "&:hover": {
                      bgcolor: `${
                        driverEmail ? "black" : "rgba(153, 153, 153, 1)"
                      }`,
                    },
                  }}
                  onClick={handleAssignClick}
                >
                  {assignLoading ? (
                    <LoadingAnimation width={30} height={30} />
                  ) : (
                    "Assign Driver"
                  )}
                </Button>
              </div>
            )}
          </Card>
          {assignError && (
            <p className="mt-2 font-bold text-lg text-red-400">{assignError}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VehicleInfo;
