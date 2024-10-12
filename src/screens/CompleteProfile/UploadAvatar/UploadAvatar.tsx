import React, { useState } from "react";
import { View, Pressable, Image } from "react-native";

import { useUpdatePhoto, type SatlantisImage } from "src/shared/hooks";
import { Icon, Camera } from "src/shared/components";
import { colors, fonts } from "src/theme";
import s from "./UploadAvatar.style";

interface IUploadAvatarProps {
  setAvatar: React.Dispatch<React.SetStateAction<SatlantisImage>>;
  avatar: SatlantisImage;
}

const UploadAvatar: React.FC<IUploadAvatarProps> = ({ setAvatar, avatar }) => {
  const [toggleCamera, setToggleCamera] = useState(false);
  const { handleSelectAvatar } = useUpdatePhoto({
    setPhoto: setAvatar,
    setCamera: setToggleCamera,
  });

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
            size={fonts[70]}
          />
        )}
        <Pressable style={s.buttonOuterContainer} onPress={handleSelectAvatar}>
          <View style={s.buttonInnerContainer}>
            <Icon
              type="Feather"
              name="camera"
              color={colors.WHITE_BOLD}
              size={fonts[20]}
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
