import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  LayoutChangeEvent,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { SCREENS } from "src/navigation/routes";
import type { SignedNavigationProps } from "src/navigation/SignedStack";
import { ProfileState, useAppSelector } from "src/store";
import { Icon, Avatar } from "src/shared/components";
import s from "./ProfileInformation.style";
import { colors, fonts, normalizeSize } from "src/theme";

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
  const navigation = useNavigation<SignedNavigationProps<"ProfileHome">>();
  const [infoContainerHeight, setInfoContainerHeight] = useState(0);
  const isBusiness = useAppSelector(
    ProfileState.selectors.selectIsProfileBusiness,
  );
  const isOwnProfile = useAppSelector(
    ProfileState.selectors.selectIsOwnProfile,
  );
  const handleContainerLayout = (e: LayoutChangeEvent) => {
    const newHeight = e.nativeEvent?.layout.height;
    if (infoContainerHeight === newHeight) return;
    setInfoContainerHeight(newHeight);
  };

  return (
    <View style={s.container} onLayout={handleContainerLayout}>
      <Avatar />
      <View style={s.innerContainer}>
        <View>
          <View style={s.profileDataNameContainer}>
            <Text style={s.profileDataName}>
              {isBusiness ? "Starbucks" : "Monkey D. Luffy"}
            </Text>
            <Icon
              type="MaterialCommunityIcons"
              size={fonts[18]}
              name="crown"
              color={colors.ORANGE_PRIMARY}
            />
          </View>
          {!isBusiness && <Text style={s.profileDataTitle}>@ambassador</Text>}
          <View style={s.followersSection}>
            <ProfileFollowers
              followCant={2100}
              followLabel="Following"
              marginRight={normalizeSize(8)}
            />
            <ProfileFollowers followCant={210} followLabel="Followers" />
          </View>
        </View>
        {isOwnProfile && (
          <Pressable
            style={s.editButtonContainer}
            onPress={() => navigation.navigate(SCREENS.EDIT_USER)}
          >
            <Icon
              type="Entypo"
              size={fonts[16]}
              name="edit"
              color={colors.WHITE}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default ProfileInformation;
