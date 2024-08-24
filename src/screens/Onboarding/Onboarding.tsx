import React from "react";
import { Text, Platform, SafeAreaView } from "react-native";
import Constants from "expo-constants";

import {
  EXPO_PUBLIC_APP_IDENTIFIER,
  EXPO_PUBLIC_ENVIRONMENT,
} from "src/shared/constants/env";
import { SCREENS } from "src/navigation/routes";
import { VersionLabel } from "src/shared/components";
import type { RootScreenProps } from "src/navigation/Root";

const Onboarding = ({ navigation }: RootScreenProps<"Onboarding">) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text onPress={() => navigation.navigate(SCREENS.HOME_TABS)}>
        Onboarding Screen
      </Text>
      <Text>{EXPO_PUBLIC_APP_IDENTIFIER}</Text>
      <Text>{EXPO_PUBLIC_ENVIRONMENT}</Text>
      <Text>{`${Platform.OS} / ${Constants.executionEnvironment}`}</Text>
      <VersionLabel />
    </SafeAreaView>
  );
};

export default Onboarding;
