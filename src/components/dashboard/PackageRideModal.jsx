import { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import vehicleicon from "../../assets/vehiclemapicon.svg";
import redoneicon from "../../assets/redoneicon.svg";
import greenoneicon from "../../assets/greenoneicon.svg";
import {
  GoogleMap,
  Marker,
  Polyline,
  // OverlayView,
} from "@react-google-maps/api";
import useGoogleMapsLoader from "../../useGoogleMapsLoader";
import { useGetPackageQuery } from "../../features/Rides/ridesSlice";
import LoadingAnimation from "../common/LoadingAnimation";
import fromlocation from "../../assets/fromlocation.svg";
import tolocation from "../../assets/tolocation.svg";
import { Menu, MenuItem } from "@mui/material";

const mapContainerStyle = {
  height: "100%",
  width: "100%",
};

// const vehicle = { lat: 38.7385, lng: -9.148 };

const rideData = {
  rideId: 1954,
  status: "Ongoing",
  vehicleNo: "WB14CV0002",
  driverName: "Cameron Williamson",
  distanceTime: "20km/28min",
  zone: 1254,
  from: "Sector 9, Badshahpur road, Gurgaon",
  to: "DLF phase 3, Cyber hub, Delhi",
  pickup_location: {
    latitude: 38.737946,
    longitude: -9.137685,
  },
  dropoff_location: {
    latitude: 38.737946,
    longitude: -9.137685,
  },
  stops: [
    "DLF phase 3, Cyber hub, Delhi",
    "DLF phase 3, Cyber hub, Delhi",
    "DLF phase 3, Cyber hub, Delhi",
  ],
};

const PackageRideModal = ({ open, handleClose, selectedRideId }) => {
  const { isLoaded } = useGoogleMapsLoader();
  const {
    data: packageDetails,
    error,
    isLoading,
  } = useGetPackageQuery(selectedRideId);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const start = useMemo(
    () => ({
      lat: packageDetails?.pickup_location.latitude,
      lng: packageDetails?.pickup_location.longitude,
    }),
    [
      packageDetails?.pickup_location.latitude,
      packageDetails?.pickup_location.longitude,
    ]
  );

  const end = useMemo(
    () => ({
      lat: packageDetails?.dropoff_location.latitude,
      lng: packageDetails?.dropoff_location.longitude,
    }),
    [
      packageDetails?.dropoff_location.latitude,
      packageDetails?.dropoff_location.longitude,
    ]
  );

  useEffect(() => {
    if (start && end) {
      // eslint-disable-next-line no-undef
      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin: start,
          destination: end,
          // eslint-disable-next-line no-undef
          travelMode: google.maps.TravelMode.DRIVING, // You can use DRIVING or BICYCLING
        },
        (result, status) => {
          // eslint-disable-next-line no-undef
          if (status === google.maps.DirectionsStatus.OK) {
            setDirectionsResponse(result);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
  }, [start, end]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
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

  if (error) {
    return <h1 className="text-red-400 text-3xl p-4 font-bold">{error}</h1>;
  }

  return (
    <Modal open={open} onClose={handleClose}>
      {!isLoaded || isLoading ? (
        <div>
          <LoadingAnimation height={500} width={500} />
        </div>
      ) : (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            border: "none",
            maxWidth: "1000px",
          }}
        >
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <ArrowBackIcon
                className="cursor-pointer mr-2"
                onClick={handleClose}
              />
              <h2 className="text-2xl font-bold font-redhat">
                Package #{packageDetails?._id?.slice(-5) || 1954}
              </h2>
            </div>
            <CloseIcon
              className="cursor-pointer"
              sx={{ fontSize: "2rem", fontWeight: "bold" }}
              onClick={handleClose}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex gap-8">
              <p className="font-bold text-base font-redhat max-w-[30%] w-full">
                Package ID
              </p>
              <p>#{packageDetails?._id?.slice(-5).toUpperCase() || "Error"}</p>
            </div>
            <div className="flex gap-8">
              <p className="font-bold text-base font-redhat max-w-[30%] w-full">
                Driver Name
              </p>
              <p>{packageDetails?.driver_name || "Not accepted yet!"}</p>
            </div>
            <div className="flex gap-8">
              <p className="font-bold text-base font-redhat max-w-[30%] w-full">
                Status
              </p>
              <p>
                {packageDetails?.status && getStatus(packageDetails?.status)}
              </p>
            </div>
            <div className="flex gap-8">
              <p className="font-bold text-base font-redhat max-w-[30%] w-full">
                Distance
              </p>
              <p>{packageDetails?.distance_in_meters / 1000} km</p>
            </div>
            <div className="flex gap-8">
              <p className="font-bold text-base font-redhat max-w-[30%] w-full">
                Vehicle VIN
              </p>
              {packageDetails?.vehicle_vin ? (
                <p className="font-normal text-sm">
                  {packageDetails?.vehicle_vin}
                </p>
              ) : (
                <p className="font-normal text-red-400 text-sm">Null</p>
              )}
            </div>
            <div className="flex gap-8">
              <p className="font-bold text-base font-redhat max-w-[30%] w-full">
                Weight
              </p>
              {packageDetails?.weight ? (
                <p className="font-normal text-sm">
                  {packageDetails?.weight} kg
                </p>
              ) : (
                <p className="font-normal text-red-400 text-sm">Null</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex gap-8">
              <p className="font-bold text-base font-redhat max-w-[30%] w-full">
                Charge
              </p>
              {packageDetails?.charges ? (
                <p className="font-normal text-sm">
                  € {packageDetails?.charges?.amount}
                </p>
              ) : (
                <p className="font-normal text-red-400 text-sm">Null</p>
              )}
            </div>
            <div className="flex gap-8">
              <p className="font-bold text-base font-redhat max-w-[30%] w-full">
                Dimensions
              </p>
              {packageDetails?.zone ? (
                <p className="font-normal text-sm">
                  #{packageDetails?.driver_id?.slice(-5)}
                </p>
              ) : (
                <p className="font-normal text-red-400 text-sm">None</p>
              )}
            </div>
          </div>
          <div className="flex justify-between mb-8 mt-8 relative">
            <div className="flex-1">
              <div className="flex gap-2">
                <img src={fromlocation} alt="fromlocation" />
                <p className="font-redhat font-bold text-base">From</p>
              </div>
              <p className="text-sm">{packageDetails?.pickup_address}</p>
            </div>

            <div className="relative flex-1 justify-center flex items-baseline">
              <div
                className="flex gap-2 items-center cursor-pointer"
                onClick={handleClick}
              >
                <img src={fromlocation} alt="fromlocation" />
                <p className="font-redhat font-bold text-base">Stop points</p>
                <ArrowDropDownIcon />
              </div>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                className="absolute z-10"
              >
                {rideData &&
                  rideData.stops.map((stop, index) => (
                    <MenuItem key={index} onClick={handleCloseMenu}>
                      {stop}
                    </MenuItem>
                  ))}
              </Menu>
            </div>

            <div className="flex-1">
              <div className="flex gap-2">
                <img src={tolocation} alt="fromlocation" />
                <p className="font-redhat font-bold text-base">To location</p>
              </div>
              <p className="text-sm">{packageDetails?.delivery_address}</p>
            </div>
          </div>

          {/* MAP */}
          <div className="h-[50vh] bg-gray-200 mt-8 relative">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={start}
              zoom={12}
            >
              <Marker position={start} icon={greenoneicon} />
              <Marker position={end} icon={redoneicon} clickable={true} />

              {directionsResponse && (
                <Polyline
                  path={directionsResponse?.routes[0]?.overview_path}
                  options={{
                    strokeColor: "black",
                    strokeOpacity: 1,
                    strokeWeight: 8,
                  }}
                />
              )}
              {/* <OverlayView
                position={vehicle}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              >
                <div className="relative">
                  <img
                    src={vehicleicon}
                    alt="Vehicle"
                    className="w-[70px] -mt-11"
                  />
                </div>
              </OverlayView> */}
            </GoogleMap>
          </div>
        </Box>
      )}
    </Modal>
  );
};

PackageRideModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  selectedRideId: PropTypes.string.isRequired,
};

export default PackageRideModal;
