import React, { useState } from "react";
import { View, Pressable } from "react-native";

import { BaseSection } from "src/shared/wrappers";
import { Icon, BasePanelText } from "src/shared/components";
import { colors, fonts } from "src/theme";
import s from "./InterestsSection.style";
import InterestsModal from "./InterestsModal";

interface IInterestsSectionProps {
  selectedInterests: string[];
  setSelectedInterests(value: string[]): void;
}

const InterestsSection: React.FC<IInterestsSectionProps> = ({
  selectedInterests,
  setSelectedInterests,
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <BaseSection
        sectionTitle="Interests"
        bottomSeparator
        customContainer={s.container}
      >
        <View style={s.innerContainer}>
          <View style={s.interestsTagPanel}>
            {selectedInterests.map((tag, index) => (
              <BasePanelText
                key={`edit-user-interest-tags-${index}`}
                text={tag}
                customContainer={s.tag}
              />
            ))}
          </View>
          <Pressable style={s.editButton} onPress={() => setShowModal(true)}>
            <Icon
              type="Entypo"
              name="edit"
              size={fonts[20]}
              color={colors.WHITE}
            />
          </Pressable>
        </View>
      </BaseSection>
      <InterestsModal
        selectedInterests={selectedInterests}
        setSelectedInterests={setSelectedInterests}
        isVisible={showModal}
        setIsVisible={setShowModal}
      />
    </>
  );
};

export default InterestsSection;
