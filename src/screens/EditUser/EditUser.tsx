import React, { useState } from "react";
import { View, ScrollView, Alert } from "react-native";

import type { SignedScreenProps } from "src/navigation/SignedStack";
import { BaseSection, KeyboardView } from "src/shared/wrappers";
import {
  ImagePortrait,
  BackButton,
  Avatar,
  Input,
  Button,
} from "src/shared/components";
import { colors } from "src/theme";
import InterestsSection from "./InterestsSection";
import { deepEqual } from "src/utils";
import s from "./EditUser.style";

type ProfileState = {
  username: string;
  job: string;
  website: string;
  phoneNumber: string;
  email: string;
  interests: string[];
  [key: string]: string | string[];
};

const initialState: ProfileState = {
  username: "Ambassa Dora",
  job: "Actress, Singer, Cat lover.",
  website: "www.website.com",
  phoneNumber: "Phone number",
  email: "Email address",
  interests: ["Food", "Books", "Photography", "Human rights"],
};

const EditUser: React.FC<SignedScreenProps<"EditUser">> = ({ navigation }) => {
  const [profile, setProfile] = useState(initialState);
  const hasProfileChanged = Object.keys(initialState).some(
    (key) =>
      !deepEqual(
        profile[key as keyof ProfileState],
        initialState[key as keyof ProfileState],
      ),
  );

  const handleInputChange =
    (key: keyof typeof profile) => (value: string | string[]) => {
      setProfile({
        ...profile,
        [key]: value,
      });
    };

  const handleBackButton = () => {
    if (!hasProfileChanged) {
      navigation.goBack();
      return;
    }

    Alert.alert(
      "Discard Changes?",
      "Returning now will result in the loss of your unsaved changes",
      [
        {
          text: "Discard Changes",
          onPress: navigation.goBack,
        },
        {
          text: "Continue Editing",
          isPreferred: true,
        },
      ],
    );
  };

  const handleSaveButton = () => {
    if (!hasProfileChanged) return;
    navigation.goBack();
  };

  return (
    <KeyboardView>
      <ScrollView style={s.container}>
        <View style={s.topHeaderContainer}>
          <BackButton
            containerHeight={0.08}
            color={colors.BLACK_MEDIUM}
            onPress={handleBackButton}
          />
        </View>
        <ImagePortrait />
        <View style={s.mainInfoContainer}>
          <Avatar />
          <View style={s.mainBasePanelContainer}>
            <Input
              value={profile.username}
              onChangeText={handleInputChange("username")}
            />
          </View>
        </View>
        <BaseSection
          topSeparator
          bottomSeparator
          sectionTitle="About"
          customContainer={s.aboutSection}
        >
          <Input onChangeText={handleInputChange("job")} value={profile.job} />
          <Input
            onChangeText={handleInputChange("website")}
            value={profile.website}
          />
        </BaseSection>
        <InterestsSection
          selectedInterests={profile.interests}
          setSelectedInterests={handleInputChange("interests")}
        />
        <BaseSection sectionTitle="Contact" customContainer={s.contactSection}>
          <Input
            onChangeText={handleInputChange("phoneNumber")}
            value={profile.phoneNumber}
          />
          <Input
            onChangeText={handleInputChange("email")}
            value={profile.email}
          />
        </BaseSection>
        <View style={s.buttonContainer}>
          <Button
            marginBottom={10}
            text="Save"
            theme={hasProfileChanged ? "primary" : "disabled"}
            size="fill"
            onPress={handleSaveButton}
          />
        </View>
      </ScrollView>
    </KeyboardView>
  );
};

export default EditUser;
