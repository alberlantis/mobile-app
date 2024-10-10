import * as Location from "expo-location";
import { useEffect, useState } from "react";

const useGeoLocation = () => {
  const [geoLocation, setGeoLocation] =
    useState<Location.LocationObject | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [geocodedLocation, setGeocodedLocation] =
    useState<Location.LocationGeocodedAddress | null>(null);
  const [status, setStatus] = useState<Location.PermissionStatus>(
    Location.PermissionStatus.UNDETERMINED,
  );

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      setStatus(status);
      if (status !== "granted") {
        setIsLoading(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setGeoLocation(location);

      if (!location) return;
      const [reverseGeocode] = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setGeocodedLocation(reverseGeocode);
      setIsLoading(false);
    })();
  }, [setStatus, setGeoLocation, setGeocodedLocation, setIsLoading]);

  return { geoLocation, geocodedLocation, status, isLoading };
};

export default useGeoLocation;
