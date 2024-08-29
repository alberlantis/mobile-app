import React, { useState } from "react";
import { ScrollView, View } from "react-native";

import { useAppSelector, ProfileState } from "src/store";
import { Button } from "src/shared/components";
import ButtonOptionLabel from "../ButtonOptionLabel";
import s from "./ProfileOptions.style";

const USER_OPTIONS = ["Posts", "Info", "Chats", "Followers"];
const BUSINESS_OPTIONS = ["Posts", "Info", "Reviews"];

const ProfileOptions = () => {
  const isBusiness = useAppSelector(
    ProfileState.selectors.selectIsProfileBusiness,
  );
  const options = isBusiness ? BUSINESS_OPTIONS : USER_OPTIONS;
  const [selectedOption, setSelectedOption] = useState(options[0]);

  return (
    <View style={s.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {options.map((option) => {
          return (
            <Button
              key={option}
              onPress={() => setSelectedOption(option)}
              text={option}
              marginLeft={15}
              textStyle={{
                fontSize: 14,
                fontWeight: "medium",
              }}
              subfixElement={() => <ButtonOptionLabel option={option} />}
              theme={selectedOption === option ? "primary" : "disabled"}
              size="auto"
              marginTop={15}
              marginBottom={15}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default ProfileOptions;
