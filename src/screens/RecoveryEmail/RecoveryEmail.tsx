import React, { useState } from "react";
import { View, Text, Alert } from "react-native";

import { useAppDispatch, useAppSelector, AuthState } from "src/store";
import { SCREENS } from "src/navigation/routes";
import type { UnsignedScreenProps } from "src/navigation/UnsignedStack";
import {
  DefaultBackground,
  Header,
  Title,
  Input,
  Button,
  Icon,
} from "src/shared/components";
import s, { emailIconSize } from "./RecoveryEmail.style";
import colors from "src/theme/colors";
import { SerializedError } from "@reduxjs/toolkit";

const RecoveryEmail: React.FC<UnsignedScreenProps<"RecoveryEmail">> = ({
  navigation,
}) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(
    AuthState.selectors.selectInitiateResetPasswordLoading,
  );
  const isEmailSended = useAppSelector(
    AuthState.selectors.selectInitiateResetPasswordSuccess,
  );
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const isButtonEnabled = !!recoveryEmail && !isLoading;

  const handleResetPassword = () => {
    if (!isButtonEnabled) return;
    dispatch(AuthState.thunks.shouldPostInitializeResetPassword(recoveryEmail))
      .unwrap()
      .catch((e: SerializedError) =>
        Alert.alert("Error when trying to send email", e.message),
      );
  };

  /**
   * @tech-debt
   *
   * should navigate back to login
   */
  const handleClose = () => {
    dispatch(AuthState.actions.shouldResetInitiateResetPassword());
    navigation.navigate(SCREENS.RESET_PASSWORD);
  };

  return (
    <DefaultBackground blurPos="top" style={s.container}>
      <Header hideBackButton={isEmailSended} />
      {isEmailSended ? (
        <>
          <View style={s.emailIconContainer}>
            <Icon
              type="Fontisto"
              name="email"
              color={colors.ORANGE_PRIMARY}
              size={emailIconSize}
            />
          </View>
          <Title title="Check your inbox" />
          <Text style={s.emailRecoveryDescription}>
            If your account exists, we will send a reset link to your email.{" "}
          </Text>
          <Button
            size="fill"
            text="Close"
            theme="primary-outline"
            onPress={handleClose}
          />
        </>
      ) : (
        <>
          <Title title="Reset Password" />
          <Input
            placeholder="Username / Email address"
            label="Username / Recovery Email"
            type="emailAddress"
            value={recoveryEmail}
            onChangeText={setRecoveryEmail}
            marginTop={s.input.marginTop}
          />
          <Button
            theme={isButtonEnabled ? "primary" : "disabled"}
            size="fill"
            text="Reset Password"
            loading={isLoading}
            marginTop={s.button.marginTop}
            onPress={handleResetPassword}
          />
        </>
      )}
    </DefaultBackground>
  );
};

export default RecoveryEmail;
