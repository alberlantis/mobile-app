import React from "react";
import { Pressable } from "react-native";

import Icon from "../Icon";
import colors from "src/theme/colors";
import fonts from "src/theme/fonts";

interface IEyeIconProps {
  password: string;
  isSecure: boolean;
  setIsSecure: React.Dispatch<React.SetStateAction<boolean>>;
}

const EyeIcon: React.FC<IEyeIconProps> = ({
  isSecure,
  setIsSecure,
  password,
}) => {
  return (
    <Pressable disabled={!password} onPress={() => setIsSecure(!isSecure)}>
      <Icon
        type="Feather"
        name={isSecure ? "eye" : "eye-off"}
        color={!!password ? colors.WHITE : colors.WHITE_LIGHT}
        size={fonts[20]}
      />
    </Pressable>
  );
};

export default EyeIcon;
