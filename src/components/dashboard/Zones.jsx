import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  GoogleMap,
  Polygon,
  DrawingManager,
  Autocomplete,
} from "@react-google-maps/api";
import { TextField, Button, styled } from "@mui/material";
import Zoneslist from "./Zoneslist";
import ZonesModal from "./Zonesmodal";
import LoadingAnimation from "../common/LoadingAnimation";
import {
  useGetZonesQuery,
  useAddZoneMutation,
} from "../../features/Zones/zonesSlice";
import useGoogleMapsLoader from "../../useGoogleMapsLoader";
import { useGetCarCategoriesQuery } from "../../features/Vehicle/vehicleSlice";

const ColorButton = styled(Button)(({ theme }) => ({
  fontSize: "16px",
  fontFamily: "Red Hat Display, sans-serif",
}));

const Zones = () => {
  const [drawingControlEnabled, setDrawingControlEnabled] = useState(true);
  const [polygon, setPolygon] = useState([]);
  const drawingManagerRef = useRef(null);
  const polygonRef = useRef(null);
  const mapRef = useRef(null);
  const autocompleteRef = useRef(null);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [zoneData, setZoneData] = useState([]);
  const [addZone, { isLoading: isAdding }] = useAddZoneMutation();
  const { data: fetchedZones, error, isLoading, refetch } = useGetZonesQuery();
  const { isLoaded, loadError } = useGoogleMapsLoader();
  const { data } = useGetCarCategoriesQuery();
  const [carOptions, setcaroptions] = useState([]);

  useEffect(() => {
    if (data) {
      console.log(data)
      const carOptionsData = data?.categories?.map((carobject) => ({
        carType: carobject.name,
        vehicle_category: carobject._id,
      }));
      console.log(carOptions)
      setcaroptions(carOptionsData);
    }
  }, [data]);

  const handleClose = async (newZone) => {
    setOpen(false);
    if (newZone) {
      console.log(newZone);
      const zonePayload = {
        zone_name: search,
        prices: newZone?.prices?.map((price) => ({
          vehicle_category: price.carType, // replace this with actual vehicle category ID
          price_per_km: parseFloat(price.perKmCharges),
          waiting_per_minute: parseFloat(price.waitingCharges),
        })),
        coordinates: polygon,
      };

      console.log(zonePayload);

      try {
        await addZone(zonePayload).unwrap();
        handleReset();
        setSearch("");
        refetch();
      } catch (error) {
        console.error("Failed to save the zone:", error);
      }
    }
  };

  const onOverlayComplete = useCallback((e) => {
    if (e.type === "polygon") {
      if (polygonRef.current) {
        polygonRef.current.setMap(null);
      }

      const path = e.overlay.getPath();
      const coordinates = [];
      for (let i = 0; i < path.getLength(); i++) {
        const point = path.getAt(i);
        coordinates.push([point.lat(), point.lng()]);
      }

      // Ensure the polygon is closed
      if (
        coordinates.length > 0 &&
        coordinates[0] !== coordinates[coordinates.length - 1]
      ) {
        coordinates.push(coordinates[0]);
      }

      console.log("Polygon Coordinates:", coordinates);

      setPolygon(coordinates);
      polygonRef.current = e.overlay;
      setDrawingControlEnabled(false);

      const bounds = new window.google.maps.LatLngBounds();
      coordinates.forEach((coord) => bounds.extend(coord));
      mapRef.current.fitBounds(bounds);
    }
  }, []);

  const handleReset = () => {
    if (polygonRef.current) {
      polygonRef.current.setMap(null);
      polygonRef.current = null;
    }
    setPolygon([]);
    setDrawingControlEnabled(true);
    drawingManagerRef.current.setDrawingMode(
      window.google.maps.drawing.OverlayType.POLYGON
    );
  };

  const handleSubmit = () => {
    if (polygon.length > 0) {
      console.log("Polygon Coordinates:", polygon);
      search && polygon && setOpen(true);
    } else {
      console.log("No polygon drawn");
    }
  };

  const onPlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (place.geometry) {
      mapRef.current.panTo(place.geometry.location);
      mapRef.current.setZoom(15);
    } else {
      console.log("No geometry available for the selected place.");
    }
  };

  useEffect(() => {
    if (fetchedZones) {
      console.log(fetchedZones.zones);
      setZoneData(fetchedZones.zones);
    }
  }, [fetchedZones]);

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return (
      <div>
        <LoadingAnimation height={500} width={500} />
      </div>
    );
  }

  return ( <div>Zones</div>
    // <div className="p-6">
    //   <p className="font-bold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-black font-redhat">
    //     Business zone name (Default)
    //   </p>
    //   <div className="py-4">
    //     <TextField
    //       variant="outlined"
    //       placeholder="Write a new business zone name"
    //       value={search}
    //       onChange={(e) => setSearch(e.target.value)}
    //       sx={{
    //         backgroundColor: "white",
    //         width: "100%",
    //         ".MuiOutlinedInput-input": {
    //           padding: "10px 16px",
    //         },
    //       }}
    //     />
    //   </div>
    //   <div style={{ position: "relative", width: "100%" }}>
    //     <div
    //       className="hidden md:flex"
    //       style={{
    //         marginBottom: "10px",
    //         position: "absolute",
    //         zIndex: 1,
    //         right: "10%",
    //         top: "1%",
    //         width: "30%",
    //       }}
    //     >
    //       <Autocomplete
    //         onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
    //         onPlaceChanged={onPlaceChanged}
    //       >
    //         <input
    //           type="text"
    //           placeholder="Search places"
    //           style={{
    //             boxSizing: "border-box",
    //             border: "1px solid transparent",
    //             width: "100%",
    //             height: "32px",
    //             padding: "0 12px",
    //             borderRadius: "3px",
    //             boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
    //             fontSize: "14px",
    //             outline: "none",
    //             textOverflow: "ellipses",
    //           }}
    //         />
    //       </Autocomplete>
    //     </div>
    //     <GoogleMap
    //       mapContainerStyle={{ height: "500px", width: "" }}
    //       center={{ lat: 40.756795, lng: -73.954298 }}
    //       zoom={13}
    //       onLoad={(map) => (mapRef.current = map)}
    //     >
    //       <DrawingManager
    //         onLoad={(manager) => {
    //           drawingManagerRef.current = manager;
    //         }}
    //         onOverlayComplete={onOverlayComplete}
    //         options={{
    //           drawingControl: drawingControlEnabled,
    //           drawingControlOptions: {
    //             position: window.google.maps.ControlPosition.TOP_CENTER,
    //             drawingModes: [window.google.maps.drawing.OverlayType.POLYGON],
    //           },
    //           polygonOptions: {
    //             editable: true,
    //             draggable: true,
    //           },
    //         }}
    //       />
    //       {polygon.length > 0 && (
    //         <Polygon
    //           paths={polygon}
    //           options={{
    //             fillColor: "#2196F3",
    //             fillOpacity: 0.4,
    //             strokeColor: "#2196F3",
    //             strokeOpacity: 1,
    //             strokeWeight: 2,
    //             editable: true,
    //             draggable: true,
    //           }}
    //         />
    //       )}
    //     </GoogleMap>
    //     <div className="flex flex-row-reverse py-4 gap-4">
    //       <ColorButton
    //         variant="contained"
    //         sx={{
    //           backgroundColor: "black",
    //           fontWeight: 600,
    //           color: "white",
    //           fontFamily: "Red Hat Display, sans-serif",
    //           textTransform: "none",
    //           padding: "12px 24px",
    //           borderRadius: "4px",
    //           "&:hover": {
    //             backgroundColor: "black",
    //           },
    //         }}
    //         onClick={handleSubmit}
    //       >
    //         Submit
    //       </ColorButton>
    //       <ColorButton
    //         className="text-xs md:text-sm lg:text-base"
    //         variant="contained"
    //         sx={{
    //           backgroundColor: "#EEEEEE",
    //           fontWeight: 600,
    //           color: "black",
    //           textTransform: "none",
    //           padding: "12px 24px",
    //           borderRadius: "4px",
    //           "&:hover": {
    //             backgroundColor: "#EEEEEE",
    //           },
    //         }}
    //         onClick={handleReset}
    //       >
    //         Reset
    //       </ColorButton>
    //       <ZonesModal
    //         open={open}
    //         handleClose={handleClose}
    //         zoneName={search}
    //         handleReset={handleReset}
    //         carOptions={carOptions}
    //       />
    //     </div>
    //   </div>

    //   {zoneData && (
    //     <Zoneslist
    //       sampleData={zoneData}
    //       openmodal={setOpen}
    //       carOptions={carOptions}
    //     />
    //   )}
    // </div>
  );
};

export default Zones;
