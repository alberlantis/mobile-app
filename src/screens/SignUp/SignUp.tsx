import React, { useState } from "react";
import { SerializedError } from "@reduxjs/toolkit";
import { Alert } from "react-native";

import {
  DefaultBackground,
  Input,
  LogoTitle,
  Button,
  InteractiveText,
  EyeIcon,
  ScreenProgressIndicator,
} from "src/shared/components";
import { SCREENS } from "src/navigation/routes";
import type { UnsignedScreenProps } from "src/navigation/UnsignedStack";
import s from "./SignUp.style";
import { AuthState, useAppDispatch, useAppSelector } from "src/store";

const SignUp: React.FC<UnsignedScreenProps<"SignUp">> = ({
  navigation,
  route,
}) => {
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [isSecure, setIsSecure] = useState(true);
  const isLoadingCreateAccount = useAppSelector(
    AuthState.selectors.selectIsCreateAccountLoading,
  );
  const isLoadingLoginAccount = useAppSelector(
    AuthState.selectors.selectIsLoginAccountLoading,
  );
  const isLoading = isLoadingCreateAccount || isLoadingLoginAccount;
  const isButtonEnabled =
    !!username && !!username && !!password && !!confirmPass && !isLoading;

  const handleCreateAccount = async () => {
    if (!isButtonEnabled) return;
    try {
      await dispatch(
        AuthState.thunks.shouldCreateAccount({
          email,
          password,
          username,
        }),
      ).unwrap();
      dispatch(AuthState.actions.setAccountCreation(true));
      dispatch(
        AuthState.thunks.shouldLoginAccount({ username, password }),
      ).unwrap();
    } catch (e) {
      const error = e as SerializedError;
      dispatch(AuthState.actions.setAccountCreation(false));
      Alert.alert("Create Account", error.message);
    }
  };

  return (
    <>
      <DefaultBackground style={s.container} blurPos="top">
        <LogoTitle title="Email Sign Up" />
        <Input
          type="username"
          placeholder="Enter username"
          label="Username"
          onChangeText={setUsername}
          value={username}
          marginTop={20}
        />
        <Input
          type="emailAddress"
          placeholder="Enter email address"
          label="Email"
          onChangeText={setEmail}
          value={email}
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
        <Input
          type="password"
          placeholder="Confirm password"
          onChangeText={setConfirmPass}
          value={confirmPass}
          marginTop={10}
        />
        <Button
          marginTop={20}
          marginBottom={20}
          onPress={handleCreateAccount}
          text="Next"
          size="extra-large"
          loading={isLoading}
          theme={isButtonEnabled ? "primary" : "disabled"}
        />
        <InteractiveText
          onPress={() => navigation.navigate(SCREENS.LOGIN)}
          prefix="Already have an account?"
          text="Sign in"
          marginBottom={15}
        />
      </DefaultBackground>
      <ScreenProgressIndicator screenName={route.name} />
    </>
  );
};

export default SignUp;
