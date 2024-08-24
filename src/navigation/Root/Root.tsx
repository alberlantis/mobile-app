import * as React from "react";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

import { IS_EXPO_GO } from "src/shared/constants/platform";
import { SCREENS } from "src/navigation/routes";
import HomeTabs from "src/navigation/HomeTabs";
import { Onboarding, Splash } from "src/screens";

export type HomeTabsParams = {
  screen:
    | (typeof SCREENS)["HOME"]
    | (typeof SCREENS)["NOTIFICATIONS"]
    | (typeof SCREENS)["PROFILE"]
    | (typeof SCREENS)["POSTING"];
};
type RootParamList = {
  [SCREENS.ONBOARDING]: undefined;
  [SCREENS.HOME_TABS]: HomeTabsParams | undefined;
  [SCREENS.SPLASH]: undefined;
};
const Stack = createNativeStackNavigator<RootParamList>();

const Root: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={IS_EXPO_GO ? SCREENS.SPLASH : SCREENS.ONBOARDING}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name={SCREENS.SPLASH} component={Splash} />
        <Stack.Screen name={SCREENS.ONBOARDING} component={Onboarding} />
        <Stack.Screen name={SCREENS.HOME_TABS} component={HomeTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export type RootNavigationProps<T extends keyof RootParamList> =
  NativeStackNavigationProp<RootParamList, T>;
export type RootRouteProps<T extends keyof RootParamList> = RouteProp<
  RootParamList,
  T
>;
export type RootScreenProps<T extends keyof RootParamList> =
  NativeStackScreenProps<RootParamList, T>;

export default Root;
