import React from "react";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import type { RootNavigationProps } from "src/navigation/Root";
import Icon from "../Icon";
import colors from "src/theme/colors";
import s from "./BackButton.style";

const BackButton = () => {
  const navigation = useNavigation<RootNavigationProps<"SignUp">>();

  return (
    <Pressable onPress={navigation.goBack} style={s.container}>
      <Icon type="Entypo" name="chevron-thin-left" color={colors.WHITE} />
    </Pressable>
  );
};

export default BackButton;
