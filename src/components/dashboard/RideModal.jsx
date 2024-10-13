import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import vehicleicon from "../../assets/vehiclemapicon.svg";
import redoneicon from "../../assets/redoneicon.svg";
import greenoneicon from "../../assets/greenoneicon.svg";
import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  Marker,
  Polyline,
  OverlayView,
} from "@react-google-maps/api";
import useGoogleMapsLoader from "../../useGoogleMapsLoader";
import { useGetRideQuery } from "../../features/Rides/ridesSlice";
import LoadingAnimation from "../common/LoadingAnimation";
import fromlocation from "../../assets/fromlocation.svg";
import tolocation from "../../assets/tolocation.svg";
import { Menu, MenuItem } from "@mui/material";

// Helper function to calculate distance between two lat/lng points
const haversineDistance = (coords1, coords2) => {
  const toRad = (x) => (x * Math.PI) / 180;
  const R = 6371; // Radius of the Earth in km
  const dLat = toRad(coords2.lat - coords1.lat);
  const dLng = toRad(coords2.lng - coords1.lng);
  const lat1 = toRad(coords1.lat);
  const lat2 = toRad(coords2.lat);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const mapContainerStyle = {
  height: "100%",
  width: "100%",
};

const center = {
  lat: 38.736946,
  lng: -9.142685,
};

const start = {
  lat: 38.737946,
  lng: -9.137685,
};

const end = {
  lat: 38.736946,
  lng: -9.152685,
};

const vehicle = {
  lat: 38.736946,
  lng: -9.142685,
};

const route = [
  { lat: 38.737946, lng: -9.137685 },
  { lat: 38.736946, lng: -9.142685 },
  { lat: 38.736946, lng: -9.152685 },
];

const rideData = {
  rideId: 1954,
  status: "Ongoing",
  vehicleNo: "WB14CV0002",
  driverName: "Cameron Williamson",
  distanceTime: "20km/28min",
  zone: 1254,
  from: "Sector 9, Badshahpur road, Gurgaon",
  to: "DLF phase 3, Cyber hub, Delhi",
  stops: [
    "DLF phase 3, Cyber hub, Delhi",
    "DLF phase 3, Cyber hub, Delhi",
    "DLF phase 3, Cyber hub, Delhi",
  ],
};

const RideModal = ({ open, handleClose ,selectedRideId ,fromandtolocation}) => {
  const { isLoaded, loadError } = useGoogleMapsLoader();
  console.log(selectedRideId)
  // const { data: rideData, error, isLoading } = useGetRideQuery(selectedRide._id || "66aba7937e23fe98b3b53c67");
  const {
    data: rides,
    error,
    isLoading,
  } = useGetRideQuery(selectedRideId);
  const [rideData, setRideData] = useState(null);

  const distance = haversineDistance(vehicle, end).toFixed(2); // Distance in km
  const eta = Math.ceil(distance / 0.5); // Assuming average speed of 30km/h (0.5km/min)
  const [anchorEl, setAnchorEl] = useState(null);
  useEffect(() => {
    if (rides) {
      setRideData(rides.ride);
    }
  }, [rides]);

  if (!isLoaded) {
    return (
      <div>
        <LoadingAnimation height={500} width={500} />
      </div>
    );
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };


  return (
    <Modal
      open={open}
      onClose={handleClose}
      // aria-labelledby="ride-modal-title"
      // aria-describedby="ride-modal-description"
    >
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
              Ride #{(rideData && rideData._id) || 1954}
            </h2>
          </div>
          <CloseIcon className="cursor-pointer" onClick={handleClose} />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex gap-8">
            <p className="font-bold text-base font-redhat max-w-[30%] w-full">
              Ride ID
            </p>
            <p>#{(rideData && rideData._id) || 1954}</p>
          </div>
          <div className="flex gap-8">
            <p className="font-bold text-base font-redhat max-w-[30%] w-full">
              Driver Name
            </p>
            <p>{rideData && rideData.driver_id.full_name}</p>
          </div>
          <div className="flex gap-8">
            <p className="font-bold text-base font-redhat max-w-[30%] w-full">
              Status
            </p>
            <p>{rideData && rideData.status}</p>
          </div>
          <div className="flex gap-8">
            <p className="font-bold text-base font-redhat max-w-[30%] w-full">
              Distance/Time
            </p>
            <p>{rideData && rideData.distance_in_kilometers}</p>
          </div>
          <div className="flex gap-8">
            <p className="font-bold text-base font-redhat max-w-[30%] w-full">
              Vehicle No
            </p>
            <p>
              {rideData && rideData.driver_id.vehicle_id.registration_number}
            </p>
          </div>
          <div className="flex gap-8">
            <p className="font-bold text-base font-redhat max-w-[30%] w-full">
              Zone
            </p>
            <p>#{rideData && rideData.ride_start_zone.zone_name}</p>
          </div>
        </div>
        <div className="flex justify-between mb-8 mt-8 relative">
          <div className="flex-1">
            <div className="flex gap-2">
              <img src={fromlocation} alt="fromlocation"/>
              <p className="font-redhat font-bold text-base">From</p>
            </div>
            <p className="text-sm">{fromandtolocation?.fromlocation}</p>
          </div>

          <div className="relative flex-1 justify-center flex items-baseline">
            <div className="flex gap-2 items-center cursor-pointer" onClick={handleClick}>
              <img src={fromlocation} alt="fromlocation"/>
              <p className="font-redhat font-bold text-base">Stop points</p>
              <ArrowDropDownIcon />
            </div>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              className="absolute z-10"
            >
              {rideData && rideData.stops.map((stop, index) => (
                <MenuItem key={index} onClick={handleCloseMenu}>
                  {stop}
                </MenuItem>
              ))}
            </Menu>
          </div>

          <div className="flex-1">
            <div className="flex gap-2">
              <img src={tolocation} alt="fromlocation"/>
              <p className="font-redhat font-bold text-base">To location</p>
            </div>
            <p className="text-sm">{fromandtolocation?.tolocation}</p>
          </div>
        </div>
        <div className="h-64 bg-gray-200 mt-8 relative">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={13}
          >
            <Marker
              position={
                rideData && {
                  lat: rideData.pickup_location.latitude,
                  lng: rideData.pickup_location.longitude,
                }
              }
              icon={greenoneicon}
            />
            <Marker position={
                rideData && {
                  lat: rideData.dropoff_location.latitude,
                  lng: rideData.dropoff_location.longitude,
                }
              } icon={redoneicon} clickable={true} />

            <Polyline
              path={route}
              geodesic={true}
              options={{
                strokeColor: "black",
                strokeOpacity: 1,
                strokeWeight: 8, // Set width of the polyline to 8px
              }}
            />
            <OverlayView
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
            </OverlayView>
            <OverlayView
              position={end}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <div className="flex p-2 gap-2 rounded-lg w-28 bg-[#18C4B8] mt-2">
                <p className="text-white text-xs font-bold">{distance} km</p>
                <p className="text-white text-xs font-bold">{eta} min</p>
              </div>
            </OverlayView>
          </GoogleMap>
        </div>
      </Box>
    </Modal>
  );
};

RideModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default RideModal;
