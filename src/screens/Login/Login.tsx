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
  Header,
} from "src/shared/components";
import { SCREENS } from "src/navigation/routes";
import type { UnsignedScreenProps } from "src/navigation/UnsignedStack";
import { useAppDispatch, useAppSelector, AuthState } from "src/store";
import s from "./Login.style";

const Login: React.FC<UnsignedScreenProps<"Login">> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSecure, setIsSecure] = useState(true);
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
    <DefaultBackground style={s.container} blurPos="top">
      <Header />
      <View style={s.logoContainer}>
        <LogoTitle title="Sign In" />
      </View>
      <View style={s.inputsContainer}>
        <Input
          type="username"
          placeholder="Enter username"
          label="Username"
          onChangeText={setUsername}
          value={username}
        />
        <Input
          type={isSecure ? "password" : "none"}
          placeholder="Enter password"
          label="Password"
          onChangeText={setPassword}
          value={password}
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
            onPress={() => navigation.navigate(SCREENS.RECOVERY_EMAIL)}
          />
        </View>
        <Button
          onPress={handleLoginAccount}
          text="Sign In"
          theme={isButtonEnabled ? "primary" : "disabled"}
          size="fill"
          loading={isLoading}
        />
        <InteractiveText
          onPress={() => navigation.navigate(SCREENS.SIGN_UP)}
          prefix="Don’t have an account?"
          text="Sign Up"
        />
      </View>
      <Separator
        label="or"
        marginBottom={15}
        marginTop={15}
        customHeight="5%"
      />
      <View style={s.buttonContainer}>
        <Button
          onPress={() => navigation.navigate(SCREENS.NOSTR_IN)}
          text="Sign In with nSec key"
          theme="secondary"
          size="fill"
        />
      </View>
    </DefaultBackground>
  );
};

export default Login;
