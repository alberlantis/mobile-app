import React from "react";
import { Image, View, Text, StyleSheet } from "react-native";

import { Icon } from "src/shared/components";
import { useImageAssets } from "src/shared/hooks";
import s from "./ProfileData.style";
import colors from "src/theme/colors";

const ProfileImage = () => {
  const { images } = useImageAssets();
  return (
    <View style={s.profilePhotoOutterContainer}>
      <View style={s.profilePhotoInnerContainer}>
        <Image
          resizeMode="cover"
          source={images.mockProfile}
          style={s.profilePhoto}
        />
        <View style={s.profilePhotoCheckIcon}>
          <Icon type="Feather" size={16} name="check" color={colors.WHITE} />
        </View>
      </View>
    </View>
  );
};

interface IProfileFollowersProps {
  marginRight?: number;
  followCant: number;
  followLabel: "Following" | "Followers";
}

const ProfileFollowers: React.FC<IProfileFollowersProps> = ({
  marginRight,
  followCant,
  followLabel,
}) => {
  return (
    <Text style={StyleSheet.compose(s.followersNumber, { marginRight })}>
      {followCant} <Text style={s.followersLabel}>{followLabel}</Text>
    </Text>
  );
};

const ProfileData = () => {
  return (
    <View style={s.container}>
      <ProfileImage />
      <View style={s.profileDataContainer}>
        <View style={s.profileDataNameContainer}>
          <Text style={s.profileDataName}>Monkey D. Luffy</Text>
          <Icon
            type="MaterialCommunityIcons"
            size={16}
            name="crown"
            color={colors.ORANGE_PRIMARY}
          />
        </View>
        <Text style={s.profileDataTitle}>@ambassador</Text>
        <View style={s.followersSection}>
          <ProfileFollowers
            followCant={2100}
            followLabel="Following"
            marginRight={10}
          />
          <ProfileFollowers followCant={210} followLabel="Followers" />
        </View>
      </View>
    </View>
  );
};

export default ProfileData;
