import React from "react";
import { View } from "react-native";

import { SCREENS } from "src/navigation/routes";
import { colors, fonts } from "src/theme";
import { Icon } from "src/shared/components";
import type { IconName, IconType } from "src/shared/components/Icon";
import s from "./TabIcon.style";

interface ITabIconProps {
  route?: string | undefined;
  focused?: boolean;
}

const TabIcon: React.FC<ITabIconProps> = ({ route, focused = false }) => {
  let icon: {
    name: IconName;
    type: IconType;
  };
  switch (route) {
    case SCREENS.PROFILE_HOME:
      icon = {
        name: "user",
        type: "AntDesign",
      };
      break;
    case SCREENS.LOCATION:
      icon = {
        name: "location-pin",
        type: "SimpleLineIcons",
      };
      break;
    case SCREENS.POSTING:
      icon = {
        name: "add-circle-outline",
        type: "Ionicons",
      };
      break;
    case SCREENS.NOTIFICATIONS:
      icon = {
        name: "notifications-outline",
        type: "Ionicons",
      };
      break;
    case SCREENS.HOME:
    default:
      icon = {
        name: "home",
        type: "Octicons",
      };
  }
  return (
    <View style={s.container}>
      <Icon
        type={icon.type}
        color={focused ? colors.WHITE : colors.WHITE_LIGHT}
        name={icon.name}
        size={fonts[28]}
      />
    </View>
  );
};

export default TabIcon;
