import React, { Fragment } from "react";
import { View, Image, Pressable } from "react-native";

import { ProfileState, useAppDispatch, useAppSelector } from "src/store";
import { IS_DEV } from "src/shared/constants/env";
import { Icon } from "src/shared/components";
import { useImageAssets } from "src/shared/hooks";
import colors from "src/theme/colors";
import s from "./ProfilePortrait.style";

const ProfilePortrait = () => {
  const dispatch = useAppDispatch();
  const { images } = useImageAssets();
  const isBusiness = useAppSelector(
    ProfileState.selectors.selectIsProfileBusiness,
  );
  const isOwnProfile = useAppSelector(
    ProfileState.selectors.selectIsOwnProfile,
  );

  return (
    <Fragment>
      <View style={s.topHeaderContainer}>
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
              size={16}
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
              size={16}
              name={`user-${isOwnProfile ? "check" : "x"}`}
              color={colors.WHITE}
            />
          </Pressable>
        )}
        <Pressable style={s.shareButton}>
          <Icon
            type="Entypo"
            size={16}
            name="share-alternative"
            color={colors.WHITE}
          />
        </Pressable>
      </View>
      <Image
        source={
          isBusiness ? images.mockBusinessLandscape : images.mockUserLandscape
        }
        style={s.image}
        resizeMode="stretch"
      />
    </Fragment>
  );
};

export default ProfilePortrait;
