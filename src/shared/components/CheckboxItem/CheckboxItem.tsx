import React from "react";
import { TouchableOpacity, View, Text } from "react-native";

import Icon from "../Icon";
import { colors, fonts } from "src/theme";
import s from "./CheckboxItem.style";

interface ICheckboxItemProps {
  value: string;
  isSelected?: boolean;
  setValue(value: string): void;
}

const CheckboxItem: React.FC<ICheckboxItemProps> = ({
  value,
  setValue,
  isSelected = false,
}) => {
  const toggleCheck = () => {
    setValue(value);
  };

  return (
    <View style={s.container}>
      <TouchableOpacity
        onPress={toggleCheck}
        style={[
          s.square,
          {
            backgroundColor: isSelected ? colors.ORANGE_PRIMARY : "transparent",
            borderWidth: isSelected ? 0 : 1,
          },
        ]}
      >
        {isSelected && (
          <Icon
            name="check"
            type="Feather"
            size={fonts[12]}
            color={colors.WHITE}
          />
        )}
      </TouchableOpacity>
      <Text style={s.label}>{value}</Text>
    </View>
  );
};

export default CheckboxItem;
