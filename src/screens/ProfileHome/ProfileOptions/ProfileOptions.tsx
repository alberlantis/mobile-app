import React, { useState } from "react";
import { ScrollView, View } from "react-native";

import { Button } from "src/shared/components";
import s from "./ProfileOptions.style";

const OPTIONS = ["Posts", "Info", "Chats", "Followers"];

const ProfileOptions = () => {
  const [selectedOption, setSelectedOption] = useState(OPTIONS[0]);
  return (
    <View style={s.container}>
      <ScrollView horizontal>
        {OPTIONS.map((option) => (
          <Button
            key={option}
            onPress={() => setSelectedOption(option)}
            text={option}
            marginLeft={15}
            theme={selectedOption === option ? "primary" : "disabled"}
            size="auto"
            marginTop={15}
            marginBottom={15}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default ProfileOptions;
