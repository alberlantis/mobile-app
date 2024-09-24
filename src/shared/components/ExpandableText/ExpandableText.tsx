import React, { useState } from "react";
import {
  Text,
  View,
  ColorValue,
  NativeSyntheticEvent,
  TextLayoutEventData,
} from "react-native";

import { colors, fonts } from "src/theme";
import s from "./ExpandableText.style";

interface IExpandableTextProps {
  text: string;
  numOfLines: number;
  textSize?: 12 | 14 | 16 | 18 | 20 | 22 | 24 | 26 | 28 | 70;
  textColor?: ColorValue;
  label?: string;
}

const ExpandableText: React.FC<IExpandableTextProps> = ({
  text,
  numOfLines,
  textSize = 14,
  textColor = colors.WHITE,
  label = "View More",
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldShowMore, setShouldShowMore] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };
  const handleTextLayout = (e: NativeSyntheticEvent<TextLayoutEventData>) => {
    const { lines } = e.nativeEvent;
    if (lines.length > numOfLines) {
      setShouldShowMore(true);
    }
  };

  return (
    <View>
      <Text
        style={{
          fontSize: fonts[textSize],
          color: textColor,
        }}
        numberOfLines={isExpanded ? undefined : numOfLines}
        onTextLayout={handleTextLayout}
      >
        {text}
      </Text>
      {!isExpanded && shouldShowMore && (
        <Text style={s.viewMore} onPress={toggleExpansion}>
          {`. ${label}`}
        </Text>
      )}
    </View>
  );
};

export default ExpandableText;
