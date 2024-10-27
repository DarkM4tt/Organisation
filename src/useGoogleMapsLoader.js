import { useJsApiLoader } from "@react-google-maps/api";

const googleMapsApiOptions = {
  googleMapsApiKey: "AIzaSyBTjWye2ChHTGsKhaVl9pkNFszW_MDGQnM",
  libraries: ["drawing", "places"],
};

const useGoogleMapsLoader = () => {
  return useJsApiLoader(googleMapsApiOptions);
};

export default useGoogleMapsLoader;
