import React from "react";
import { Text, Button } from "react-native";

import { useAppDispatch, AuthState } from "src/store";

const Home = () => {
  const dispatch = useAppDispatch();

  return (
    <>
      <Text>Home Screen</Text>
      <Button
        title="Logout"
        onPress={() => dispatch(AuthState.thunks.shouldLogout())}
      />
    </>
  );
};

export default Home;
