import { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
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
import { useGetJumpstartQuery } from "../../features/Rides/ridesSlice";
import LoadingAnimation from "../common/LoadingAnimation";
import fromlocation from "../../assets/fromlocation.svg";
import tolocation from "../../assets/tolocation.svg";

const mapContainerStyle = {
  height: "100%",
  width: "100%",
};

const JumpstartRideModal = ({ open, handleClose, selectedRideId }) => {
  const { isLoaded } = useGoogleMapsLoader();
  const {
    data: rideDetails,
    error,
    isLoading,
  } = useGetJumpstartQuery(selectedRideId);
  const [directionsResponse, setDirectionsResponse] = useState(null);

  const start = useMemo(
    () => ({
      lat: rideDetails?.serviceLocation?.latitude,
      lng: rideDetails?.serviceLocation.longitude,
    }),
    [
      rideDetails?.serviceLocation?.latitude,
      rideDetails?.serviceLocation?.longitude,
    ]
  );

  const end = useMemo(
    () => ({
      lat: rideDetails?.driverLocation.latitude,
      lng: rideDetails?.driverLocation.longitude,
    }),
    [
      rideDetails?.driverLocation.latitude,
      rideDetails?.driverLocation.longitude,
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

  const getStatus = (status) => {
    if (status === "connection_ini") {
      return <p className="font-normal text-sm text-lime-500">Initiated</p>;
    } else if (status === "connection_accepted") {
      return <p className="font-normal text-sm text-green-500">Accepted</p>;
    } else if (status === "connection_rejected") {
      return <p className="font-normal text-sm text-red-500">Rejected</p>;
    } else {
      return <p className="font-normal text-sm text-blue-300">Null</p>;
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
                Ride #
                {rideDetails?.jumpstartId?.slice(-5)?.toUpperCase() || 1954}
              </h2>
            </div>
            <CloseIcon
              className="cursor-pointer"
              sx={{ fontSize: "2rem", fontWeight: "bold" }}
              onClick={handleClose}
            />
          </div>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="flex gap-8">
              <p className="font-bold text-base font-redhat max-w-[30%] w-full">
                Ride ID
              </p>
              <p>
                #{rideDetails?.jumpstartId?.slice(-5)?.toUpperCase() || "Error"}
              </p>
            </div>
            <div className="flex gap-8">
              <p className="font-bold text-base font-redhat max-w-[30%] w-full whitespace-nowrap">
                Driver Name
              </p>
              <p>{rideDetails?.driverName?.full_name || "Not accepted yet!"}</p>
            </div>
            <div className="flex gap-8">
              <p className="font-bold text-base font-redhat max-w-[30%] w-full">
                Status
              </p>
              <p>
                {rideDetails?.connectionStatus &&
                  getStatus(rideDetails?.connectionStatus)}
              </p>
            </div>
            <div className="flex gap-8">
              <p className="font-bold text-base font-redhat max-w-[30%] w-full">
                Distance Fare
              </p>
              <p>{rideDetails?.distanceFare}</p>
            </div>
            <div className="flex gap-8">
              <p className="font-bold text-base font-redhat max-w-[30%] w-full">
                Vehicle VIN
              </p>
              {rideDetails?.vehicleDetails?.vin ? (
                <p className="font-normal text-sm">
                  {rideDetails?.vehicleDetails?.vin}
                </p>
              ) : (
                <p className="font-normal text-red-400 text-sm">Null</p>
              )}
            </div>
            <div className="flex gap-8">
              <p className="font-bold text-base font-redhat max-w-[30%] w-full">
                Zone
              </p>
              {rideDetails?.zone && rideDetails?.zone.length > 0 ? (
                <p className="font-normal text-sm">
                  {rideDetails?.zone[0]?.zone_name}
                </p>
              ) : (
                <p className="font-normal text-red-400 text-sm">None Zone</p>
              )}
            </div>
            <div className="flex gap-8">
              <p className="font-bold text-base font-redhat max-w-[30%] w-full">
                Driver ID
              </p>
              {rideDetails?.zone ? (
                <p className="font-normal text-sm">
                  #{rideDetails?.driverName?._id?.slice(-5).toUpperCase()}
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
                <p className="font-redhat font-bold text-base">
                  Service Address
                </p>
              </div>
              <p className="text-sm">{rideDetails?.serviceAddress}</p>
            </div>

            <div className="flex-1">
              <div className="flex gap-2">
                <img src={tolocation} alt="fromlocation" />
                <p className="font-redhat font-bold text-base">
                  Driver Address
                </p>
              </div>
              <p className="text-sm">{rideDetails?.driverAddress}</p>
            </div>
          </div>

          {/* MAP */}
          <div className="h-[35vh] bg-gray-200 mt-8 relative">
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

JumpstartRideModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  selectedRideId: PropTypes.string.isRequired,
};

export default JumpstartRideModal;
