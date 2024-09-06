import * as React from "react";
import { RouteProp } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

import { useAppSelector, AuthState } from "src/store";
import { SCREENS } from "src/navigation/routes";
import AccountCreationGroup, {
  type AccountCreationParamList,
} from "src/navigation/AccountCreationGroup";
import HomeTabs from "src/navigation/HomeTabs";

export type HomeTabsParams =
  | {
      screen?:
        | (typeof SCREENS)["HOME"]
        | (typeof SCREENS)["NOTIFICATIONS"]
        | (typeof SCREENS)["PROFILE_HOME"]
        | (typeof SCREENS)["POSTING"];
    }
  | undefined;
export type SignedParamList = {
  [SCREENS.HOME_TABS]: HomeTabsParams;
} & AccountCreationParamList;
const Stack = createNativeStackNavigator<SignedParamList>();

const SignedStack: React.FC = () => {
  const isAccountCreation = useAppSelector(
    AuthState.selectors.selectIsAccountCreation,
  );
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackVisible: false,
        headerTransparent: true,
        title: "",
      }}
    >
      {isAccountCreation ? (
        AccountCreationGroup()
      ) : (
        <Stack.Group>
          <Stack.Screen
            options={{ headerShown: false }}
            name={SCREENS.HOME_TABS}
            component={HomeTabs}
          />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export type SignedNavigationProps<T extends keyof SignedParamList> =
  NativeStackNavigationProp<SignedParamList, T>;
export type SignedRouteProps<T extends keyof SignedParamList> = RouteProp<
  SignedParamList,
  T
>;
export type SignedScreenProps<T extends keyof SignedParamList> =
  NativeStackScreenProps<SignedParamList, T>;

export default SignedStack;
