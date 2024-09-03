import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { useAppSelector, AuthState } from "src/store";
import UnsignedStack from "../UnsignedStack";
import SignedStack from "../SignedStack";

const Root: React.FC = () => {
  const isLogged = useAppSelector(AuthState.selectors.selectIsLogged);
  return (
    <NavigationContainer>
      {isLogged ? <SignedStack /> : <UnsignedStack />}
    </NavigationContainer>
  );
};

export default Root;
