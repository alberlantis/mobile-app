import React, { useState } from "react";
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
  const [isChecked, setIsChecked] = useState(isSelected);

  const toggleCheck = () => {
    setIsChecked(!isChecked);
    setValue(value);
  };

  return (
    <View style={s.container}>
      <TouchableOpacity
        onPress={toggleCheck}
        style={[
          s.square,
          {
            backgroundColor: isChecked ? colors.ORANGE_PRIMARY : "transparent",
            borderWidth: isChecked ? 0 : 1,
          },
        ]}
      >
        {isChecked && (
          <Icon
            name="check"
            type="Feather"
            size={fonts[20]}
            color={colors.WHITE}
          />
        )}
      </TouchableOpacity>
      <Text style={s.label}>{value}</Text>
    </View>
  );
};

export default CheckboxItem;
