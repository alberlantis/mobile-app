import React from "react";
import { Text, View, Pressable } from "react-native";
import { Interest } from "@satlantis/api-client";

import { Icon } from "src/shared/components";
import { colors, fonts } from "src/theme";
import s, { getItemTextStyle, getButtonContainer } from "./OptionItem.style";

interface IOptionItemProps {
  option: Interest;
  isOptionSelected: boolean;
  isColumnLast: boolean;
  handleOptionsSelection(option: Interest, isOptionSelected: boolean): void;
}

const OptionItem: React.FC<IOptionItemProps> = ({
  option,
  isOptionSelected,
  isColumnLast,
  handleOptionsSelection,
}) => {
  return (
    <Pressable
      style={getButtonContainer(isOptionSelected, isColumnLast)}
      onPress={() => handleOptionsSelection(option, isOptionSelected)}
    >
      <Text style={getItemTextStyle(isOptionSelected)}>{option.name}</Text>
      {isOptionSelected && (
        <View style={s.selectedIcon}>
          <Icon
            type="Feather"
            size={fonts[18]}
            name="check"
            color={colors.WHITE}
          />
        </View>
      )}
    </Pressable>
  );
};

export default OptionItem;
