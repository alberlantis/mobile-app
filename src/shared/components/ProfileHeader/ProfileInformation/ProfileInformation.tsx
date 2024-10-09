import React, { useState } from "react";
import { View, Text, LayoutChangeEvent, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { SCREENS } from "src/navigation/routes";
import type { SignedNavigationProps } from "src/navigation/SignedStack";
import Avatar from "src/shared/components/Avatar";
import Icon from "src/shared/components/Icon";
import s from "./ProfileInformation.style";
import { colors, fonts, normalizeSize } from "src/theme";

interface IProfileInformationProps {
  isOwnProfile: boolean;
  name: string;
  picture: string;
  npub: string;
  email: string | undefined;
  totalFollowers: number;
  totalFollowings: number;
  isAmbassador: boolean;
}

const ProfileInformation: React.FC<IProfileInformationProps> = ({
  isOwnProfile,
  name,
  npub,
  email,
  totalFollowers,
  totalFollowings,
  picture,
  isAmbassador,
}) => {
  const navigation =
    useNavigation<
      SignedNavigationProps<
        typeof SCREENS.PROFILE_HOME | typeof SCREENS.OTHER_PROFILE
      >
    >();
  const [infoContainerHeight, setInfoContainerHeight] = useState(0);

  const handleContainerLayout = (e: LayoutChangeEvent) => {
    const newHeight = e.nativeEvent?.layout.height;
    if (infoContainerHeight === newHeight) return;
    setInfoContainerHeight(newHeight);
  };

  return (
    <View style={s.container} onLayout={handleContainerLayout}>
      <Avatar picture={picture} />
      <View style={s.innerContainer}>
        <View>
          <View style={s.profileDataNameContainer}>
            <Text style={s.profileDataName}>{name}</Text>
            {isAmbassador && (
              <Icon
                type="MaterialCommunityIcons"
                size={fonts[18]}
                name="crown"
                color={colors.ORANGE_PRIMARY}
              />
            )}
          </View>
          <Text numberOfLines={1} style={s.profileDataTitle}>
            {email || npub}
          </Text>
          <Pressable
            style={s.followersSection}
            onPress={() => {
              if (!isOwnProfile) return;
              navigation.push(SCREENS.FOLLOWERS_AND_FOLLOWING);
            }}
          >
            <Text
              style={[s.followersNumber, { marginRight: normalizeSize(8) }]}
            >
              {totalFollowings} <Text style={s.followersLabel}>Following</Text>
            </Text>
            <Text style={s.followersNumber}>
              {totalFollowers} <Text style={s.followersLabel}>Followers</Text>
            </Text>
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
