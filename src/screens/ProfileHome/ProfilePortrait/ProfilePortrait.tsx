import React, { Fragment } from "react";
import { View, Pressable } from "react-native";

import { ProfileState, useAppDispatch, useAppSelector } from "src/store";
import { IS_DEV } from "src/shared/constants/env";
import { Icon, BackButton, ImagePortrait } from "src/shared/components";
import colors from "src/theme/colors";
import s, { iconsSize } from "./ProfilePortrait.style";

const ProfilePortrait = () => {
  const dispatch = useAppDispatch();
  const isBusiness = useAppSelector(
    ProfileState.selectors.selectIsProfileBusiness,
  );
  const isOwnProfile = useAppSelector(
    ProfileState.selectors.selectIsOwnProfile,
  );
  const headerContainerHeight = 0.08;

  return (
    <Fragment>
      <View style={s.topHeaderContainer}>
        {!isOwnProfile && (
          <BackButton
            containerHeight={headerContainerHeight}
            color={colors.BLACK_MEDIUM}
          />
        )}
        {IS_DEV && (
          <Pressable
            style={s.changeProfileButton}
            onPress={() =>
              dispatch(
                ProfileState.actions.shouldChangeProfile(
                  isBusiness ? "user" : "business",
                ),
              )
            }
          >
            <Icon
              type="FontAwesome"
              size={iconsSize}
              name={`rotate-${isBusiness ? "left" : "right"}`}
              color={colors.WHITE}
            />
          </Pressable>
        )}
        {IS_DEV && (
          <Pressable
            style={s.ownProfileButton}
            onPress={() =>
              dispatch(
                ProfileState.actions.shouldToggleOwnProfile(!isOwnProfile),
              )
            }
          >
            <Icon
              type="Feather"
              size={iconsSize}
              name={`user-${isOwnProfile ? "check" : "x"}`}
              color={colors.WHITE}
            />
          </Pressable>
        )}
        <Pressable style={s.shareButton}>
          <Icon
            type="Entypo"
            size={iconsSize}
            name="share-alternative"
            color={colors.WHITE}
          />
        </Pressable>
      </View>
      <ImagePortrait />
    </Fragment>
  );
};

export default ProfilePortrait;
