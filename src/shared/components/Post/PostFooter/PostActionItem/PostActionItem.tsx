import React from "react";
import { Text, View, StyleProp, ViewStyle, ColorValue } from "react-native";

import { colors, normalizeSize } from "src/theme";
import s from "./PostActionItem.style";
import Icon, { IconName, IconType } from "src/shared/components/Icon";

interface IPostActionProps {
  setIconAction?(): void;
  setTextAction?(): void;
  icon: {
    name: IconName;
    type: IconType;
  };
  text: string;
  style?: StyleProp<ViewStyle>;
  color?: ColorValue;
}

const PostActionItem: React.FC<IPostActionProps> = ({
  setIconAction,
  setTextAction,
  icon,
  text,
  style,
  color = colors.GRAY_3,
}) => {
  return (
    <View style={[s.container, style]}>
      <Icon
        type={icon.type}
        name={icon.name}
        size={normalizeSize(16)}
        color={color}
        onPress={setIconAction}
      />
      <Text onPress={setTextAction} style={s.text}>
        {text}
      </Text>
    </View>
  );
};

export default PostActionItem;
