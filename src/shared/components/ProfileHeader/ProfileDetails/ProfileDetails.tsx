import React from "react";
import { View, Text, Linking, Alert } from "react-native";

import Icon from "src/shared/components/Icon";
import { colors, fonts } from "src/theme";
import s from "./ProfileDetails.style";

interface IProfileDetailsProps {
  website: string;
  about: string;
}

const ProfileDetails: React.FC<IProfileDetailsProps> = ({ website, about }) => {
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
      <Text style={s.title}>{about}</Text>
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
