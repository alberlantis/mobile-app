import React from "react";
import { View, Text, Linking } from "react-native";

import { ProfileState, useAppSelector } from "src/store";
import { Icon } from "src/shared/components";
import { colors, fonts } from "src/theme";
import s from "./ProfileDetails.style";

const ProfileDetails = () => {
  const isBusiness = useAppSelector(
    ProfileState.selectors.selectIsProfileBusiness,
  );
  const testUrl = isBusiness ? "www.starbuck.com" : "www.google.com";
  const testDescription = isBusiness
    ? "Sovereign Engineers working together on Freedom Tech. Come and join us."
    : "Freedom Community builder";
  const testCity = isBusiness ? "Funchal" : "Nashville";
  const testTags = isBusiness
    ? "Selected - Coffee, Cancer, Cucks"
    : "(Resident)";

  return (
    <View style={s.container}>
      <Text style={s.title}>{testDescription}</Text>
      <Text
        style={s.webpage}
        onPress={() => Linking.openURL(`https://${testUrl}`)}
      >
        {testUrl}
      </Text>
      <View style={s.locationContainer}>
        <Icon
          type="Ionicons"
          size={fonts[16]}
          name="location-sharp"
          color={colors.WHITE_LIGHT}
        />
        <Text style={s.locationName}>
          {testCity} <Text style={s.locationType}>{testTags}</Text>
        </Text>
      </View>
    </View>
  );
};

export default ProfileDetails;
