import React, { useState } from "react";
import { Text, View } from "react-native";

import type { SignedScreenProps } from "src/navigation/SignedStack";
import {
  DefaultBackground,
  ScreenProgressIndicator,
  Title,
  Button,
  Header,
} from "src/shared/components";
import s from "./Interests.style";
import { SCREENS } from "src/navigation/routes";
import OptionsList from "./OptionsList";

const Interests: React.FC<SignedScreenProps<"Interests">> = ({
  route,
  navigation,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const isButtonEnabled = selectedOptions.length > 2;

  return (
    <DefaultBackground blurPos="top" style={s.container}>
      <Header />
      <View style={s.headerContainer}>
        <Title title="Interests" />
        <Text style={s.textDescription}>
          Tell us a bit more about what you like so we can curate Satlantis for
          you. Select at least 3 interests.
        </Text>
      </View>
      <View style={s.optionsListContainer}>
        <OptionsList
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
        />
      </View>
      <View style={s.buttonContainer}>
        <Button
          size="fill"
          text="Submit"
          theme={isButtonEnabled ? "primary" : "disabled"}
          marginBottom={s.buttomMargin.marginBottom}
          onPress={() =>
            isButtonEnabled && navigation.navigate(SCREENS.COMPLETE_PROFILE)
          }
        />
      </View>
      <View style={s.bottomContainer}>
        <ScreenProgressIndicator active={2} screenName={route.name} />
      </View>
    </DefaultBackground>
  );
};

export default Interests;
