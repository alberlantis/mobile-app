import React, { useState } from "react";

import {
  DefaultBackground,
  Input,
  LogoTitle,
  Button,
} from "src/shared/components";
import { SCREENS } from "src/navigation/routes";
import type { RootScreenProps } from "src/navigation/Root";
import s from "./NostrUp.style";

const NostrUp = ({ navigation }: RootScreenProps<"NostrUp">) => {
  const [username, setUsername] = useState("");

  return (
    <DefaultBackground style={s.container} blurPos="top">
      <LogoTitle title="Sign Up" />
      <Input
        type="username"
        placeholder="Enter your username"
        label="Username"
        onChangeText={setUsername}
        value={username}
        marginTop={20}
      />
      <Button
        marginTop={20}
        onPress={() => navigation.navigate(SCREENS.HOME_TABS)}
        text="Next"
        theme="primary"
        size="extra-large"
      />
    </DefaultBackground>
  );
};

export default NostrUp;
