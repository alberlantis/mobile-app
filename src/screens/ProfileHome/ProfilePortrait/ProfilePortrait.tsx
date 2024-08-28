import React, { Fragment } from "react";
import { View, Image, Pressable } from "react-native";

import { Icon } from "src/shared/components";
import { useImageAssets } from "src/shared/hooks";
import colors from "src/theme/colors";
import s from "./ProfilePortrait.style";

const ProfilePortrait = () => {
  const { images } = useImageAssets();

  return (
    <Fragment>
      <View style={s.shareButtonContainer}>
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
        source={images.mockLandscape}
        style={s.image}
        resizeMode="stretch"
      />
    </Fragment>
  );
};

export default ProfilePortrait;
