import React, { useState } from "react";
import { Text } from "react-native";

import {
  DefaultBackground,
  Input,
  LogoTitle,
  Button,
} from "src/shared/components";
import { SCREENS } from "src/navigation/routes";
import type { RootScreenProps } from "src/navigation/Root";
import s from "./NostrIn.style";
import colors from "src/theme/colors";

const NostrIn = ({ navigation }: RootScreenProps<"NostrIn">) => {
  const [nsecKey, setNsecKey] = useState("");

  return (
    <DefaultBackground style={s.container} blurPos="top">
      <LogoTitle title="Sign In" />
      <Input
        type="username"
        placeholder="Enter your nsec key"
        label="Nsec"
        onChangeText={setNsecKey}
        value={nsecKey}
        marginTop={20}
      />
      <Button
        marginTop={20}
        marginBottom={20}
        onPress={() => navigation.navigate(SCREENS.HOME_TABS)}
        text="Submit"
        theme="primary"
        size="extra-large"
      />
      <Text style={{ color: colors.WHITE_BOLD, textAlign: "center" }}>
        An nSec key is exclusive from the Nostr protocol. If you don’t have an
        nsec key, please sign-in using your email and password.
      </Text>
    </DefaultBackground>
  );
};

export default NostrIn;
