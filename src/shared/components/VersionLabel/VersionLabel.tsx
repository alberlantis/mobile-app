import React from "react";
import { View, Text } from "react-native";
import * as Application from "expo-application";

import { IS_EXPO_GO } from "src/shared/constants/platform";
import {
  EXPO_PUBLIC_APP_VERSION,
  EXPO_PUBLIC_BUILD_VERSION,
} from "src/shared/constants/env";
import s from "./VersionLabel.style";

const VersionLabel = () => {
  const { nativeApplicationVersion, nativeBuildVersion } = Application;
  const version = IS_EXPO_GO
    ? EXPO_PUBLIC_APP_VERSION
    : nativeApplicationVersion;
  const buildNumber = IS_EXPO_GO
    ? EXPO_PUBLIC_BUILD_VERSION
    : nativeBuildVersion;
  return (
    <View style={s.container}>
      <Text style={s.text}>{`${version} (${buildNumber})`}</Text>
    </View>
  );
};

export default VersionLabel;
