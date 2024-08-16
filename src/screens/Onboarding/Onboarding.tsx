import React from "react";
import { Text, Platform } from "react-native";
import Constants from "expo-constants";

import {
  EXPO_PUBLIC_APP_IDENTIFIER,
  EXPO_PUBLIC_ENVIRONMENT,
} from "shared/constants/env";
import { SCREENS } from "navigation/routes";
import { VersionLabel } from "shared/components";
import type { RootScreenProps } from "navigation/Root";

const Onboarding = ({ navigation }: RootScreenProps<"Onboarding">) => {
  return (
    <>
      <Text onPress={() => navigation.navigate(SCREENS.HOME_TABS)}>
        Onboarding Screen
      </Text>
      <Text>{EXPO_PUBLIC_APP_IDENTIFIER}</Text>
      <Text>{EXPO_PUBLIC_ENVIRONMENT}</Text>
      <Text>{`${Platform.OS} / ${Constants.executionEnvironment}`}</Text>
      <VersionLabel />
    </>
  );
};

export default Onboarding;
