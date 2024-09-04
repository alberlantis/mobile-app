import React, { useState } from "react";
import {
  Text,
  View,
  Pressable,
  ScrollView,
  useWindowDimensions,
  StyleSheet,
} from "react-native";

import { useAppDispatch, AuthState } from "src/store";
import type { SignedScreenProps } from "src/navigation/SignedStack";
import {
  DefaultBackground,
  ScreenProgressIndicator,
  Title,
  Button,
  Icon,
} from "src/shared/components";
import colors from "src/theme/colors";
import s from "./Interests.style";

const mockOptions = [
  "Gaming",
  "Bitcoin",
  "Art",
  "Photography",
  "Human Rights",
  "Food",
  "Politics",
  "Sports",
  "Satlantis",
  "Books",
  "Movies",
  "Economy",
];
function sanitizeOptions(options: string[]) {
  const n = options.length;
  const baseSize = Math.floor(n / 3);
  const remainder = n % 3;

  let start = 0;
  return Array.from({ length: 3 }, (_, i) => {
    const end = start + baseSize + (i < remainder ? 1 : 0);
    const sublist = options.slice(start, end);
    start = end;
    return sublist;
  });
}

const Interests: React.FC<SignedScreenProps<"Interests">> = ({ route }) => {
  const dispatch = useAppDispatch();
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [contentWidth, setContentWidth] = useState(0);
  const options = sanitizeOptions(mockOptions);
  const isButtonEnabled = selectedOptions.length > 2;
  const itemSize = screenHeight * 0.17;
  const iconCheckSize = itemSize / 5;
  const secondRowMargin = itemSize / 1.9;

  const handleOptionsSelection = (option: string, isSelected: boolean) => {
    setSelectedOptions((prevState) => {
      if (isSelected) {
        return prevState.filter((selectedOption) => selectedOption !== option);
      }
      return [...prevState, option];
    });
  };

  return (
    <>
      <DefaultBackground blurPos="top" style={s.container}>
        <Title title="Interests" />
        <Text style={s.textDescription}>
          Tell us a bit more about what you like so we can curate Satlantis for
          you. Select at least 3 interests.
        </Text>
        <ScrollView
          horizontal
          onContentSizeChange={setContentWidth}
          contentOffset={{ x: (contentWidth - screenWidth) / 2, y: 0 }}
        >
          <View style={s.listContainer}>
            {options.map((row, rowIndex) => {
              const isRowLast = rowIndex === sanitizeOptions.length - 1;
              const isSecondRow = rowIndex === 1;
              return (
                <View
                  key={`interests-options-${rowIndex}`}
                  style={StyleSheet.compose(s.rowContainer, {
                    paddingLeft: isSecondRow ? secondRowMargin : 0,
                  })}
                >
                  {row.map((value, colIndex) => {
                    const isColumnLast = colIndex === row.length - 1;
                    const isOptionSelected = selectedOptions.includes(value);
                    return (
                      <Pressable
                        key={`${value}-${rowIndex}`}
                        style={StyleSheet.compose(s.interestItem, {
                          borderColor: isOptionSelected
                            ? colors.WHITE
                            : colors.GRAY_2,
                          width: itemSize,
                          height: itemSize,
                          borderStyle: isOptionSelected ? "solid" : "dashed",
                          marginBottom: isRowLast ? 0 : 10,
                          marginRight: isColumnLast ? 0 : 10,
                        })}
                        onPress={() =>
                          handleOptionsSelection(value, isOptionSelected)
                        }
                      >
                        <Text
                          style={{
                            color: isOptionSelected
                              ? colors.WHITE
                              : colors.WHITE_BOLD,
                            fontWeight: isOptionSelected
                              ? "semibold"
                              : "regular",
                          }}
                        >
                          {value}
                        </Text>
                        {isOptionSelected && (
                          <View
                            style={StyleSheet.compose(s.selectedIcon, {
                              width: iconCheckSize,
                              height: iconCheckSize,
                            })}
                          >
                            <Icon
                              type="Feather"
                              size={16}
                              name="check"
                              color={colors.WHITE}
                            />
                          </View>
                        )}
                      </Pressable>
                    );
                  })}
                </View>
              );
            })}
          </View>
        </ScrollView>
        <Button
          size="extra-large"
          text="Submit"
          theme={isButtonEnabled ? "primary" : "disabled"}
          marginBottom={20}
          onPress={() => dispatch(AuthState.actions.setAccountCreation(false))}
        />
      </DefaultBackground>
      <ScreenProgressIndicator active={2} screenName={route.name} />
    </>
  );
};

export default Interests;
