import React from "react";
import { Text, Pressable } from "react-native";

import { colors, normalizeSize } from "src/theme";
import Icon, { IconName, IconType } from "../../Icon";
import s from "./MenuItem.style";

interface IMenuItemProps {
  icon: IconName;
  type: IconType;
  primary?: boolean;
  first?: boolean;
  last?: boolean;
  text: string;
  onPress(): void;
}

const MenuItem: React.FC<IMenuItemProps> = ({
  icon,
  text,
  primary = false,
  first = false,
  last = false,
  onPress,
  type,
}) => (
  <Pressable
    onPress={onPress}
    style={[
      s.menuItem,
      !last && s.borderItem,
      first && s.firstItem,
      last && s.lastItem,
    ]}
  >
    <Icon
      type={type}
      name={icon}
      size={normalizeSize(14)}
      color={primary ? colors.RED_PRIMARY : colors.GRAY_3}
    />
    <Text style={[s.menuText, primary && { color: colors.RED_PRIMARY }]}>
      {text}
    </Text>
  </Pressable>
);

export default MenuItem;
