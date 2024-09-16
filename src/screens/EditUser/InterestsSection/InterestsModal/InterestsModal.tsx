import React, { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";

import { UserState, useAppSelector, useAppDispatch } from "src/store";
import { BottomModal } from "src/shared/wrappers";
import { CheckboxItem, Separator, Button } from "src/shared/components";
import s from "./InterestsModal.style";

interface IInterestsModalProps {
  selectedInterests: string[];
  isVisible: boolean;
  setIsVisible(value: boolean): void;
  setSelectedInterests(value: string[]): void;
}
const InterestsModal: React.FC<IInterestsModalProps> = ({
  selectedInterests,
  isVisible,
  setSelectedInterests,
  setIsVisible,
}) => {
  const dispatch = useAppDispatch();
  const [briefSelectedTags, setBriefSelectedTags] = useState(selectedInterests);
  const interestsOptions = useAppSelector(
    UserState.selectors.selectInterestsNameWithId,
  );
  const handleCloseModal = () => {
    setBriefSelectedTags(selectedInterests);
  };
  const handleInterestsSelection = (value: string) => {
    setBriefSelectedTags((prevState) => {
      if (prevState.includes(value)) {
        return prevState.filter((interets) => interets !== value);
      }
      return [...prevState, value];
    });
  };
  const handleSaveInterests = () => {
    setSelectedInterests(briefSelectedTags);
    setIsVisible(false);
  };

  useEffect(() => {
    dispatch(UserState.thunks.shouldFetchAllInterests());
  }, [dispatch]);

  return (
    <BottomModal
      title="Interests"
      subtitle={`${briefSelectedTags.length} selected`}
      isVisible={isVisible}
      setModalVisible={setIsVisible}
      onClose={handleCloseModal}
    >
      <ScrollView>
        {interestsOptions.map((tag, index) => (
          <View
            key={`edit-user-interest-tags-modal-selection-${tag.id}-${index}`}
          >
            {index !== 0 && <Separator />}
            <View style={s.modalCheckboxItemContainer}>
              <CheckboxItem
                value={tag.name}
                isSelected={selectedInterests.includes(tag.name)}
                setValue={handleInterestsSelection}
              />
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={s.modalSaveButton}>
        <Button
          size="fill"
          theme="primary"
          onPress={handleSaveInterests}
          text="Save"
        />
      </View>
    </BottomModal>
  );
};

export default InterestsModal;
