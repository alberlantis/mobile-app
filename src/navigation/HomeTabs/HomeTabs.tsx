import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {
  Home,
  ProfileHome,
  Posting,
  Notifications,
  Location,
} from "src/screens";
import TabIcon from "./TabIcon";
import { SCREENS } from "src/navigation/routes";
import s from "./HomeTabs.style";

export type HomeTabsParamList = {
  [SCREENS.HOME]: undefined;
  [SCREENS.PROFILE_HOME]: undefined;
  [SCREENS.POSTING]: undefined;
  [SCREENS.NOTIFICATIONS]: undefined;
  [SCREENS.LOCATION]: undefined;
};
const Tab = createBottomTabNavigator<HomeTabsParamList>();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => (
          <TabIcon route={route.name} focused={focused} />
        ),
        tabBarStyle: s.tabContainer,
        tabBarShowLabel: false,
        headerShown: false,
      })}
    >
      <Tab.Screen name={SCREENS.HOME} component={Home} />
      <Tab.Screen name={SCREENS.LOCATION} component={Location} />
      <Tab.Screen name={SCREENS.POSTING} component={Posting} />
      <Tab.Screen name={SCREENS.NOTIFICATIONS} component={Notifications} />
      <Tab.Screen name={SCREENS.PROFILE_HOME} component={ProfileHome} />
    </Tab.Navigator>
  );
};

export default HomeTabs;
