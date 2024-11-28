import { useCallback, useEffect, useMemo, useState } from "react";
import {
  GoogleMap,
  Marker,
  Polyline,
  // OverlayView
} from "@react-google-maps/api";
import useradminpc from "../../assets/useradmin.jpg";
import drivervehicle from "../../assets/superadmincarone.svg";
import useGoogleMapsLoader from "../../useGoogleMapsLoader";
import CalendarTodayIcon from "../../assets/calendericon.svg";
import driverphone from "../../assets/driverphone.svg";
import totaldistance from "../../assets/totaldistance.svg";
import totalduration from "../../assets/totalduration.svg";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import travelicon from "../../assets/travelling.svg";
import redoneicon from "../../assets/redoneicon.svg";
import greenoneicon from "../../assets/greenoneicon.svg";
import LoadingAnimation from "../common/LoadingAnimation";
import { formatDateOnly, formatTimeOnly } from "../../utils/helpers";

// eslint-disable-next-line react/prop-types
const IntercityrideInfo = ({ setActiveComponent, selectedIntercityId }) => {
  const { isLoaded, loadError } = useGoogleMapsLoader();
  const [intercityDetails, setIntercityDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [directionsResponse, setDirectionsResponse] = useState(null);

  const fetchIntercityData = useCallback(async () => {
    const orgId = localStorage.getItem("org_id");
    const url = `${
      import.meta.env.VITE_DEV_URL
    }/organization/${orgId}/getIntracityById/${selectedIntercityId}`;
    setLoading(true);
    try {
      const res = await fetch(url);
      if (!res.ok) {
        setError("Error in fetching vehicle details!");
        setLoading(false);
        return;
      }
      const response = await res.json();
      setIntercityDetails(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [selectedIntercityId]);

  useEffect(() => {
    fetchIntercityData();
  }, [fetchIntercityData]);

  const start = useMemo(
    () => ({
      lat: intercityDetails?.pickup_location.latitude,
      lng: intercityDetails?.pickup_location.longitude,
    }),
    [
      intercityDetails?.pickup_location.latitude,
      intercityDetails?.pickup_location.longitude,
    ]
  );

  const end = useMemo(
    () => ({
      lat: intercityDetails?.dropoff_location.latitude,
      lng: intercityDetails?.dropoff_location.longitude,
    }),
    [
      intercityDetails?.dropoff_location.latitude,
      intercityDetails?.dropoff_location.longitude,
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

  function formatDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (minutes === 0 && secs === 0) {
      return `${hours}hr`;
    } else if (secs === 0) {
      return `${hours}hr ${minutes}min`;
    } else if (minutes === 0) {
      return `${hours}hr ${secs}sec`;
    } else {
      return `${hours}hr ${minutes}min ${secs}sec`;
    }
  }

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
    <div className="py-6 px-8">
      <div className="flex justify-between items-center ">
        <div className="flex items-center gap-4">
          <ArrowBackIcon
            className="cursor-pointer"
            onClick={() => {
              setActiveComponent("Intercity");
            }}
          />
          <h1 className="text-2xl font-bold">
            Intercity ride #{intercityDetails?.id?.slice(-5).toUpperCase()}
          </h1>
        </div>
      </div>
      <div className="flex gap-4 pt-2 mt-4">
        <p className="text-base font-bold font-redhat">
          {intercityDetails?.pickup_city?.name}
        </p>
        <img src={travelicon} alt="travel" />
        <p className="text-base font-bold font-redhat">
          {intercityDetails?.dropoff_city?.name}
        </p>
      </div>
      <div className="flex gap-6 ">
        {/* leftsectione */}
        <div className="flex flex-col gap-6 w-[30%] ">
          {/* Upper Section */}
          <div className="upperone rounded-lg ">
            <div className="flex flex-col items-center pt-8 ">
              <div className="upperphotodiv w-[45%] flex flex-col items-center">
                <div className="phto w-[80%]">
                  <img
                    className="w-full object-cover object-center"
                    src={useradminpc}
                    alt="userone"
                  />
                </div>
                <p className="pt-2 font-redhat text-2xl font-bold text-center">
                  {intercityDetails?.driver_name}
                </p>
                <p className="font-medium text-base font-redhat pt-2 text-center">
                  Driver<span className="text-[#777777]">, 23 y/o</span>
                </p>
              </div>
              <div className="bg-[#1E293B] mt-6 py-6 px-4 flex flex-col gap-2 rounded-t-[8px] ">
                <p className="text-white font-bold text-base ">Ride overview</p>
                <p className="text-white font-normal text-base ">
                  The journey was good and was rated with an average of{" "}
                  <strong>4.2/5</strong> | There was no issue reported and the
                  average speed during the journey was <strong>108 kmph</strong>
                </p>
              </div>
              <div className="lowergreen flex py-3 px-4 gap-4 bg-[#18C4B8] w-full rounded-lg -mt-2 ">
                <img src={drivervehicle} alt="drivervehicle" />
                <div className="flex flex-col gap-2 justify-center">
                  <p className="font-redhat text-white text-sm font-medium">
                    Vehicle:{" "}
                    <span className="font-bold text-base">
                      {intercityDetails?.vehicle_details?.vehicle_model}
                    </span>
                  </p>
                  <p className="font-redhat text-white text-sm font-medium">
                    VIN:{" "}
                    <span className="font-bold text-base">
                      {intercityDetails?.vehicle_details?.vin}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* rightsection */}
        <div className="flex flex-col gap-6 flex-grow">
          <div className="lowerright p-6">
            {/* Check if the Google Maps API has loaded */}
            {loadError && <div>Error loading maps</div>}
            {!isLoaded && <div>Loading Maps...</div>}
            {isLoaded && (
              <GoogleMap
                mapContainerStyle={{ height: "300px", width: "100%" }}
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
              </GoogleMap>
            )}

            <div className="flex justify-between pt-6  ">
              <div className="leftone gap-2">
                <div className="flex gap-4">
                  <p className="text-base font-bold font-redhat">
                    {intercityDetails?.pickup_city?.name}
                  </p>
                  <img src={travelicon} alt="travel" />
                  <p className="text-base font-bold font-redhat">
                    {intercityDetails?.dropoff_city?.name}
                  </p>
                </div>
                <p className="font-normal text-base mt-2">
                  Ride ID:{" "}
                  <span className="text-[#18C4B8]">
                    {intercityDetails?.id.slice(-5).toUpperCase()}
                  </span>
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <img src={CalendarTodayIcon} alt="admin office" />
                <p className="font-redhat font-normal text-base">
                  {formatDateOnly(intercityDetails?.date || "Null")}
                </p>
              </div>
            </div>
            <div className="my-10 flex justify-between ">
              <div className="flex ">
                <img src={driverphone} alt="phone" />
                <div className="flex flex-col gp-2 justify-center ">
                  <p className="font-redhat font-bold text-base">
                    Drivers phone
                  </p>
                  <p className="font-redhat font-medium text-base">
                    {intercityDetails?.driver_phone}
                  </p>
                </div>
              </div>
              <div className="flex ">
                <img src={totaldistance} alt="phone" />
                <div className="flex flex-col gp-2 justify-center ">
                  <p className="font-redhat font-bold text-base">
                    Total Distance
                  </p>
                  <p className="font-redhat font-semibold text-base">
                    82 <span className="text-[#777777] font-medium">Kms</span>
                  </p>
                </div>
              </div>
              <div className="flex ">
                <img src={totalduration} alt="phone" />
                <div className="flex flex-col gp-2 justify-center ">
                  <p className="font-redhat font-bold text-base">
                    Total Duration
                  </p>
                  <p className="font-redhat font-semibold text-base">
                    {formatDuration(intercityDetails?.duration)}
                  </p>
                </div>
              </div>
            </div>

            <p className="font-redhat font-normal text-base text-[#777777]">
              Note: This ride was scheduled through Drivers End. The ride was
              started by{" "}
              <span className="font-semibold text-black">
                {formatTimeOnly(intercityDetails?.date || "Null")}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntercityrideInfo;
