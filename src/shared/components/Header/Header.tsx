import React from "react";
import { Pressable, View } from "react-native";
import { useNavigation, type NavigationProp } from "@react-navigation/native";

import type { UnsignedGroupParamList } from "src/navigation/UnsignedStack";
import type { SignedParamList } from "src/navigation/SignedStack";
import type { HomeTabsParamList } from "src/navigation/HomeTabs";
import Icon from "../Icon";
import colors from "src/theme/colors";
import s, { iconSize } from "./Header.style";

type Params = UnsignedGroupParamList & SignedParamList & HomeTabsParamList;

interface IHeaderProps {
  onPress?(): void;
}

const Header: React.FC<IHeaderProps> = ({ onPress }) => {
  const navigation = useNavigation<NavigationProp<Params>>();

  const handleOnPress = () => {
    if (!!onPress) onPress();
    else navigation.goBack();
  };

  return (
    <View style={s.container}>
      <Pressable onPress={handleOnPress} style={s.button}>
        <Icon
          size={iconSize}
          type="Entypo"
          name="chevron-thin-left"
          color={colors.WHITE}
        />
      </Pressable>
    </View>
  );
};

export default Header;
