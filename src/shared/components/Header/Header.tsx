import React from "react";
import { View } from "react-native";

import s from "./Header.style";
import BackButton from "../BackButton";

interface IHeaderProps {
  hideBackButton?: boolean;
  onPress?(): void;
}

const Header: React.FC<IHeaderProps> = ({
  onPress,
  hideBackButton = false,
}) => {
  return (
    <View style={s.container}>
      {!hideBackButton && <BackButton onPress={onPress} />}
    </View>
  );
};

export default Header;
