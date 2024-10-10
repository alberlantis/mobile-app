import React, { useState, Fragment } from "react";
import { View, Pressable } from "react-native";

import { colors, fonts } from "src/theme";
import { Icon, Button, LabelCheck } from "src/shared/components";
import { BottomModal } from "src/shared/wrappers";
import s from "./LocationSortMenu.style";

const SORT_BY = ["Raitings", "Discover"];

interface ILocationSortMenuProps {
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  sortBy: string;
}

const LocationSortMenu: React.FC<ILocationSortMenuProps> = ({
  sortBy,
  setSortBy,
}) => {
  const [openSortModal, setSortModal] = useState(false);
  const [tempSortOption, setTempSortOption] = useState("");

  const handleOnCloseModal = () => {
    setTempSortOption("");
  };
  const handleOnOpenModal = (value: boolean) => {
    setTempSortOption(sortBy);
    setSortModal(value);
  };
  const handleOnSaveModal = () => {
    setSortBy(tempSortOption);
    setSortModal(false);
  };

  return (
    <Fragment>
      <Pressable
        onPress={() => setSortModal(true)}
        style={s.allFiltersButtonContainer}
      >
        <Icon
          type="Ionicons"
          name="filter-outline"
          color={colors.WHITE}
          size={fonts[20]}
        />
      </Pressable>
      <BottomModal
        onClose={handleOnCloseModal}
        isVisible={openSortModal}
        setModalVisible={handleOnOpenModal}
        title="Sort By"
        maxHeightScale={0.43}
      >
        <View style={s.filterModalContainer}>
          {SORT_BY.map((option) => (
            <LabelCheck
              key={`location-filter-option-${option}`}
              value={option}
              isSelected={tempSortOption === option}
              setValue={setTempSortOption}
            />
          ))}
        </View>
        <View style={s.modalSaveButton}>
          <Button
            size="fill"
            theme="primary"
            onPress={handleOnSaveModal}
            text="Save"
          />
        </View>
      </BottomModal>
    </Fragment>
  );
};

export default LocationSortMenu;
