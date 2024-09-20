import React, { useState } from "react";
import { Text, View } from "react-native";

import {
  useAppDispatch,
  AuthState,
  useAppSelector,
  UserState,
} from "src/store";
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
import type { InterestsOption } from "./OptionItem";

const Interests: React.FC<SignedScreenProps<"Interests">> = ({
  route,
  navigation,
}) => {
  const dispatch = useAppDispatch();
  const [selectedOptions, setSelectedOptions] = useState<InterestsOption[]>([]);
  const isLoading = useAppSelector(
    UserState.selectors.selectFollowPubKeysLoading,
  );
  const isButtonEnabled = !isLoading && selectedOptions.length > 2;
  const allInterests = useAppSelector(UserState.selectors.selectInterestsMap);
  const handleSubmitButton = () => {
    if (!isButtonEnabled) return;
    const pubkeysToFollow = selectedOptions.reduce<string[]>((acc, option) => {
      const pubkeys = allInterests.get(option.name);
      if (!pubkeys) return acc;
      return [...acc, ...pubkeys];
    }, []);
    dispatch(UserState.thunks.shouldPostFollowPubKeys(pubkeysToFollow))
      .unwrap()
      .then(() => {
        navigation.navigate(SCREENS.COMPLETE_PROFILE, {
          selectedInterests: selectedOptions.map((item) => item.name),
        });
      });
  };

  return (
    <DefaultBackground keyboard blurPos="top" style={s.container}>
      <Header onPress={() => dispatch(AuthState.thunks.shouldLogout())} />
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
          onPress={handleSubmitButton}
          loading={isLoading}
        />
        <ScreenProgressIndicator active={2} screenName={route.name} />
      </View>
    </DefaultBackground>
  );
};

export default Interests;
