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
import { BackButton } from "src/shared/components";
import {
  Onboarding,
  Splash,
  SignUp,
  NostrUp,
  Login,
  NostrIn,
} from "src/screens";

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
  [SCREENS.SIGN_UP]: undefined;
  [SCREENS.NOSTR_UP]: undefined;
  [SCREENS.LOGIN]: undefined;
  [SCREENS.NOSTR_IN]: undefined;
};
const Stack = createNativeStackNavigator<RootParamList>();

const Root: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerBackVisible: false,
          headerTransparent: true,
          title: "",
        }}
        initialRouteName={IS_EXPO_GO ? SCREENS.SPLASH : SCREENS.ONBOARDING}
      >
        <Stack.Screen
          options={{ headerShown: false }}
          name={SCREENS.SPLASH}
          component={Splash}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name={SCREENS.ONBOARDING}
          component={Onboarding}
        />
        <Stack.Screen
          options={{
            headerLeft: () => <BackButton />,
          }}
          name={SCREENS.SIGN_UP}
          component={SignUp}
        />
        <Stack.Screen
          options={{
            headerLeft: () => <BackButton />,
          }}
          name={SCREENS.NOSTR_UP}
          component={NostrUp}
        />
        <Stack.Screen
          options={{
            headerLeft: () => <BackButton />,
          }}
          name={SCREENS.LOGIN}
          component={Login}
        />
        <Stack.Screen
          options={{
            headerLeft: () => <BackButton />,
          }}
          name={SCREENS.NOSTR_IN}
          component={NostrIn}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name={SCREENS.HOME_TABS}
          component={HomeTabs}
        />
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
