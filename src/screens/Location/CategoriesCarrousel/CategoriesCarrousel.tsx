import React, { useCallback } from "react";
import { View, ScrollView } from "react-native";
import { LocationCategory } from "@satlantis/api-client";

import type { PlacesMinimal } from "src/client/location";
import filters from "mock/profile/mockLocationFilters.json";
import { colors, normalizeSize } from "src/theme";
import { Icon, Button } from "src/shared/components";
import type { IconName, IconType } from "src/shared/components/Icon";
import { getCategoryIcon } from "../hooks/useCategories";
import s, { getTagContainer } from "./CategoriesCarrousel.style";

const CategoryIcon: React.FC<{ type: IconType; name: IconName }> = ({
  type,
  name,
}) => (
  <Icon
    type={type}
    name={name}
    color={colors.ORANGE_PRIMARY_LIGHT}
    size={normalizeSize(20)}
  />
);

interface ICategoriesCarrouselProps {
  setValueSearch(value: string): void;
  setSelectedCategories: React.Dispatch<
    React.SetStateAction<LocationCategory[]>
  >;
  placeSelected: PlacesMinimal | undefined;
  categories: LocationCategory[];
}

const CategoriesCarrousel: React.FC<ICategoriesCarrouselProps> = ({
  placeSelected,
  categories,
  setValueSearch,
  setSelectedCategories,
}) => {
  const showCarrousel = !!categories?.length && !!placeSelected;

  const handleCategorySelection = useCallback(
    (category: LocationCategory) => {
      setSelectedCategories((prevState) => {
        if (!prevState.length) return [category];
        if (prevState.slice(-1)[0].name === category.name) return prevState;
        return [...prevState, category];
      });
      setValueSearch(category.name);
    },
    [setSelectedCategories, setValueSearch],
  );

  return showCarrousel ? (
    <View style={s.carouselFiltersContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category, index) => {
          const icon = getCategoryIcon(category.name);
          return (
            <View
              key={`location-filter-carousel-${category.name}-${index}`}
              style={getTagContainer(index === 0, index === filters.length - 1)}
            >
              <Button
                onPress={() => handleCategorySelection(category)}
                text={category.name}
                theme="off-secondary"
                size="auto"
                textStyle={s.filterButtonText}
                paddingVertical={10}
                prefixElement={() => (
                  <CategoryIcon type={icon.type as IconType} name={icon.name} />
                )}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  ) : null;
};

export default CategoriesCarrousel;
