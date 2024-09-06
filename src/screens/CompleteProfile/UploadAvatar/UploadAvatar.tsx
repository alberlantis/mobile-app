import React from "react";
import { View, Pressable } from "react-native";

import { Icon } from "src/shared/components";
import colors from "src/theme/colors";
import s, { cameraIconSize, userIconSize } from "./UploadAvatar.style";

const UploadAvatar = () => {
  return (
    <View style={s.container}>
      <View style={s.innerContainer}>
        <Icon
          type="AntDesign"
          name="user"
          color={colors.BLACK_LIGHT}
          size={userIconSize}
        />
        <Pressable style={s.buttonOuterContainer}>
          <View style={s.buttonInnerContainer}>
            <Icon
              type="Feather"
              name="camera"
              color={colors.WHITE_BOLD}
              size={cameraIconSize}
            />
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default UploadAvatar;
