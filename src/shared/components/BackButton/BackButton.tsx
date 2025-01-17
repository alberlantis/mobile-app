import React from "react";
import { ColorValue, Pressable } from "react-native";
import { useNavigation, type NavigationProp } from "@react-navigation/native";

import type { UnsignedGroupParamList } from "src/navigation/UnsignedStack";
import type { SignedParamList } from "src/navigation/SignedStack";
import type { HomeTabsParamList } from "src/navigation/HomeTabs";
import Icon from "../Icon";
import { colors, fonts, normalizeSize } from "src/theme";
import s from "./BackButton.style";

type Params = UnsignedGroupParamList & SignedParamList & HomeTabsParamList;

interface IBackButtonProps {
  color?: ColorValue;
  onPress?(): void;
  size?: number;
}

const BackButton: React.FC<IBackButtonProps> = ({
  onPress,
  color = colors.BLACK,
  size = 38,
}) => {
  const navigation = useNavigation<NavigationProp<Params>>();

  const handleOnPress = () => {
    if (!!onPress) onPress();
    else navigation.goBack();
  };

  return (
    <Pressable
      onPress={handleOnPress}
      style={{
        ...s.container,
        backgroundColor: color,
        width: normalizeSize(size),
        height: normalizeSize(size),
        borderRadius: normalizeSize(size) / 2,
      }}
    >
      <Icon
        size={fonts[16]}
        type="Entypo"
        name="chevron-thin-left"
        color={colors.WHITE}
      />
    </Pressable>
  );
};

export default BackButton;
