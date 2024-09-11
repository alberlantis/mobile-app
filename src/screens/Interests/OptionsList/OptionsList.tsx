import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";

import { useAppDispatch, useAppSelector, UserState } from "src/store";
import s, { getRowContainer } from "./OptionsList.style";
import OptionItem from "../OptionItem";

interface IOptionsListProps {
  selectedOptions: string[];
  setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>;
}

const OptionsList: React.FC<IOptionsListProps> = ({
  selectedOptions,
  setSelectedOptions,
}) => {
  const dispatch = useAppDispatch();
  const { width: screenWidth } = useWindowDimensions();
  const [contentWidth, setContentWidth] = useState(0);
  const isLoading = useAppSelector(
    UserState.selectors.selectInterestsPoolLoading,
  );
  const options = useAppSelector(
    UserState.selectors.selectSanitizeInterestsPool,
  );

  const handleOptionsSelection = (option: string, isSelected: boolean) => {
    setSelectedOptions((prevState) => {
      if (isSelected) {
        return prevState.filter((selectedOption) => selectedOption !== option);
      }
      return [...prevState, option];
    });
  };

  useEffect(() => {
    dispatch(UserState.thunks.shouldFetchAllInterests());
  }, [dispatch]);

  return (
    <ScrollView
      horizontal
      onContentSizeChange={setContentWidth}
      contentOffset={{ x: (contentWidth - screenWidth) / 2, y: 0 }}
      showsHorizontalScrollIndicator={false}
    >
      <View style={s.listContainer}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <>
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
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default OptionsList;
