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
  const headerHeight = 0.06;

  return (
    <View style={s.container}>
      {!hideBackButton && (
        <BackButton onPress={onPress} containerHeight={headerHeight} />
      )}
    </View>
  );
};

export default Header;
