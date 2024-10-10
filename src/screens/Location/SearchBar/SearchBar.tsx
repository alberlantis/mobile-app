import React, { useCallback } from "react";
import { View, Text, TextInput } from "react-native";
import { LocationCategory } from "@satlantis/api-client";

import { type SubCategoryItem } from "../SubCategoriesCarrousel";
import type { PlacesMinimal } from "src/client/location";
import { colors, fonts, normalizeSize } from "src/theme";
import { Icon, ExitButton, BackButton } from "src/shared/components";
import s from "./SearchBar.style";

interface ISearchBarProps {
  setValueSearch(value: string): void;
  setSelectedCategories: React.Dispatch<
    React.SetStateAction<LocationCategory[]>
  >;
  setSubcategoriesSelection: React.Dispatch<
    React.SetStateAction<SubCategoryItem[]>
  >;
  valueSearch: string;
  placeSelected: PlacesMinimal | undefined;
  selectedCategories: LocationCategory[];
}

const SearchBar: React.FC<ISearchBarProps> = ({
  valueSearch,
  placeSelected,
  selectedCategories,
  setValueSearch,
  setSelectedCategories,
  setSubcategoriesSelection,
}) => {
  const showInputBorder =
    !!valueSearch && !placeSelected && !selectedCategories.length;
  const showBackButton = !!selectedCategories.length && !!placeSelected;
  const showSearchIcon = !placeSelected && !showBackButton;

  const handleBackButton = useCallback(() => {
    if (selectedCategories.length > 1) {
      const newCategories = selectedCategories.slice(0, -1);
      setValueSearch(newCategories.slice(-1)[0]?.name);
      setSelectedCategories(newCategories);
    } else {
      setSelectedCategories([]);
      setValueSearch(`${placeSelected?.name}, ${placeSelected?.country_name}`);
    }
    setSubcategoriesSelection([]);
  }, [
    selectedCategories,
    placeSelected,
    setValueSearch,
    setSelectedCategories,
    setSubcategoriesSelection,
  ]);
  const handleClearButton = useCallback(() => {
    setValueSearch("");
    setSelectedCategories([]);
  }, [setValueSearch, setSelectedCategories]);

  return (
    <View style={s.searchBarContainer}>
      <View
        style={[
          s.searchInputContainer,
          {
            borderColor: showInputBorder
              ? colors.ORANGE_PRIMARY_LIGHT
              : colors.TRANSPARENT,
            paddingVertical: normalizeSize(showBackButton ? 10 : 16),
          },
        ]}
      >
        {showBackButton && (
          <View style={s.backButtonContainer}>
            <BackButton size={32} onPress={handleBackButton} />
          </View>
        )}
        {showSearchIcon && (
          <Icon
            name="search"
            size={fonts[20]}
            type="Feather"
            color={colors.WHITE_BOLD}
            style={s.searchIcon}
          />
        )}
        <TextInput
          style={s.searchInput}
          placeholder="Search"
          value={valueSearch}
          onChangeText={setValueSearch}
          placeholderTextColor={colors.WHITE_LIGHT}
        />
        {!!valueSearch && (
          <ExitButton
            color={colors.WHITE_2}
            onPress={handleClearButton}
            size={20}
            iconSize={12}
          />
        )}
      </View>
      {showBackButton && (
        <Text
          style={s.cityLabel}
        >{`${placeSelected.name}, ${placeSelected.country_name}`}</Text>
      )}
    </View>
  );
};

export default SearchBar;
