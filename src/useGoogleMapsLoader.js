import { useJsApiLoader } from "@react-google-maps/api";

const googleMapsApiOptions = {
  googleMapsApiKey: "AIzaSyADUMklpWkHyXBGAWiMIXS5-dseLt5Q314",
  libraries: ["drawing", "places"],
};

const useGoogleMapsLoader = () => {
  return useJsApiLoader(googleMapsApiOptions);
};

export default useGoogleMapsLoader;
