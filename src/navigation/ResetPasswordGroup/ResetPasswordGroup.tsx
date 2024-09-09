import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SCREENS } from "src/navigation/routes";
import { ResetPassword, RecoveryEmail } from "src/screens";

export type ResetPasswordGroupParamList = {
  [SCREENS.RESET_PASSWORD]: undefined;
  [SCREENS.RECOVERY_EMAIL]: undefined;
};
const Stack = createNativeStackNavigator<ResetPasswordGroupParamList>();

const ResetPasswordGroup = () => {
  return (
    <Stack.Group>
      <Stack.Screen name={SCREENS.RECOVERY_EMAIL} component={RecoveryEmail} />
      <Stack.Screen name={SCREENS.RESET_PASSWORD} component={ResetPassword} />
    </Stack.Group>
  );
};

export default ResetPasswordGroup;
