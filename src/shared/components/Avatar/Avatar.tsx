import React, { useState } from "react";
import { View, Pressable } from "react-native";

import { useUpdatePhoto, type SatlantisImage } from "src/shared/hooks";
import Icon from "../Icon";
import s from "./Avatar.style";
import { colors, fonts } from "src/theme";
import RoundeImage from "../RoundImage";
import Camera from "../Camera";

interface IAvatarProps {
  picture: string;
  editAvatar?: boolean;
  setPhoto?(value: SatlantisImage): void;
}

const Avatar: React.FC<IAvatarProps> = ({
  picture,
  setPhoto = () => {},
  editAvatar = false,
}) => {
  const [camera, setCamera] = useState(false);
  const { handleSelectAvatar } = useUpdatePhoto({ setCamera, setPhoto });

  return (
    <View style={s.profilePhotoInnerContainer}>
      <RoundeImage size={80} image={picture} />
      {editAvatar && (
        <>
          <Pressable
            style={s.buttonInnerContainer}
            onPress={handleSelectAvatar}
          >
            <Icon
              type="Feather"
              name="camera"
              color={colors.WHITE_BOLD}
              size={fonts[20]}
            />
          </Pressable>
          <Camera
            toggleCamera={camera}
            setToggleCamera={setCamera}
            savePhoto={setPhoto}
          />
        </>
      )}
    </View>
  );
};

export default Avatar;
