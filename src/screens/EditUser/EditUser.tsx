import React, { useState, useMemo } from "react";
import { View, Alert } from "react-native";

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
import { normalizeSize } from "src/theme";
import { useAppSelector, UserState, useAppDispatch } from "src/store";
import { SerializedError } from "@reduxjs/toolkit";

type ProfileState = {
  displayName: string;
  about: string;
  website: string;
  phoneNumber: string;
  email: string;
  interests: string[];
  [key: string]: string | string[];
};

const EditUser: React.FC<SignedScreenProps<"EditUser">> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const userAccount = useAppSelector(UserState.selectors.selectUserHomeProfile);
  const isLoading = useAppSelector(
    UserState.selectors.selectUpdateAccountLoading,
  );
  const { npub } = useAppSelector(UserState.selectors.selectUserPublicKeys);
  const initialState: ProfileState = useMemo(
    () => ({
      displayName: userAccount.displayName,
      about: userAccount.about,
      website: userAccount.website,
      phoneNumber: userAccount.phoneNumber,
      email: userAccount.email,
      interests: userAccount.interests as string[],
    }),
    [
      userAccount.displayName,
      userAccount.about,
      userAccount.website,
      userAccount.phoneNumber,
      userAccount.email,
      userAccount.interests,
    ],
  );
  const [profile, setProfile] = useState<ProfileState>(initialState);
  const hasProfileChanged = Object.keys(userAccount).some(
    (key) =>
      !deepEqual(
        profile[key as keyof ProfileState],
        initialState[key as keyof ProfileState],
      ),
  );
  const isButtonEnabled = hasProfileChanged && !isLoading;

  const handleInputChange =
    (key: keyof ProfileState) => (value: string | string[]) => {
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
    if (!isButtonEnabled) return;
    dispatch(
      UserState.thunks.shouldPutUpdateAccount({
        npub,
        newData: profile,
      }),
    )
      .unwrap()
      .then(navigation.goBack)
      .catch((e: SerializedError) => {
        Alert.alert("Something went wrong!", e.message);
      });
  };

  return (
    <KeyboardView>
      <View style={s.container}>
        <View style={s.topHeaderContainer}>
          <BackButton color={colors.BLACK_MEDIUM} onPress={handleBackButton} />
        </View>
        <ImagePortrait />
        <View style={s.mainInfoContainer}>
          <Avatar />
          <View style={s.mainBasePanelContainer}>
            <Input
              value={profile.displayName}
              onChangeText={handleInputChange("displayName")}
              placeholder="Name"
            />
          </View>
        </View>
        <BaseSection sectionTitle="About" customContainer={s.aboutSection}>
          <Input
            onChangeText={handleInputChange("about")}
            marginBottom={normalizeSize(12)}
            value={profile.about}
            placeholder="About"
          />
          <Input
            onChangeText={handleInputChange("website")}
            value={profile.website}
            placeholder="Website"
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
            marginBottom={normalizeSize(12)}
            placeholder="Phone number"
          />
          <Input
            onChangeText={handleInputChange("email")}
            value={profile.email}
            placeholder="Email address"
          />
        </BaseSection>
        <View style={s.buttonContainer}>
          <Button
            marginBottom={normalizeSize(17)}
            text="Save"
            theme={isButtonEnabled ? "primary" : "disabled"}
            size="fill"
            onPress={handleSaveButton}
            loading={isLoading}
          />
        </View>
      </View>
    </KeyboardView>
  );
};

export default EditUser;
