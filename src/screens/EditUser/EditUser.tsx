import React, { useState, useEffect, useMemo } from "react";
import { View, Alert } from "react-native";

import { SCREENS } from "src/navigation/routes";
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

const EditUser: React.FC<SignedScreenProps<typeof SCREENS.EDIT_USER>> = ({
  navigation,
}) => {
  const dispatch = useAppDispatch();
  const userAccount = useAppSelector(
    UserState.selectors.selectUserHomeProfile(true),
  );
  const isUpdatingMyInterests = useAppSelector(
    UserState.selectors.selectUpdatingMyInterestsLoading,
  );
  const myInterests = useAppSelector(UserState.selectors.selectMyInterests);
  const accountLoading = useAppSelector(
    UserState.selectors.selectUpdateAccountLoading,
  );
  const [isUserEditing, setUserEditing] = useState(false);
  const initialState = useMemo(
    () => ({
      name: userAccount.name,
      about: userAccount.about,
      website: userAccount.website,
      phone: userAccount.phone,
      email: userAccount.email,
      interests: myInterests,
    }),
    [userAccount, myInterests],
  );
  const [profile, setProfile] = useState(initialState);
  const hasProfileChanged = Object.keys(userAccount).some(
    (key) =>
      !deepEqual(
        profile[key as keyof typeof initialState],
        initialState[key as keyof typeof initialState],
      ),
  );
  const isLoading = accountLoading || isUpdatingMyInterests;
  const isButtonEnabled = hasProfileChanged && !isLoading;

  const handleInputChange =
    (key: keyof typeof initialState) => (value: string | string[]) => {
      setUserEditing(true);
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

  const handleSaveButton = async () => {
    if (!isButtonEnabled) return;
    try {
      await Promise.all([
        dispatch(UserState.thunks.shouldUpdateMyInterests(profile.interests)),
        dispatch(
          UserState.thunks.shouldPutUpdateAccount({
            name: profile.name,
            about: profile.about,
            website: profile.website,
            phone: profile.phone,
            email: profile.email,
            interests: profile.interests,
          }),
        ),
      ]);
      navigation.goBack();
    } catch (e) {
      const error: SerializedError = e;
      Alert.alert("Something went wrong!", error.message);
    }
  };

  useEffect(() => {
    dispatch(UserState.thunks.shouldGetMyInterests());
  }, [dispatch]);

  useEffect(() => {
    if (hasProfileChanged && !isUserEditing) {
      setProfile(initialState);
    }
  }, [initialState, hasProfileChanged, isUserEditing]);

  return (
    <KeyboardView>
      <View style={s.container}>
        <View style={s.topHeaderContainer}>
          <BackButton color={colors.BLACK_MEDIUM} onPress={handleBackButton} />
        </View>
        <ImagePortrait isOwnProfile />
        <View style={s.mainInfoContainer}>
          <Avatar isOwnProfile />
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
          selectedInterests={profile.interests}
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
