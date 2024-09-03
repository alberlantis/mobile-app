import React from "react";
import { Pressable } from "react-native";

import s from "./EyeIcon.style";
import Icon from "../Icon";
import colors from "src/theme/colors";

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
    <Pressable
      disabled={!password}
      onPress={() => setIsSecure(!isSecure)}
      style={s.icon}
    >
      <Icon
        type="Feather"
        name={isSecure ? "eye" : "eye-off"}
        color={!!password ? colors.WHITE : colors.WHITE_LIGHT}
      />
    </Pressable>
  );
};

export default EyeIcon;
