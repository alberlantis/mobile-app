import React, { useState } from "react";
import { View, Alert } from "react-native";
import { Account } from "@satlantis/api-client";

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

const EditUser: React.FC<SignedScreenProps<"EditUser">> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const userAccount = useAppSelector(UserState.selectors.selectUserHomeProfile);
  const isLoading = useAppSelector(
    UserState.selectors.selectUpdateAccountLoading,
  );
  const initialState: Partial<Account> = {
    name: userAccount.name,
    about: userAccount.about,
    website: userAccount.website,
    phone: userAccount.phone,
    email: userAccount.email,
    interests: userAccount.interests,
  };
  const [profile, setProfile] = useState<Partial<Account>>(initialState);
  const hasProfileChanged = Object.keys(userAccount).some(
    (key) =>
      !deepEqual(
        profile[key as keyof Partial<Account>],
        initialState[key as keyof Partial<Account>],
      ),
  );
  const isButtonEnabled = hasProfileChanged && !isLoading;

  const handleInputChange =
    (key: keyof Partial<Account>) => (value: string | string[]) => {
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
    dispatch(UserState.thunks.shouldPutUpdateAccount(profile))
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
              value={profile.name || ""}
              onChangeText={handleInputChange("name")}
              placeholder="Name"
            />
          </View>
        </View>
        <BaseSection sectionTitle="About" customContainer={s.aboutSection}>
          <Input
            onChangeText={handleInputChange("about")}
            marginBottom={normalizeSize(12)}
            value={profile.about || ""}
            placeholder="About"
          />
          <Input
            onChangeText={handleInputChange("website")}
            value={profile.website || ""}
            placeholder="Website"
          />
        </BaseSection>
        <InterestsSection
          selectedInterests={(profile.interests as string[]) || []}
          setSelectedInterests={handleInputChange("interests")}
        />
        <BaseSection sectionTitle="Contact" customContainer={s.contactSection}>
          <Input
            onChangeText={handleInputChange("phone")}
            value={profile.phone || ""}
            marginBottom={normalizeSize(12)}
            placeholder="Phone number"
          />
          <Input
            onChangeText={handleInputChange("email")}
            value={profile.email || ""}
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
