import React, { useState, useCallback, useMemo } from "react";
import {
  View,
  SectionList,
  SectionListRenderItemInfo,
  SectionListData,
} from "react-native";
import * as ExpoLocation from "expo-location";

import LocationHeader from "./LocationHeader";
import LocationCard from "./LocationCard";
import SectionHeader from "./SectionHeader";
import LocationAccess from "./LocationAccess";
import EmptyList from "./EmptyList";
import { useGeoLocation } from "src/shared/hooks";
import s from "./Location.style";
import type { PlacesMinimal } from "src/client/location";
import type { SubCategoryItem } from "./SubCategoriesCarrousel";
import {
  usePlacesByString,
  useTransformDataSection,
  useLocationByPlaceId,
  useCategories,
  type LocationTabData,
  type LocationList,
  type LocationListTitles,
} from "./hooks";

const Location = () => {
  const { status } = useGeoLocation();
  const [valueSearch, setValueSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [placeSelected, setPlaceSelected] = useState<
    PlacesMinimal | undefined
  >();
  const [subcategoriesSelection, setSubcategoriesSelection] = useState<
    SubCategoryItem[]
  >([]);
  const { categories, selectedCategories, setSelectedCategories } =
    useCategories();
  const { places, isLoading: placesLoading } = usePlacesByString(
    valueSearch,
    !!placeSelected,
  );
  const { locations, isLoading: locationsLoading } = useLocationByPlaceId(
    valueSearch,
    placeSelected?.id,
    selectedCategories,
    subcategoriesSelection,
    sortBy,
  );
  const { listData } = useTransformDataSection(places, locations);

  const showLocationSettings = useMemo(
    () => status !== ExpoLocation.PermissionStatus.GRANTED && !valueSearch,
    [status, valueSearch],
  );
  const showEmptyList = useMemo(
    () => !places.length && !locations.length,
    [places, locations],
  );

  const getIsLoading = useCallback(
    (section: LocationListTitles) => {
      if (section === "Locations") return placesLoading;
      if (section === "Merchants") return locationsLoading;
      return false;
    },
    [placesLoading, locationsLoading],
  );
  const handleSearchInput = useCallback(
    (value: string) => {
      setValueSearch(value);
      if (!value) {
        setPlaceSelected(undefined);
        setSelectedCategories([]);
      }
    },
    [setValueSearch, setPlaceSelected, setSelectedCategories],
  );

  const renderSectionHeader = useCallback(
    ({
      section,
    }: {
      section: SectionListData<LocationTabData, LocationList>;
    }) => {
      return (
        <SectionHeader
          title={section.title}
          isItemsRendered={!!section.data.length}
          isLoading={getIsLoading(section.title)}
        />
      );
    },
    [getIsLoading],
  );
  const renderItems = useCallback(
    ({
      item,
      section,
    }: SectionListRenderItemInfo<LocationTabData, LocationList>) => {
      return (
        <LocationCard
          key={`${section.title}-${item.id}-${item.name}-location-card`}
          setValueSearch={setValueSearch}
          setPlaceSelected={setPlaceSelected}
          section={section.title}
          locationInfo={item}
        />
      );
    },
    [setValueSearch],
  );

  return (
    <View style={s.container}>
      <LocationHeader
        setValueSearch={handleSearchInput}
        setSelectedCategories={setSelectedCategories}
        setSubcategoriesSelection={setSubcategoriesSelection}
        valueSearch={valueSearch}
        placeSelected={placeSelected}
        selectedCategories={selectedCategories}
        categories={categories}
        subcategoriesSelection={subcategoriesSelection}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      {showLocationSettings ? (
        <LocationAccess />
      ) : showEmptyList ? (
        <EmptyList />
      ) : (
        <SectionList
          keyExtractor={(item, index) =>
            `location-home-list-${item.name}-${item.id}-${index}`
          }
          sections={listData}
          renderItem={renderItems}
          renderSectionHeader={renderSectionHeader}
        />
      )}
    </View>
  );
};

export default Location;
