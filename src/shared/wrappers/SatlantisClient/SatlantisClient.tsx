import { useEffect } from "react";

import { useAppSelector, NostrState } from "src/store";
import { setJWT } from "src/client/satlantisApi";
interface ISatlantisClient {
  children: React.ReactNode;
}

const SatlantisClient: React.FC<ISatlantisClient> = ({ children }) => {
  const token = useAppSelector(NostrState.selectors.selectToken);
  useEffect(() => {
    setJWT(token);
  }, [token]);

  return children;
};

export default SatlantisClient;
