import React from "react";
import { RouteProp } from "@react-navigation/native";
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
  BottomTabScreenProps,
} from "@react-navigation/bottom-tabs";

import { Home, Profile, Posting, Notifications } from "src/screens";
import { SCREENS } from "src/navigation/routes";

type HomeTabsParamList = {
  [SCREENS.HOME]: undefined;
  [SCREENS.PROFILE]: undefined;
  [SCREENS.POSTING]: undefined;
  [SCREENS.NOTIFICATIONS]: undefined;
};
const Tab = createBottomTabNavigator<HomeTabsParamList>();

export default function App() {
  return (
    <Tab.Navigator>
      <Tab.Screen name={SCREENS.HOME} component={Home} />
      <Tab.Screen name={SCREENS.PROFILE} component={Profile} />
      <Tab.Screen name={SCREENS.POSTING} component={Posting} />
      <Tab.Screen name={SCREENS.NOTIFICATIONS} component={Notifications} />
    </Tab.Navigator>
  );
}

export type HomeTabsNavigationProps<T extends keyof HomeTabsParamList> =
  BottomTabNavigationProp<HomeTabsParamList, T>;
export type HomeTabsRouteProps<T extends keyof HomeTabsParamList> = RouteProp<
  HomeTabsParamList,
  T
>;
export type HomeTabsScreenProps<T extends keyof HomeTabsParamList> =
  BottomTabScreenProps<HomeTabsParamList, T>;
