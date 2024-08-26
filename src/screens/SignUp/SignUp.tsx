import React, { useState } from "react";

import {
  DefaultBackground,
  Input,
  LogoTitle,
  Button,
  InteractiveText,
} from "src/shared/components";
import { SCREENS } from "src/navigation/routes";
import type { RootScreenProps } from "src/navigation/Root";
import s from "./SignUp.style";

const SignUp = ({ navigation }: RootScreenProps<"SignUp">) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  return (
    <DefaultBackground style={s.container} blurPos="top">
      <LogoTitle title="Sign Up" />
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
        type="password"
        placeholder="Enter password"
        label="Password"
        onChangeText={setPassword}
        value={password}
        marginTop={20}
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
        onPress={() => navigation.navigate(SCREENS.HOME_TABS)}
        text="Next"
        theme="primary"
        size="extra-large"
      />
      <InteractiveText
        onPress={() => navigation.navigate(SCREENS.HOME_TABS)}
        prefix="Already have an account?"
        text="Sign in"
      />
    </DefaultBackground>
  );
};

export default SignUp;
