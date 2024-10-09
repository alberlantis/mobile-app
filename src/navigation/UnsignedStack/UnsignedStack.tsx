import * as React from "react";
import { RouteProp } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

import { SCREENS } from "src/navigation/routes";
import { Onboarding, Splash } from "src/screens";
import { IS_EXPO_GO } from "src/shared/constants/platform";
import LoginGroup, { type LoginGroupParamList } from "../LoginGroup";
import SignUpGroup, { type SignUpGroupParamList } from "../SignUpGroup";
import ResetPasswordGroup, {
  type ResetPasswordGroupParamList,
} from "../ResetPasswordGroup";

export type UnsignedGroupParamList = {
  [SCREENS.ONBOARDING]: undefined;
  [SCREENS.SPLASH]: undefined;
} & LoginGroupParamList &
  SignUpGroupParamList &
  ResetPasswordGroupParamList;
const Stack = createNativeStackNavigator<UnsignedGroupParamList>();

const UnsignedStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {IS_EXPO_GO && <Stack.Screen name={SCREENS.SPLASH} component={Splash} />}
      <Stack.Screen name={SCREENS.ONBOARDING} component={Onboarding} />
      {LoginGroup()}
      {SignUpGroup()}
      {ResetPasswordGroup()}
    </Stack.Navigator>
  );
};

export type UnsignedNavigationProps<T extends keyof UnsignedGroupParamList> =
  NativeStackNavigationProp<UnsignedGroupParamList, T>;
export type UnsignedRouteProps<T extends keyof UnsignedGroupParamList> =
  RouteProp<UnsignedGroupParamList, T>;
export type UnsignedScreenProps<T extends keyof UnsignedGroupParamList> =
  NativeStackScreenProps<UnsignedGroupParamList, T>;

export default UnsignedStack;
