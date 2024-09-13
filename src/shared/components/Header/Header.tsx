import React, { useState } from "react";
import { View, Text, ColorValue, LayoutChangeEvent } from "react-native";

import s from "./Header.style";
import BackButton from "../BackButton";
import { colors } from "src/theme";

interface IHeaderProps {
  hideBackButton?: boolean;
  title?: string;
  onPress?(): void;
  titleColor?: ColorValue;
  backButtonColor?: ColorValue;
}

const Header: React.FC<IHeaderProps> = ({
  onPress,
  hideBackButton = false,
  title,
  titleColor = colors.WHITE,
  backButtonColor,
}) => {
  const [containerSize, setContainerSize] = useState<{
    width: number;
    height: number;
  }>({
    height: 0,
    width: 0,
  });
  const handleContainerLayout = (e: LayoutChangeEvent) => {
    setContainerSize({
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height,
    });
  };
  return (
    <View style={s.container} onLayout={handleContainerLayout}>
      <View style={{ width: containerSize.width * 0.2 }}>
        {!hideBackButton && (
          <BackButton onPress={onPress} color={backButtonColor} />
        )}
      </View>
      <View
        style={{ ...s.headerCenterSection, width: containerSize.width * 0.6 }}
      >
        {!!title && (
          <Text style={{ ...s.title, color: titleColor }}>{title}</Text>
        )}
      </View>
    </View>
  );
};

export default Header;
