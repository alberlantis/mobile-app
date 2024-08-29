import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { ProfileState, useAppSelector } from "src/store";
import { Icon } from "src/shared/components";
import ProfileAvatar from "../ProfileAvatar";
import s from "./ProfileInformation.style";
import colors from "src/theme/colors";

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

const ProfileInformation = () => {
  const isBusiness = useAppSelector(
    ProfileState.selectors.selectIsProfileBusiness,
  );

  return (
    <View style={s.container}>
      <ProfileAvatar />
      <View style={s.profileDataContainer}>
        <View style={s.profileDataNameContainer}>
          <Text style={s.profileDataName}>
            {isBusiness ? "Starbucks" : "Monkey D. Luffy"}
          </Text>
          <Icon
            type="MaterialCommunityIcons"
            size={16}
            name="crown"
            color={colors.ORANGE_PRIMARY}
          />
        </View>
        {!isBusiness && <Text style={s.profileDataTitle}>@ambassador</Text>}
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

export default ProfileInformation;
