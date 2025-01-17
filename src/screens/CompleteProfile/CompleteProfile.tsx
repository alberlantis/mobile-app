import React, { useState } from "react";
import { Text, View, Alert } from "react-native";

import {
  Title,
  Header,
  ScreenProgressIndicator,
  Button,
  Input,
  DefaultBackground,
} from "src/shared/components";
import { SCREENS } from "src/navigation/routes";
import type { SignedScreenProps } from "src/navigation/SignedStack";
import s from "./CompleteProfile.style";
import UploadAvatar from "./UploadAvatar";
import type { SatlantisImage } from "src/shared/hooks";
import {
  useAppDispatch,
  AuthState,
  UserState,
  useAppSelector,
} from "src/store";
import { SerializedError } from "@reduxjs/toolkit";

const CompleteProfile: React.FC<
  SignedScreenProps<typeof SCREENS.COMPLETE_PROFILE>
> = ({ route }) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(UserState.selectors.selectMyProfileLoading);
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState<SatlantisImage>();

  const handleSubmit = async () => {
    if (isLoading) return;
    dispatch(
      UserState.thunks.shouldUpdateMyProfile({
        about: bio,
        picture: avatar?.uri || "",
      }),
    )
      .unwrap()
      .then(() => dispatch(AuthState.actions.setAccountCreation(false)))
      .catch((e: SerializedError) => {
        Alert.alert("Something went wrong!", e.message);
      });
  };

  return (
    <DefaultBackground keyboard style={s.container}>
      <Header />
      <View style={s.titleContainer}>
        <Title title="Profile" />
        <Text style={s.titleDescription}>
          Now it’s time to get your profile ready.
        </Text>
      </View>
      <View style={s.uploadAvataContainer}>
        <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
      </View>
      <View style={s.inputsContainer}>
        <Input
          label="Bio"
          placeholder="Tell us about you"
          value={bio}
          onChangeText={setBio}
          customHeight={s.input.height}
          type="text-area"
          multiline
          numOfLines={8}
        />
      </View>
      <View style={s.buttonContainer}>
        <Text style={s.buttonDescriptionText}>
          You can also complete your profile later
        </Text>
        <Button
          size="fill"
          text="Start Exploring"
          theme={isLoading ? "disabled" : "primary"}
          onPress={handleSubmit}
          marginBottom={s.button.marginBottom}
          loading={isLoading}
        />
      </View>
      <View style={s.bottomContainer}>
        <ScreenProgressIndicator screenName={route.name} active={3} />
      </View>
    </DefaultBackground>
  );
};

export default CompleteProfile;
