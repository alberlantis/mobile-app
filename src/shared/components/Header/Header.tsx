import React, { useState } from "react";
import { View, Text, ColorValue, LayoutChangeEvent } from "react-native";

import s from "./Header.style";
import BackButton from "../BackButton";
import ShareButton from "../ShareButton";
import { colors, type DimensionSize } from "src/theme";

interface IHeaderProps {
  hideBackButton?: boolean;
  title?: string;
  onPress?(): void;
  titleColor?: ColorValue;
  backButtonColor?: ColorValue;
  shareButtonColor?: ColorValue;
  showSharedButton?: boolean;
  shareValue?: string;
}

const Header: React.FC<IHeaderProps> = ({
  onPress,
  hideBackButton = false,
  title,
  titleColor = colors.WHITE,
  backButtonColor,
  showSharedButton = false,
  shareButtonColor,
  shareValue = "",
}) => {
  const [containerSize, setContainerSize] = useState<DimensionSize>({
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
      <View
        style={{ ...s.headerRightSection, width: containerSize.width * 0.2 }}
      >
        {showSharedButton && (
          <ShareButton color={shareButtonColor} share={shareValue} />
        )}
      </View>
    </View>
  );
};

export default Header;
