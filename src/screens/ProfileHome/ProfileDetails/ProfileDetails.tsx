import React from "react";
import { View, Text, Linking, Alert } from "react-native";

import { useAppSelector, UserState } from "src/store";
import { Icon } from "src/shared/components";
import { colors, fonts } from "src/theme";
import s from "./ProfileDetails.style";

const ProfileDetails = () => {
  const { website } = useAppSelector(UserState.selectors.selectUserHomeProfile);
  const handleOpenWebsite = async () => {
    try {
      if (!website) throw new Error("no website was given");
      await Linking.openURL(website);
    } catch (e) {
      const error = e as Error;
      Alert.alert("Something happend", error.message);
    }
  };

  return (
    <View style={s.container}>
      <Text style={s.title}>Freedom Community builder</Text>
      <Text style={s.webpage} onPress={handleOpenWebsite}>
        {website}
      </Text>
      <View style={s.locationContainer}>
        <Icon
          type="Ionicons"
          size={fonts[16]}
          name="location-sharp"
          color={colors.WHITE_LIGHT}
        />
        <Text style={s.locationName}>
          Funchal <Text style={s.locationType}>(Resident)</Text>
        </Text>
      </View>
    </View>
  );
};

export default ProfileDetails;
