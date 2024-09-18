import React from "react";
import { Pressable, ColorValue } from "react-native";

import { colors, fonts } from "src/theme";
import Icon from "../Icon";
import s from "./ShareButton.style";

interface IShareButtonProps {
  color?: ColorValue;
}

const ShareButton: React.FC<IShareButtonProps> = ({
  color = colors.BLACK_MEDIUM,
}) => {
  return (
    <Pressable style={{ ...s.container, backgroundColor: color }}>
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
