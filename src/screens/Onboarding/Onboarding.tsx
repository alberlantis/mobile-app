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
        size="fill"
        text="Using Email"
        marginBottom={s.emailButton.marginBottom}
        marginTop={s.emailButton.marginTop}
        onPress={() => navigation.navigate(SCREENS.SIGN_UP)}
      />
      <Button
        theme="secondary"
        size="fill"
        text="Using Nostr"
        marginBottom={s.nostrButton.marginBottom}
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
