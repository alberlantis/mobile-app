import React from "react";

import { useAppSelector, ProfileState } from "src/store";
import { SCREENS } from "src/navigation/routes";
import colors from "src/theme/colors";
import { Icon } from "src/shared/components";
import type { IconName, IconType } from "src/shared/components/Icon";

interface ITabIconProps {
  route?: string | undefined;
  focused?: boolean;
}

const TabIcon: React.FC<ITabIconProps> = ({ route, focused = false }) => {
  const isBusiness = useAppSelector(
    ProfileState.selectors.selectIsProfileBusiness,
  );

  let icon: {
    name: IconName;
    type: IconType;
  };
  switch (route) {
    case SCREENS.PROFILE_HOME:
      icon = {
        name: isBusiness ? "store" : "user-circle-o",
        type: isBusiness ? "MaterialCommunityIcons" : "FontAwesome",
      };
      break;
    case SCREENS.POSTING:
      icon = {
        name: "send-o",
        type: "FontAwesome",
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
        type: "Entypo",
      };
  }
  return (
    <Icon
      type={icon.type}
      color={focused ? colors.WHITE : colors.WHITE_LIGHT}
      name={icon.name}
    />
  );
};

export default TabIcon;
