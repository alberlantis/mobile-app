import React, { useState, useEffect } from "react";
import { Interest } from "@satlantis/api-client";
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
  selectedOptions: Interest[];
  setSelectedOptions: React.Dispatch<React.SetStateAction<Interest[]>>;
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

  const handleOptionsSelection = (option: Interest, isSelected: boolean) => {
    setSelectedOptions((prevState) => {
      if (isSelected) {
        return prevState.filter(
          (selectedOption) => selectedOption.id !== option.id,
        );
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
                  {row.map((option, colIndex) => (
                    <OptionItem
                      option={option}
                      key={`${option.id}-${rowIndex}`}
                      isColumnLast={colIndex === row.length - 1}
                      isOptionSelected={selectedOptions.some(
                        (selectedOption) => selectedOption.id === option.id,
                      )}
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
