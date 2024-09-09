import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SCREENS } from "src/navigation/routes";
import { SignUp, NostrUp } from "src/screens";

export type SignUpGroupParamList = {
  [SCREENS.SIGN_UP]: undefined;
  [SCREENS.NOSTR_UP]: undefined;
};
const Stack = createNativeStackNavigator<SignUpGroupParamList>();

const SignUpGroup = () => {
  return (
    <Stack.Group>
      <Stack.Screen name={SCREENS.SIGN_UP} component={SignUp} />
      <Stack.Screen name={SCREENS.NOSTR_UP} component={NostrUp} />
    </Stack.Group>
  );
};

export default SignUpGroup;
