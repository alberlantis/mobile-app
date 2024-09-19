import React from "react";
import { Text, View, StyleProp, ViewStyle } from "react-native";

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
}

const PostActionItem: React.FC<IPostActionProps> = ({
  setIconAction,
  setTextAction,
  icon,
  text,
  style,
}) => {
  return (
    <View style={[s.container, style]}>
      <Icon
        type={icon.type}
        name={icon.name}
        size={normalizeSize(16)}
        color={colors.GRAY_3}
        onPress={setIconAction}
      />
      <Text onPress={setTextAction} style={s.text}>
        {text}
      </Text>
    </View>
  );
};

export default PostActionItem;
