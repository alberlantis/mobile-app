import React from "react";
import { Text, StyleSheet } from "react-native";

import { useAppSelector, ProfileState } from "src/store";
import { SCREENS } from "src/navigation/routes";
import s from "./TabLabel.style";

interface ITabLabelProps {
  route: string;
  focused?: boolean;
}

const TabLabel: React.FC<ITabLabelProps> = ({ route, focused = false }) => {
  const isBusiness = useAppSelector(
    ProfileState.selectors.selectIsProfileBusiness,
  );
  let label: string = "";

  switch (route) {
    case SCREENS.PROFILE_HOME:
      label = isBusiness ? "business" : "user";
      break;
    default:
      label = route;
  }

  return (
    <Text style={StyleSheet.flatten([s.text, focused && s.textFocus])}>
      {label.toUpperCase()}
    </Text>
  );
};

export default TabLabel;
