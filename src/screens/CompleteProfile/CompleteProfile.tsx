import React, { useState } from "react";
import { Text, View } from "react-native";

import {
  Title,
  Header,
  ScreenProgressIndicator,
  Button,
  Input,
  DefaultBackground,
} from "src/shared/components";
import type { SignedScreenProps } from "src/navigation/SignedStack";
import s from "./CompleteProfile.style";
import UploadAvatar from "./UploadAvatar";
import { useAppDispatch, AuthState } from "src/store";

const CompleteProfile: React.FC<SignedScreenProps<"CompleteProfile">> = ({
  route,
}) => {
  const dispatch = useAppDispatch();
  const [bio, setBio] = useState("");

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
        <UploadAvatar />
      </View>
      <View style={s.inputsContainer}>
        <Input
          label="Bio"
          placeholder="Tell us about you"
          value={bio}
          onChangeText={setBio}
          customHeight={s.input.height}
          multiline={8}
        />
      </View>
      <View style={s.buttonContainer}>
        <Text style={s.buttonDescriptionText}>
          You can also complete your profile later
        </Text>
        <Button
          size="fill"
          text="Start Exploring"
          theme="primary"
          onPress={() => dispatch(AuthState.actions.setAccountCreation(false))}
          marginBottom={s.button.marginBottom}
        />
      </View>
      <View style={s.bottomContainer}>
        <ScreenProgressIndicator screenName={route.name} active={3} />
      </View>
    </DefaultBackground>
  );
};

export default CompleteProfile;
