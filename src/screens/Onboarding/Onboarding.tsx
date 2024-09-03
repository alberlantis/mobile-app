import React from "react";

import type { UnsignedScreenProps } from "src/navigation/UnsignedStack";
import {
  DefaultBackground,
  Button,
  InteractiveText,
  LogoTitle,
} from "src/shared/components";
import { SCREENS } from "src/navigation/routes";
import s from "./Onboarding.style";

const Onboarding: React.FC<UnsignedScreenProps<"Onboarding">> = ({
  navigation,
}) => {
  return (
    <DefaultBackground style={s.container}>
      <LogoTitle title="Sign Up" />
      <Button
        theme="primary"
        size="large"
        text="Using Email"
        marginBottom={15}
        marginTop={20}
        onPress={() => navigation.navigate(SCREENS.SIGN_UP)}
      />
      <Button
        theme="secondary"
        size="large"
        text="Using Nostr"
        marginBottom={20}
        onPress={() => navigation.navigate(SCREENS.NOSTR_UP)}
      />
      <InteractiveText
        text="Sign in"
        prefix="Already have an account?"
        onPress={() => navigation.navigate(SCREENS.LOGIN)}
      />
    </DefaultBackground>
  );
};

export default Onboarding;
