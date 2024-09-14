import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Interest } from "@satlantis/api-client";

import { SCREENS } from "src/navigation/routes";
import { Interests, CompleteProfile } from "src/screens";

export type AccountCreationParamList = {
  [SCREENS.INTERESTS]: undefined;
  [SCREENS.COMPLETE_PROFILE]: {
    selectedInterests: Interest[];
  };
};
const Stack = createNativeStackNavigator<AccountCreationParamList>();

const AccountCreationGroup = () => {
  return (
    <Stack.Group screenOptions={{ headerShown: false }}>
      <Stack.Screen name={SCREENS.INTERESTS} component={Interests} />
      <Stack.Screen
        name={SCREENS.COMPLETE_PROFILE}
        component={CompleteProfile}
      />
    </Stack.Group>
  );
};

export default AccountCreationGroup;
