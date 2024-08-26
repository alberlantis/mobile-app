import React from "react";

import type { RootScreenProps } from "src/navigation/Root";
import {
  DefaultBackground,
  Button,
  InteractiveText,
  LogoTitle,
} from "src/shared/components";
import { SCREENS } from "src/navigation/routes";
import s from "./Onboarding.style";

const Onboarding = ({ navigation }: RootScreenProps<"Onboarding">) => {
  return (
    <DefaultBackground style={s.container}>
      <LogoTitle title="Sign Up" />
      <Button
        theme="primary"
        size="large"
        text="Sign Up"
        marginBottom={15}
        marginTop={20}
        onPress={() => navigation.navigate(SCREENS.SIGN_UP)}
      />
      <Button
        theme="secondary"
        size="large"
        text="Instant Nostr Signup"
        marginBottom={20}
        onPress={() => navigation.navigate(SCREENS.NOSTR_UP)}
      />
      <InteractiveText
        text="Sign in"
        prefix="Already have an account?"
        onPress={() => navigation.navigate(SCREENS.HOME_TABS)}
      />
    </DefaultBackground>
  );
};

export default Onboarding;
