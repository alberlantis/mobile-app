import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SCREENS } from "src/navigation/routes";
import { Login, NostrIn } from "src/screens";

export type LoginGroupParamList = {
  [SCREENS.LOGIN]: undefined;
  [SCREENS.NOSTR_IN]: undefined;
};
const Stack = createNativeStackNavigator<LoginGroupParamList>();

const LoginGroup = () => {
  return (
    <Stack.Group>
      <Stack.Screen name={SCREENS.LOGIN} component={Login} />
      <Stack.Screen name={SCREENS.NOSTR_IN} component={NostrIn} />
    </Stack.Group>
  );
};

export default LoginGroup;
