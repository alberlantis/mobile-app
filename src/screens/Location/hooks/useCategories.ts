import { useEffect, useState } from "react";
import { LocationCategory } from "@satlantis/api-client";

import { useAppSelector, LocationsState, useAppDispatch } from "src/store";

const Categories = {
  LOCAL_PICKS: "Local Picks",
  BITCOIN_ACCEPTED: "Bitcoin Accepted",
  RESTAURANTS_CAFES: "Restaurants & Cafes",
  COWORKING: "Coworking",
  WELLNESS_FITNESS: "Wellness & Fitness",
  HEALTHCARE: "Healthcare",
  GROCERY_FOODS: "Grocery & Specialty Foods",
  LODGING: "Lodging",
  NIGHTLIFE: "Nightlife",
  ATTRACTIONS: "Attractions",
  SOUVENIRS_GIFTS: "Souvenirs & Gifts",
  OTHERS: "Others",
} as const;

export const getCategoryIcon = (category: string) => {
  switch (category) {
    case Categories.LOCAL_PICKS:
      return {
        type: "SatlantisIcons",
        name: "bookopenuser",
      };
    case Categories.BITCOIN_ACCEPTED:
      return {
        type: "SatlantisIcons",
        name: "currencybtc",
      };
    case Categories.RESTAURANTS_CAFES:
      return {
        type: "SatlantisIcons",
        name: "restoraunt",
      };
    case Categories.COWORKING:
      return {
        type: "SatlantisIcons",
        name: "desktop",
      };
    case Categories.HEALTHCARE:
      return {
        type: "SatlantisIcons",
        name: "heartbeat",
      };
    case Categories.WELLNESS_FITNESS || Categories.HEALTHCARE:
      return {
        type: "SatlantisIcons",
        name: "heartbeat",
      };
    case Categories.GROCERY_FOODS:
      return {
        type: "SatlantisIcons",
        name: "basket",
      };
    case Categories.LODGING:
      return {
        type: "SatlantisIcons",
        name: "tipi",
      };
    case Categories.NIGHTLIFE:
      return {
        type: "SatlantisIcons",
        name: "discoball",
      };
    case Categories.ATTRACTIONS:
      return {
        type: "SatlantisIcons",
        name: "mountains",
      };
    case Categories.SOUVENIRS_GIFTS:
      return {
        type: "SatlantisIcons",
        name: "gift",
      };
    default:
      return {
        type: "SatlantisIcons",
        name: "article",
      };
  }
};

const useCategories = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(
    LocationsState.selectors.selectLocationsCategories,
  );
  const [selectedCategories, setSelectedCategories] = useState<
    LocationCategory[]
  >([]);

  useEffect(() => {
    dispatch(LocationsState.thunks.shouldGetLocationsCategories());
  }, [dispatch]);

  return { categories, selectedCategories, setSelectedCategories };
};

export default useCategories;
