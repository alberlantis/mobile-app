import React, { useState } from "react";
import { View, Text } from "react-native";

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

const RecoveryEmail: React.FC<UnsignedScreenProps<"RecoveryEmail">> = ({
  navigation,
}) => {
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [emailSended, setEmailSended] = useState(false);
  const isButtonEnabled = !!recoveryEmail;

  return (
    <DefaultBackground blurPos="top" style={s.container}>
      <Header hideBackButton={emailSended} />
      {emailSended ? (
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
            onPress={() => navigation.navigate(SCREENS.RESET_PASSWORD)}
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
            marginTop={s.button.marginTop}
            onPress={() => isButtonEnabled && setEmailSended(true)}
          />
        </>
      )}
    </DefaultBackground>
  );
};

export default RecoveryEmail;
