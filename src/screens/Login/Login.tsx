import React, { useState } from "react";
import { View } from "react-native";

import {
  DefaultBackground,
  Input,
  LogoTitle,
  Button,
  InteractiveText,
  Separator,
} from "src/shared/components";
import { SCREENS } from "src/navigation/routes";
import type { RootScreenProps } from "src/navigation/Root";
import s from "./Login.style";

const Login = ({ navigation }: RootScreenProps<"Login">) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
          type="password"
          placeholder="Enter password"
          label="Password"
          onChangeText={setPassword}
          value={password}
          marginTop={20}
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
          onPress={() => navigation.navigate(SCREENS.HOME_TABS)}
          text="Sign In"
          theme="primary"
          size="extra-large"
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
