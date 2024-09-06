import React, { useState } from "react";
import { View, Pressable, Image } from "react-native";
import { CameraCapturedPicture } from "expo-camera";

import { Icon, Camera } from "src/shared/components";
import colors from "src/theme/colors";
import s, { cameraIconSize, userIconSize } from "./UploadAvatar.style";

const UploadAvatar = () => {
  const [toggleCamera, setToggleCamera] = useState(false);
  const [avatar, setAvatar] = useState<CameraCapturedPicture | undefined>();

  return (
    <View style={s.container}>
      <View style={s.innerContainer}>
        {!!avatar ? (
          <Image style={s.innerContainer} source={avatar} resizeMode="cover" />
        ) : (
          <Icon
            type="AntDesign"
            name="user"
            color={colors.BLACK_LIGHT}
            size={userIconSize}
          />
        )}
        <Pressable
          style={s.buttonOuterContainer}
          onPress={() => setToggleCamera(true)}
        >
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
      <Camera
        toggleCamera={toggleCamera}
        setToggleCamera={setToggleCamera}
        savePhoto={setAvatar}
      />
    </View>
  );
};

export default UploadAvatar;
