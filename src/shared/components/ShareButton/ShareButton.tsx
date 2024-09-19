import React from "react";
import { Pressable, ColorValue } from "react-native";
import * as Sharing from "expo-sharing";

import { colors, fonts } from "src/theme";
import Icon from "../Icon";
import s from "./ShareButton.style";

interface IShareButtonProps {
  color?: ColorValue;
  share: string;
}

const ShareButton: React.FC<IShareButtonProps> = ({
  color = colors.BLACK_MEDIUM,
  share,
}) => {
  const handleSharePress = async () => {
    if (!(await Sharing.isAvailableAsync())) return;
    await Sharing.shareAsync(share);
  };
  return (
    <Pressable
      onPress={handleSharePress}
      style={{ ...s.container, backgroundColor: color }}
    >
      <Icon
        type="Entypo"
        size={fonts[20]}
        name="share-alternative"
        color={colors.WHITE}
      />
    </Pressable>
  );
};

export default ShareButton;
