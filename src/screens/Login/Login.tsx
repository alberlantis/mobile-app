import React, { useState } from "react";
import { View, Alert } from "react-native";
import { SerializedError } from "@reduxjs/toolkit";

import {
  DefaultBackground,
  Input,
  LogoTitle,
  Button,
  InteractiveText,
  Separator,
  EyeIcon,
} from "src/shared/components";
import { SCREENS } from "src/navigation/routes";
import type { RootScreenProps } from "src/navigation/Root";
import { useAppDispatch, useAppSelector, AuthState } from "src/store";
import s from "./Login.style";

const Login = ({ navigation }: RootScreenProps<"Login">) => {
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSecure, setIsSecure] = useState(false);
  const isLoading = useAppSelector(
    AuthState.selectors.selectIsLoginAccountLoading,
  );
  const isButtonEnabled = !!username && !!password && !isLoading;

  const handleLoginAccount = () => {
    if (!isButtonEnabled) return;
    dispatch(
      AuthState.thunks.shouldLoginAccount({
        password,
        username,
      }),
    )
      .unwrap()
      .catch((e: SerializedError) => {
        Alert.alert("Login Account", e.message);
      });
  };

  return (
    <DefaultBackground blurPos="top">
      <View style={s.container}>
        <LogoTitle title="Sign In" />
        <Input
          type="username"
          placeholder="Enter username"
          label="Username"
          onChangeText={setUsername}
          value={username}
          marginTop={20}
        />
        <Input
          type={isSecure ? "password" : "none"}
          placeholder="Enter password"
          label="Password"
          onChangeText={setPassword}
          value={password}
          marginTop={20}
          icon={
            <EyeIcon
              isSecure={isSecure}
              password={password}
              setIsSecure={setIsSecure}
            />
          }
        />
        <View style={s.forgotPassword}>
          <InteractiveText
            prefix="Forgot Password?"
            onPress={() => navigation.navigate(SCREENS.HOME_TABS)}
          />
        </View>
        <Button
          marginTop={20}
          marginBottom={20}
          onPress={handleLoginAccount}
          text="Sign In"
          theme={isButtonEnabled ? "primary" : "disabled"}
          size="extra-large"
          loading={isLoading}
        />
        <InteractiveText
          onPress={() => navigation.navigate(SCREENS.SIGN_UP)}
          prefix="Don’t have an account?"
          text="Sign Up"
        />
      </View>
      <Separator label="or" />
      <View style={s.container}>
        <Button
          onPress={() => navigation.navigate(SCREENS.NOSTR_IN)}
          text="Sign In with nSec key"
          theme="secondary"
          size="extra-large"
        />
      </View>
    </DefaultBackground>
  );
};

export default Login;
