import * as React from "react";
import { RouteProp } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

import { SCREENS } from "src/navigation/routes";
import { BackButton } from "src/shared/components";
import {
  Onboarding,
  Splash,
  SignUp,
  NostrUp,
  Login,
  NostrIn,
} from "src/screens";
import { IS_EXPO_GO } from "src/shared/constants/platform";

type UnsignedGroupParamList = {
  [SCREENS.ONBOARDING]: undefined;
  [SCREENS.SPLASH]: undefined;
  [SCREENS.SIGN_UP]: undefined;
  [SCREENS.NOSTR_UP]: undefined;
  [SCREENS.LOGIN]: undefined;
  [SCREENS.NOSTR_IN]: undefined;
};
const Stack = createNativeStackNavigator<UnsignedGroupParamList>();

const UnsignedStack = () => {
  return (
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
