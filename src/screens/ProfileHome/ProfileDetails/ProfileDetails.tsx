import React from "react";
import { View, Text, Linking } from "react-native";

import { Icon } from "src/shared/components";
import colors from "src/theme/colors";
import s from "./ProfileDetails.style";

const testUrl = "www.google.com";

const ProfileDetails = () => {
  return (
    <View style={s.container}>
      <Text style={s.title}>Freedom Community builder</Text>
      <Text
        style={s.webpage}
        onPress={() => Linking.openURL(`https://${testUrl}`)}
      >
        {testUrl}
      </Text>
      <View style={s.locationContainer}>
        <Icon
          type="Ionicons"
          size={16}
          name="location-sharp"
          color={colors.WHITE_LIGHT}
        />
        <Text style={s.locationName}>
          Nashville <Text style={s.locationType}>(Resident)</Text>
        </Text>
      </View>
    </View>
  );
};

export default ProfileDetails;
