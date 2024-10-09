import React, { useState } from "react";
import { View, Pressable, ActivityIndicator } from "react-native";

import { BaseSection } from "src/shared/wrappers";
import { Icon, BasePanelText } from "src/shared/components";
import { colors, fonts } from "src/theme";
import s from "./InterestsSection.style";
import InterestsModal from "./InterestsModal";

interface IInterestsSectionProps {
  selectedInterests: string[];
  isLoading: boolean;
  setSelectedInterests(value: string[]): void;
}

const InterestsSection: React.FC<IInterestsSectionProps> = ({
  selectedInterests,
  isLoading,
  setSelectedInterests,
}) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <BaseSection sectionTitle="Interests" customContainer={s.container}>
        <View style={s.innerContainer}>
          <View style={s.interestsTagPanel}>
            {isLoading ? (
              <View style={s.loadingContainer}>
                <ActivityIndicator />
              </View>
            ) : (
              selectedInterests.map((tag, index) => (
                <View key={`edit-user-interest-tags-${index}`}>
                  <BasePanelText text={tag} customContainer={s.tag} />
                </View>
              ))
            )}
          </View>
          <Pressable style={s.editButton} onPress={() => setShowModal(true)}>
            <Icon
              type="Entypo"
              name="edit"
              size={fonts[16]}
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
