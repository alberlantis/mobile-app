import React, { useState } from "react";
import { Text, View, Alert } from "react-native";
import type { SerializedError } from "@reduxjs/toolkit";
import * as Clipboard from "expo-clipboard";

import {
  DefaultBackground,
  Input,
  LogoTitle,
  Button,
  Icon,
  ScreenProgressIndicator,
} from "src/shared/components";
import s from "./NostrUp.style";
import colors from "src/theme/colors";
import {
  NostrState,
  useAppDispatch,
  useAppSelector,
  AuthState,
} from "src/store";
import type { UnsignedScreenProps } from "src/navigation/UnsignedStack";

const NostrUp: React.FC<UnsignedScreenProps<"NostrUp">> = ({ route }) => {
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState("");
  const isGenerateSignerLoading = useAppSelector(
    NostrState.selectors.selectIsGenerateSignerLoading,
  );
  const isLoginSignerLoading = useAppSelector(
    AuthState.selectors.selectIsLoginSignerLoading,
  );
  const nostrNsecKey = useAppSelector(NostrState.selectors.selectPrivateKey);
  const [isCopyKey, setCopyKey] = useState(false);
  const [activateKey, setActivateKey] = useState<boolean>(false);
  const isLoading = isGenerateSignerLoading || isLoginSignerLoading;
  const showKey = !!nostrNsecKey && activateKey;

  const handleGenerateKey = () => {
    if (!username || isLoading) return;
    dispatch(NostrState.thunks.shouldGenerateSigner(username))
      .unwrap()
      .then(() => {
        setActivateKey(true);
      })
      .catch((e: SerializedError) => {
        Alert.alert("Generate Key", e.message);
      });
  };
  const handleSignUp = () => {
    if (isLoading || !nostrNsecKey) return;
    dispatch(AuthState.actions.setAccountCreation(true));
    dispatch(AuthState.thunks.shouldLoginSigner(nostrNsecKey))
      .unwrap()
      .catch((e: SerializedError) => {
        AuthState.actions.setAccountCreation(false);
        Alert.alert("Login Account", e.message);
      });
  };
  const handleCopyKeyToClipboard = async () => {
    await Clipboard.setStringAsync(nostrNsecKey || "");
    setCopyKey(true);
  };

  return (
    <>
      <DefaultBackground style={s.container} blurPos="top">
        <LogoTitle title="Nostr Sign Up" />
        <Input
          type="username"
          placeholder="Enter your username"
          label="Username"
          onChangeText={setUsername}
          value={username}
          marginTop={20}
        />
        {showKey && (
          <>
            <Text style={s.textDescription}>
              Find your private key (nsec) below. Store this securely and do not
              share with anyone.
            </Text>
            <View style={s.nsecKeyContainer}>
              <Text style={s.nsecTitle}>nsec</Text>
              <Text style={s.nsecKey}>{nostrNsecKey}</Text>
              <Button
                onPress={handleCopyKeyToClipboard}
                text={isCopyKey ? "Copied!" : "Copy"}
                theme="off"
                size="auto"
                extraPadding={30}
                textStyle={s.copyButton}
                prefixElement={() => (
                  <Icon
                    color={colors.WHITE_LIGHT}
                    type="Feather"
                    name="copy"
                    size={16}
                  />
                )}
              />
            </View>
          </>
        )}
        <Button
          marginTop={30}
          loading={isLoading}
          onPress={showKey ? handleSignUp : handleGenerateKey}
          text={showKey ? "Next" : "Generate Key"}
          theme={!!username && !isLoading ? "primary" : "disabled"}
          size="extra-large"
        />
      </DefaultBackground>
      <ScreenProgressIndicator screenName={route.name} />
    </>
  );
};

export default NostrUp;
