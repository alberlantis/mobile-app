import React, { useState } from "react";
import { View, ScrollView } from "react-native";

import { BottomModal } from "src/shared/wrappers";
import { CheckboxItem, Separator, Button } from "src/shared/components";
import s from "./InterestsModal.style";

const interestsPool = [
  "Food",
  "Books",
  "Photography",
  "Human rights",
  "Gaming",
  "Movies",
  "Economy",
  "Politics",
];

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
  const [briefSelectedTags, setBriefSelectedTags] = useState(selectedInterests);

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

  return (
    <BottomModal
      title="Interests"
      subtitle={`${briefSelectedTags.length} selected`}
      isVisible={isVisible}
      setModalVisible={setIsVisible}
      onClose={handleCloseModal}
    >
      <ScrollView>
        {interestsPool.map((tag, index) => (
          <View key={`edit-user-interest-tags-modal-selection-${index}`}>
            {index !== 0 && <Separator />}
            <View style={s.modalCheckboxItemContainer}>
              <CheckboxItem
                value={tag}
                isSelected={selectedInterests.includes(tag)}
                setValue={handleInterestsSelection}
              />
            </View>
          </View>
        ))}
      </ScrollView>
      <Button
        size="fill"
        theme="primary"
        onPress={handleSaveInterests}
        text="Save"
      />
    </BottomModal>
  );
};

export default InterestsModal;
