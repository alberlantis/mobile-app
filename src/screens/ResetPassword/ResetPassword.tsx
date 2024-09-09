import React, { useState } from "react";

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

const ResetPassword: React.FC<UnsignedScreenProps<"ResetPassword">> = ({
  navigation,
}) => {
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordSecure, setNewPasswordSecure] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordSecure, setConfirmPasswordSecure] = useState(true);

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
        theme="primary"
        size="fill"
        onPress={() => navigation.navigate(SCREENS.LOGIN)}
        marginTop={s.button.marginTop}
      />
    </DefaultBackground>
  );
};

export default ResetPassword;
