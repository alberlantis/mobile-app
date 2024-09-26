import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  LayoutChangeEvent,
  Pressable,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { SCREENS } from "src/navigation/routes";
import type {
  SignedNavigationProps,
  SignedRouteProps,
} from "src/navigation/SignedStack";
import { useAppSelector, UserState } from "src/store";
import { Icon, Avatar } from "src/shared/components";
import s from "./ProfileInformation.style";
import { colors, fonts, normalizeSize } from "src/theme";
import type { ProfileHomeRoutes } from "../ProfileHome";

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
  const route = useRoute<SignedRouteProps<ProfileHomeRoutes>>();
  const isOwnProfile = route.name === SCREENS.PROFILE_HOME;
  const { name, totalFollowers, totalFollowing } = useAppSelector(
    UserState.selectors.selectUserHomeProfile(isOwnProfile),
  );
  const navigation = useNavigation<SignedNavigationProps<ProfileHomeRoutes>>();
  const [infoContainerHeight, setInfoContainerHeight] = useState(0);

  const handleContainerLayout = (e: LayoutChangeEvent) => {
    const newHeight = e.nativeEvent?.layout.height;
    if (infoContainerHeight === newHeight) return;
    setInfoContainerHeight(newHeight);
  };

  return (
    <View style={s.container} onLayout={handleContainerLayout}>
      <Avatar isOwnProfile={isOwnProfile} />
      <View style={s.innerContainer}>
        <View>
          <View style={s.profileDataNameContainer}>
            <Text style={s.profileDataName}>{name}</Text>
            <Icon
              type="MaterialCommunityIcons"
              size={fonts[18]}
              name="crown"
              color={colors.ORANGE_PRIMARY}
            />
          </View>
          {/* <Text style={s.profileDataTitle}>@ambassador</Text> */}
          <Pressable
            style={s.followersSection}
            onPress={() =>
              navigation.push(SCREENS.FOLLOWERS_AND_FOLLOWING, { isOwnProfile })
            }
          >
            <ProfileFollowers
              followCant={totalFollowing}
              followLabel="Following"
              marginRight={normalizeSize(8)}
            />
            <ProfileFollowers
              followCant={totalFollowers}
              followLabel="Followers"
            />
          </Pressable>
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
