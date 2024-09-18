import React from "react";
import { Text, Pressable, StyleProp, ViewStyle } from "react-native";

import { colors, normalizeSize } from "src/theme";
import { Icon } from "src/shared/components";
import s from "./PostActionItem.style";
import { IconName, IconType } from "src/shared/components/Icon";

interface IPostActionProps {
  setAction?(value: boolean): void;
  value?: boolean;
  icon: {
    name: IconName;
    type: IconType;
  };
  text: string;
  style?: StyleProp<ViewStyle>;
}

const PostActionItem: React.FC<IPostActionProps> = ({
  setAction,
  value,
  icon,
  text,
  style,
}) => {
  return (
    <Pressable
      style={[s.container, style]}
      onPress={() => !!setAction && setAction(!value)}
    >
      <Icon
        type={icon.type}
        name={icon.name}
        size={normalizeSize(16)}
        color={colors.GRAY_3}
      />
      <Text style={s.text}>{text}</Text>
    </Pressable>
  );
};

export default PostActionItem;
