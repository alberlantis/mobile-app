import React from "react";
import { Text, ColorValue, StyleSheet } from "react-native";

import { useAppSelector, ProfileState } from "src/store";
import s from "./ButtonOptionLabel.style";
import colors from "src/theme/colors";

interface IButtonOptionsLabelProps {
  option: string;
}

const ButtonOptionLabel: React.FC<IButtonOptionsLabelProps> = ({ option }) => {
  const isBusiness = useAppSelector(
    ProfileState.selectors.selectIsProfileBusiness,
  );
  const postsLength = useAppSelector(
    ProfileState.selectors.selectProfilePosts,
  ).length;

  let buttonLabel: string = "";
  let buttonColor: ColorValue = colors.WHITE_BOLD;
  switch (option) {
    case "Info": {
      if (isBusiness) {
        buttonLabel = "Open Now";
        buttonColor = colors.GREEN;
      }
      break;
    }
    case "Reviews": {
      buttonLabel = "4.7";
      break;
    }
    case "Posts":
      buttonLabel = postsLength.toString();
      break;
    default:
      buttonLabel = "";
      buttonColor = colors.WHITE_BOLD;
  }
  if (!buttonLabel) return null;

  return (
    <Text
      style={StyleSheet.compose(s.infoLabelDefault, { color: buttonColor })}
    >
      {buttonLabel}
    </Text>
  );
};

export default ButtonOptionLabel;
