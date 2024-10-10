import React, { Fragment, useCallback, useState } from "react";
import { View, ScrollView } from "react-native";

import filters from "mock/profile/mockLocationFilters.json";
import { colors, fonts } from "src/theme";
import { BottomModal } from "src/shared/wrappers";
import {
  Icon,
  Button,
  Separator,
  CheckboxItem,
  ExitButton,
} from "src/shared/components";
import s, { getTagContainer } from "./SubCategoriesCarrousel.style";
import { capitalizeWords } from "src/utils";

export type SubCategoryItem = {
  key: string;
  value: string[];
};

interface ISubCategoriesCarrouselProps {
  setSubcategoriesSelection: React.Dispatch<
    React.SetStateAction<SubCategoryItem[]>
  >;
  subcategoriesSelection: SubCategoryItem[];
  categories: SubCategoryItem[];
}

const SubCategoriesCarrousel: React.FC<ISubCategoriesCarrouselProps> = ({
  setSubcategoriesSelection,
  subcategoriesSelection,
  categories,
}) => {
  const [openModal, setModal] = useState(false);
  const [subcategorySelected, setSubcategory] = useState<SubCategoryItem>();
  const [tempValues, setTempValues] = useState<SubCategoryItem[]>([
    ...subcategoriesSelection,
  ]);

  const selection = tempValues.find(
    (selected) => selected.key === subcategorySelected?.key,
  );

  const handleSubCategoryModal = (subcategory: SubCategoryItem) => {
    setModal(true);
    setSubcategory(subcategory);
    setTempValues([...subcategoriesSelection]);
  };
  const handleCategorySelection = (
    categoryKey: string,
    selectedValue: string,
  ) => {
    setTempValues((prevState) => {
      const existingKeyIndex = prevState.findIndex(
        (option) => option.key === categoryKey,
      );
      if (existingKeyIndex === -1)
        return [...prevState, { key: categoryKey, value: [selectedValue] }];
      const existingOption = prevState[existingKeyIndex];

      if (existingOption.value.includes(selectedValue)) {
        const newValueArray = existingOption.value.filter(
          (item) => item !== selectedValue,
        );
        if (newValueArray.length === 0)
          return prevState.filter((option) => option.key !== categoryKey);
        return prevState.map((option) =>
          option.key === categoryKey
            ? { ...option, value: newValueArray }
            : option,
        );
      } else {
        return prevState.map((option) =>
          option.key === categoryKey
            ? { ...option, value: [...option.value, selectedValue] }
            : option,
        );
      }
    });
  };
  const handleOnCloseModal = () => {
    setSubcategory(undefined);
    setTempValues([]);
  };
  const handleSaveSelection = useCallback(() => {
    setSubcategoriesSelection(tempValues);
    setModal(false);
  }, [setSubcategoriesSelection, setModal, tempValues]);
  const handleClearSelection = (categoryKey: string) => {
    setSubcategoriesSelection((prevState) =>
      prevState.filter((item) => item.key !== categoryKey),
    );
  };
  const getIsSelected = useCallback(
    (tag: string) => {
      return !!tempValues
        .find((selected) => selected.key === subcategorySelected?.key)
        ?.value.some(
          (subcategoryValuesSelected) => subcategoryValuesSelected === tag,
        );
    },
    [tempValues, subcategorySelected],
  );

  return !!categories?.length ? (
    <Fragment>
      <View style={s.carouselFiltersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category, index) => {
            const isChecks = subcategoriesSelection.some(
              (selected) => selected.key === category.key,
            );
            return (
              <View
                key={`location-sub-categories-carousel-${category.key}-${category.value}-${index}`}
                style={getTagContainer(
                  index === 0,
                  index === filters.length - 1,
                )}
              >
                <Button
                  onPress={() => handleSubCategoryModal(category)}
                  text={category.key}
                  theme="off-secondary"
                  size="auto"
                  textStyle={{
                    ...s.filterButtonText,
                    color: isChecks ? colors.FLAME : colors.WHITE,
                  }}
                  paddingVertical={12}
                  prefixElement={
                    isChecks
                      ? () => (
                          <View style={s.clearSubFilterButtonContainer}>
                            <ExitButton
                              onPress={() => handleClearSelection(category.key)}
                              size={16}
                              iconSize={10}
                              color={colors.FLAME}
                              iconColor={colors.BLACK}
                            />
                          </View>
                        )
                      : undefined
                  }
                  subfixElement={() => (
                    <Icon
                      size={fonts[16]}
                      type="Entypo"
                      name="chevron-down"
                      color={colors.GRAY_3}
                    />
                  )}
                />
              </View>
            );
          })}
        </ScrollView>
      </View>
      <BottomModal
        isVisible={openModal}
        setModalVisible={setModal}
        onClose={handleOnCloseModal}
        title={capitalizeWords(subcategorySelected?.key || "")}
        subtitle={`${selection?.value.length || 0} selected`}
        maxHeightScale={0.5}
      >
        <ScrollView>
          {subcategorySelected?.value.map((tag, index) => {
            const isSelected = getIsSelected(tag);
            return (
              <View key={`location-tab-subcategory-modal-${tag}-${index}`}>
                {index !== 0 && <Separator />}
                <View style={s.modalCheckboxItemContainer}>
                  <CheckboxItem
                    value={tag}
                    isSelected={isSelected}
                    setValue={(value) =>
                      handleCategorySelection(subcategorySelected.key, value)
                    }
                  />
                </View>
              </View>
            );
          })}
        </ScrollView>
        <View style={s.modalSaveButton}>
          <Button
            size="auto"
            theme="off-outline"
            marginRight={16}
            paddingHorizontal={30}
            onPress={() => setTempValues([])}
            text="Clear"
          />
          <View style={s.saveButtonContainer}>
            <Button
              size="fill"
              theme="primary"
              onPress={handleSaveSelection}
              text="Save"
            />
          </View>
        </View>
      </BottomModal>
    </Fragment>
  ) : null;
};

export default SubCategoriesCarrousel;
