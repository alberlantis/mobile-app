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

const Header = () => {
  const navigation = useNavigation<NavigationProp<Params>>();

  return (
    <View style={s.container}>
      <Pressable onPress={navigation.goBack} style={s.button}>
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
