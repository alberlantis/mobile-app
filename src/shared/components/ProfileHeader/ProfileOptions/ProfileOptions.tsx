import React, { useState } from "react";
import { ScrollView, View } from "react-native";

import Button from "src/shared/components/Button";
import ButtonOptionLabel from "./ButtonOptionLabel";
import s from "./ProfileOptions.style";
import { fonts, normalizeSize } from "src/theme";

const USER_OPTIONS = ["Posts" /**, "Info", "Chats", "Followers"*/];
const BUSINESS_OPTIONS = ["Posts" /**, "Info", "Reviews"*/];

interface IProfileOptionsProps {
  isBusiness: boolean;
}

const ProfileOptions: React.FC<IProfileOptionsProps> = ({ isBusiness }) => {
  const options = isBusiness ? BUSINESS_OPTIONS : USER_OPTIONS;
  const [selectedOption, setSelectedOption] = useState(options[0]);

  return (
    <View style={s.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {options.map((option, index) => {
          return (
            <View
              style={{
                marginLeft: index === 0 ? normalizeSize(17) : 0,
                marginRight:
                  index === options.length - 1
                    ? normalizeSize(17)
                    : normalizeSize(12),
              }}
              key={`profile-home-carousel-${option}`}
            >
              <Button
                onPress={() => setSelectedOption(option)}
                text={option}
                paddingVertical={12}
                paddingHorizontal={22}
                textStyle={{ fontWeight: fonts.medium }}
                subfixElement={() => (
                  <ButtonOptionLabel option={option} isBusiness={isBusiness} />
                )}
                theme={selectedOption === option ? "primary" : "disabled"}
                size="auto"
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default ProfileOptions;
