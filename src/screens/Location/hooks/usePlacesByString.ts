import { useState, useEffect } from "react";

import { getPlacesByString, type PlacesMinimal } from "src/client/location";
import { debounce } from "src/utils";

const usePlacesByString = (value: string, isPlaceSelected: boolean) => {
  const [isLoading, setLoading] = useState(false);
  const [places, setPlaces] = useState<PlacesMinimal[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    const getPlaces = async () => {
      setLoading(true);
      if (!value || isPlaceSelected) {
        setPlaces([]);
        setLoading(false);
        return;
      }

      try {
        const places = await getPlacesByString(
          { name: value },
          controller.signal,
        );
        setPlaces(places);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        if (error.name === "AbortError") return;
      }
    };
    const debounceGetPlaces = debounce(getPlaces, 300);

    debounceGetPlaces();

    return () => {
      controller.abort();
    };
  }, [value, isPlaceSelected, setPlaces]);

  return { places, isLoading };
};

export default usePlacesByString;
