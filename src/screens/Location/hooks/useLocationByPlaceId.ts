import { useState, useEffect } from "react";
import { LocationCategory } from "@satlantis/api-client";

import type { SubCategoryItem } from "../SubCategoriesCarrousel";
import {
  getLocationByPlaceId,
  getLocationByString,
  type LocationsMinimal,
} from "src/client/location";
import { debounce } from "src/utils";

const useLocationByPlaceId = (
  value: string,
  placeId: number | undefined,
  selectedCategories: LocationCategory[],
  selectedSubcategories: SubCategoryItem[],
  sortBy: string,
) => {
  const [isLoading, setLoading] = useState(false);
  const [allLocations, setAllLocations] = useState<LocationsMinimal[]>([]);
  const [locations, setLocations] = useState<LocationsMinimal[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    const getLocations = async () => {
      if (!!selectedCategories.length || !!selectedSubcategories.length) return;

      setLoading(true);
      if (!value) {
        setLocations([]);
        setLoading(false);
        return;
      }

      try {
        let locations: LocationsMinimal[];
        if (!!placeId) {
          locations = await getLocationByPlaceId(
            { placeId },
            controller.signal,
          );
        } else {
          locations = await getLocationByString(
            { search: value },
            controller.signal,
          );
        }
        setLocations(locations);
        setAllLocations(locations);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        if (error.name === "AbortError") return;
      }
    };
    const debounceGetLocations = debounce(getLocations, 300);
    debounceGetLocations();

    return () => {
      controller.abort();
    };
  }, [
    value,
    placeId,
    selectedCategories,
    selectedSubcategories,
    setLocations,
    setAllLocations,
  ]);

  useEffect(() => {
    if (!selectedCategories.length && !selectedSubcategories.length) return;
    const categoriesNames: string = selectedCategories
      .slice(-1)[0]
      .name.trim()
      .toLowerCase();
    setLocations(
      allLocations.filter((location) =>
        location.locationTags.some(
          (tag) => categoriesNames === tag.category.toLowerCase().trim(),
        ),
      ),
    );
  }, [selectedCategories, selectedSubcategories, allLocations, setLocations]);

  useEffect(() => {
    if (!selectedSubcategories.length) return;
    setLocations(
      allLocations.filter((location) => {
        return location.locationTags.some((tag) => {
          return selectedSubcategories.some((subcategory) => {
            return (
              subcategory.key === tag.key &&
              subcategory.value.includes(tag.value)
            );
          });
        });
      }),
    );
  }, [selectedSubcategories, allLocations, setLocations]);

  useEffect(() => {
    if (!sortBy) return;
    setLocations((prevState) => {
      return [...prevState].sort((locationA, locationB) => {
        switch (sortBy) {
          case "Raitings":
            return locationB.googleRating - locationA.googleRating;
          default:
            return 0;
        }
      });
    });
  }, [sortBy, setLocations]);

  return { locations, isLoading };
};

export default useLocationByPlaceId;
