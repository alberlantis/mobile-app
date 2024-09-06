import React, { useState } from "react";
import { Text, Alert, View } from "react-native";
import { SerializedError } from "@reduxjs/toolkit";

import {
  DefaultBackground,
  Input,
  LogoTitle,
  Button,
  Header,
} from "src/shared/components";
import {
  useAppSelector,
  NostrState,
  useAppDispatch,
  AuthState,
} from "src/store";
import s from "./NostrIn.style";

const NostrIn = () => {
  const dispatch = useAppDispatch();
  const privateKey = useAppSelector(NostrState.selectors.selectPrivateKey);
  const [nsecKey, setNsecKey] = useState(privateKey || "");
  const isLoading = useAppSelector(
    AuthState.selectors.selectIsLoginSignerLoading,
  );
  const isButtonEnabled = !!nsecKey && !isLoading;

  const handleLoginNostr = () => {
    if (!isButtonEnabled) return;
    dispatch(AuthState.thunks.shouldLoginSigner(nsecKey))
      .unwrap()
      .catch((e: SerializedError) => {
        Alert.alert("Login Account", e.message);
      });
  };

  return (
    <DefaultBackground style={s.container} blurPos="top">
      <Header />
      <View style={s.logoContainer}>
        <LogoTitle title="Sign In" />
      </View>
      <View style={s.inputContainer}>
        <Input
          type="username"
          placeholder="Enter your nsec key"
          label="Nsec"
          onChangeText={setNsecKey}
          value={nsecKey}
        />
      </View>
      <View style={s.buttonContainer}>
        <Button
          loading={isLoading}
          marginBottom={15}
          onPress={handleLoginNostr}
          text="Sign In"
          theme={isButtonEnabled ? "primary" : "disabled"}
          size="fill"
        />
        <Text style={s.textDescription}>
          An nSec key is exclusive from the Nostr protocol. If you don’t have an
          nsec key, please sign-in using your email and password.
        </Text>
      </View>
    </DefaultBackground>
  );
};

export default NostrIn;
