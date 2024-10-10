import React from "react";
import { View, Text, Linking } from "react-native";

import { colors, normalizeSize } from "src/theme";
import { Icon, Button } from "src/shared/components";
import s from "./LocationAccess.style";

const LocationAccess = () => {
  return (
    <View style={s.container}>
      <Icon
        type="Octicons"
        name="gear"
        color={colors.ORANGE_2}
        size={normalizeSize(40)}
        style={s.gearIcon}
      />
      <Text style={s.title}>Allow location access</Text>
      <Text style={s.subtitle}>
        Allow Satlantis to access your location so we can show you the best
        merchants right away. Otherwise, use the search above.
      </Text>
      <Button
        text="Go to Settings"
        size="fill"
        theme="primary-outline"
        paddingVertical={16}
        onPress={Linking.openSettings}
      />
    </View>
  );
};

export default LocationAccess;
