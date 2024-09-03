import React, { useState } from "react";
import { Text, Alert } from "react-native";
import { SerializedError } from "@reduxjs/toolkit";

import {
  DefaultBackground,
  Input,
  LogoTitle,
  Button,
} from "src/shared/components";
import {
  useAppSelector,
  NostrState,
  useAppDispatch,
  AuthState,
} from "src/store";
import s from "./NostrIn.style";
import colors from "src/theme/colors";

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
      <LogoTitle title="Sign In" />
      <Input
        type="username"
        placeholder="Enter your nsec key"
        label="Nsec"
        onChangeText={setNsecKey}
        value={nsecKey}
        marginTop={20}
      />
      <Button
        loading={isLoading}
        marginTop={20}
        marginBottom={20}
        onPress={handleLoginNostr}
        text="Sign In"
        theme={isButtonEnabled ? "primary" : "disabled"}
        size="extra-large"
      />
      <Text style={{ color: colors.WHITE_BOLD, textAlign: "center" }}>
        An nSec key is exclusive from the Nostr protocol. If you don’t have an
        nsec key, please sign-in using your email and password.
      </Text>
    </DefaultBackground>
  );
};

export default NostrIn;
