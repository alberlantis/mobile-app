import React from "react";
import { Text } from "react-native";

import { SCREENS } from "navigation/routes";
import type { RootScreenProps } from "navigation/Root";

const Onboarding = ({ navigation }: RootScreenProps<"Onboarding">) => {
  return (
    <Text onPress={() => navigation.navigate(SCREENS.HOME_TABS)}>
      Onboarding Screen
    </Text>
  );
};

export default Onboarding;
