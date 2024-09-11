import React, { useState } from "react";

import { useAppDispatch, useAppSelector, AuthState } from "src/store";
import { SCREENS } from "src/navigation/routes";
import type { UnsignedScreenProps } from "src/navigation/UnsignedStack";
import {
  Header,
  Title,
  Input,
  Button,
  DefaultBackground,
  EyeIcon,
} from "src/shared/components";
import s from "./ResetPassword.style";
import { SerializedError } from "@reduxjs/toolkit";
import { Alert } from "react-native";

const ResetPassword: React.FC<UnsignedScreenProps<"ResetPassword">> = ({
  navigation,
}) => {
  const dispatch = useAppDispatch();
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordSecure, setNewPasswordSecure] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordSecure, setConfirmPasswordSecure] = useState(true);
  const isLoading = useAppSelector(
    AuthState.selectors.selectResetPasswordLoading,
  );
  const isButtonEnabled =
    !isLoading &&
    !!confirmPassword &&
    !!newPassword &&
    newPassword === confirmPassword;

  const handleConfirmResetPassword = () => {
    if (!isButtonEnabled) return;
    dispatch(AuthState.thunks.shouldPostResetPassword(newPassword))
      .unwrap()
      .then(() => navigation.navigate(SCREENS.LOGIN))
      .catch((e: SerializedError) =>
        Alert.alert("Error when trying to reset password", e.message),
      );
  };

  return (
    <DefaultBackground blurPos="top" style={s.container}>
      <Header hideBackButton />
      <Title title="Reset Password" />
      <Input
        label="Enter new Password"
        placeholder="Enter password"
        value={newPassword}
        onChangeText={setNewPassword}
        type={newPasswordSecure ? "password" : "none"}
        icon={
          <EyeIcon
            password={newPassword}
            isSecure={newPasswordSecure}
            setIsSecure={setNewPasswordSecure}
          />
        }
        marginTop={s.input.marginTop}
      />
      <Input
        label="Confirm new Password"
        placeholder="Enter password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        type={confirmPasswordSecure ? "password" : "none"}
        icon={
          <EyeIcon
            password={confirmPassword}
            isSecure={confirmPasswordSecure}
            setIsSecure={setConfirmPasswordSecure}
          />
        }
        marginTop={s.input.marginTop}
      />
      <Button
        text="Confirm"
        theme={isButtonEnabled ? "primary" : "disabled"}
        size="fill"
        loading={isLoading}
        onPress={handleConfirmResetPassword}
        marginTop={s.button.marginTop}
      />
    </DefaultBackground>
  );
};

export default ResetPassword;
