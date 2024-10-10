import React, { Fragment } from "react";
import { View } from "react-native";
import { LocationCategory } from "@satlantis/api-client";

import type { PlacesMinimal } from "src/client/location";
import s from "./LocationHeader.style";
import SearchBar from "../SearchBar";
import CategoriesCarrousel from "../CategoriesCarrousel";
import SubCategoriesCarrousel, {
  type SubCategoryItem,
} from "../SubCategoriesCarrousel";
import LocationSortMenu from "../LocationSortMenu";

interface ILocationHeaderProps {
  setValueSearch(value: string): void;
  setSelectedCategories: React.Dispatch<
    React.SetStateAction<LocationCategory[]>
  >;
  setSubcategoriesSelection: React.Dispatch<
    React.SetStateAction<SubCategoryItem[]>
  >;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  sortBy: string;
  valueSearch: string;
  placeSelected: PlacesMinimal | undefined;
  categories: LocationCategory[];
  selectedCategories: LocationCategory[];
  subcategoriesSelection: SubCategoryItem[];
}

const LocationHeader: React.FC<ILocationHeaderProps> = ({
  valueSearch,
  placeSelected,
  categories,
  selectedCategories,
  subcategoriesSelection,
  sortBy,
  setSortBy,
  setValueSearch,
  setSelectedCategories,
  setSubcategoriesSelection,
}) => {
  return (
    <Fragment>
      <View style={s.container}>
        <SearchBar
          valueSearch={valueSearch}
          placeSelected={placeSelected}
          selectedCategories={selectedCategories}
          setValueSearch={setValueSearch}
          setSelectedCategories={setSelectedCategories}
          setSubcategoriesSelection={setSubcategoriesSelection}
        />
        <LocationSortMenu sortBy={sortBy} setSortBy={setSortBy} />
      </View>
      {!!selectedCategories.length ? (
        <SubCategoriesCarrousel
          categories={selectedCategories.slice(-1)[0].subCategory}
          subcategoriesSelection={subcategoriesSelection}
          setSubcategoriesSelection={setSubcategoriesSelection}
        />
      ) : (
        <CategoriesCarrousel
          categories={categories}
          placeSelected={placeSelected}
          setValueSearch={setValueSearch}
          setSelectedCategories={setSelectedCategories}
        />
      )}
    </Fragment>
  );
};

export default LocationHeader;
