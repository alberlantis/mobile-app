import { useEffect } from "react";

import {
  useAppSelector,
  NostrState,
  useAppDispatch,
  UserState,
} from "src/store";
import { setJWT } from "src/client/satlantisApi";
interface ISatlantisClient {
  children: React.ReactNode;
}

const SatlantisClient: React.FC<ISatlantisClient> = ({ children }) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(NostrState.selectors.selectToken);
  useEffect(() => {
    setJWT(token);
  }, [token]);

  useEffect(() => {
    dispatch(UserState.thunks.shouldFetchAccount());
  }, [dispatch]);

  return children;
};

export default SatlantisClient;
