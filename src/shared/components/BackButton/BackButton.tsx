import React from "react";
import { ColorValue, Pressable } from "react-native";
import { useNavigation, type NavigationProp } from "@react-navigation/native";

import type { UnsignedGroupParamList } from "src/navigation/UnsignedStack";
import type { SignedParamList } from "src/navigation/SignedStack";
import type { HomeTabsParamList } from "src/navigation/HomeTabs";
import Icon from "../Icon";
import colors from "src/theme/colors";
import { getIconSize, getContainer } from "./BackButton.style";

type Params = UnsignedGroupParamList & SignedParamList & HomeTabsParamList;

interface IBackButtonProps {
  containerHeight: number;
  color?: ColorValue;
  onPress?(): void;
}

const BackButton: React.FC<IBackButtonProps> = ({
  onPress,
  containerHeight,
  color = colors.BLACK,
}) => {
  const navigation = useNavigation<NavigationProp<Params>>();

  const handleOnPress = () => {
    if (!!onPress) onPress();
    else navigation.goBack();
  };

  return (
    <Pressable
      onPress={handleOnPress}
      style={getContainer(containerHeight, color)}
    >
      <Icon
        size={getIconSize(containerHeight)}
        type="Entypo"
        name="chevron-thin-left"
        color={colors.WHITE}
      />
    </Pressable>
  );
};

export default BackButton;
