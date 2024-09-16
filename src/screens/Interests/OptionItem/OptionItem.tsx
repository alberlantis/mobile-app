import React from "react";
import { Text, View, Pressable } from "react-native";

import { Icon } from "src/shared/components";
import { colors, fonts } from "src/theme";
import s, { getItemTextStyle, getButtonContainer } from "./OptionItem.style";

export type InterestsOption = {
  name: string;
  id: number;
};
interface IOptionItemProps {
  option: InterestsOption;
  isOptionSelected: boolean;
  isColumnLast: boolean;
  handleOptionsSelection(
    option: InterestsOption,
    isOptionSelected: boolean,
  ): void;
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
