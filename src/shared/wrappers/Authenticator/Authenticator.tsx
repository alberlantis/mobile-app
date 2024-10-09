import { useEffect } from "react";

import {
  useAppSelector,
  NostrState,
  AuthState,
  useAppDispatch,
  UserState,
} from "src/store";
import { setJWT } from "src/client/satlantisApi";
import { Alert } from "react-native";
interface IAuthenticatorProps {
  children: React.ReactNode;
}

const Authenticator: React.FC<IAuthenticatorProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(NostrState.selectors.selectToken);
  const isTokenExpired = useAppSelector(
    NostrState.selectors.selectIsTokenExpired,
  );
  const isLogged = useAppSelector(AuthState.selectors.selectIsLogged);

  useEffect(() => {
    if (isTokenExpired && isLogged) {
      Alert.alert("Token Expired!", "Please login again", [
        {
          onPress: () => dispatch(AuthState.thunks.shouldLogout()),
          text: "Logout",
        },
      ]);
    }
  }, [isTokenExpired, isLogged, dispatch]);

  useEffect(() => {
    if (!isTokenExpired) return;
    setJWT(token);
  }, [token, isTokenExpired]);

  useEffect(() => {
    if (!isLogged) return;
    dispatch(UserState.thunks.shouldFetchMyProfile());
  }, [dispatch, isLogged]);

  return children;
};

export default Authenticator;
