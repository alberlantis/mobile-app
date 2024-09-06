import React, { useState } from "react";
import { View, ScrollView, useWindowDimensions } from "react-native";

import s, { getRowContainer } from "./OptionsList.style";
import { sanitizeOptions } from "./tools";
import OptionItem from "../OptionItem";

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

interface IOptionsListProps {
  selectedOptions: string[];
  setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>;
}

const OptionsList: React.FC<IOptionsListProps> = ({
  selectedOptions,
  setSelectedOptions,
}) => {
  const { width: screenWidth } = useWindowDimensions();
  const [contentWidth, setContentWidth] = useState(0);
  const options = sanitizeOptions(mockOptions);

  const handleOptionsSelection = (option: string, isSelected: boolean) => {
    setSelectedOptions((prevState) => {
      if (isSelected) {
        return prevState.filter((selectedOption) => selectedOption !== option);
      }
      return [...prevState, option];
    });
  };

  return (
    <ScrollView
      horizontal
      onContentSizeChange={setContentWidth}
      contentOffset={{ x: (contentWidth - screenWidth) / 2, y: 0 }}
      showsHorizontalScrollIndicator={false}
    >
      <View style={s.listContainer}>
        {options.map((row, rowIndex) => {
          const isSecondRow = rowIndex === 1;
          return (
            <View
              key={`interests-options-${rowIndex}`}
              style={getRowContainer(isSecondRow)}
            >
              {row.map((value, colIndex) => (
                <OptionItem
                  option={value}
                  key={`${value}-${rowIndex}`}
                  isColumnLast={colIndex === row.length - 1}
                  isOptionSelected={selectedOptions.includes(value)}
                  handleOptionsSelection={handleOptionsSelection}
                />
              ))}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default OptionsList;
