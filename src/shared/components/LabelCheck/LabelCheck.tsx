import React from "react";
import { View, Text, Pressable } from "react-native";

import { colors, fonts } from "src/theme";
import Icon from "src/shared/components/Icon";
import s from "./LabelCheck.style";

interface ILabelCheckProps {
  value: string;
  setValue(value: string): void;
  isSelected: boolean;
}

const LabelCheck: React.FC<ILabelCheckProps> = ({
  value,
  isSelected,
  setValue,
}) => {
  return (
    <View style={s.container}>
      <Text style={s.label}>{value}</Text>
      <Pressable
        onPress={() => setValue(value)}
        style={[
          s.iconContainer,
          { borderColor: isSelected ? colors.FLAME : colors.GRAY_4 },
        ]}
      >
        <Icon
          type="Feather"
          size={fonts[16]}
          name="check"
          color={isSelected ? colors.FLAME : colors.GRAY_4}
        />
      </Pressable>
    </View>
  );
};

export default LabelCheck;
