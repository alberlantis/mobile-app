import React, { useState } from "react";
import { SerializedError } from "@reduxjs/toolkit";
import { Alert, View } from "react-native";

import {
  DefaultBackground,
  Input,
  LogoTitle,
  Button,
  InteractiveText,
  EyeIcon,
  ScreenProgressIndicator,
  Header,
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
    <DefaultBackground keyboard style={s.container} blurPos="top">
      <Header />
      <View style={s.logoContainer}>
        <LogoTitle title="Email Sign Up" />
      </View>
      <View style={s.inputsContainer}>
        <Input
          type="username"
          placeholder="Enter username"
          label="Username"
          onChangeText={setUsername}
          value={username}
          marginBottom={s.inputs.marginBottom}
        />
        <Input
          type="emailAddress"
          placeholder="Enter email address"
          label="Email"
          onChangeText={setEmail}
          value={email}
          marginBottom={s.inputs.marginBottom}
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
          marginBottom={s.inputPassword.marginBottom}
        />
        <Input
          type={isSecure ? "password" : "none"}
          placeholder="Confirm password"
          onChangeText={setConfirmPass}
          value={confirmPass}
          icon={
            <EyeIcon
              isSecure={isSecure}
              password={password}
              setIsSecure={setIsSecure}
            />
          }
        />
      </View>
      <View style={s.buttonContainer}>
        <Button
          marginBottom={s.button.marginBottom}
          onPress={handleCreateAccount}
          text="Next"
          size="fill"
          loading={isLoading}
          theme={isButtonEnabled ? "primary" : "disabled"}
        />
        <InteractiveText
          onPress={() => navigation.navigate(SCREENS.LOGIN)}
          prefix="Already have an account?"
          text="Sign in"
        />
      </View>
      <View style={s.bottomContainer}>
        <ScreenProgressIndicator screenName={route.name} />
      </View>
    </DefaultBackground>
  );
};

export default SignUp;
