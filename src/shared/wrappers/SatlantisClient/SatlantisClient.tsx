import { useEffect } from "react";

import { useAppSelector, NostrState } from "src/store";
import satlantisClient from "src/client/satlantisApi";

interface ISatlantisClient {
  children: React.ReactNode;
}

const SatlantisClient: React.FC<ISatlantisClient> = ({ children }) => {
  const token = useAppSelector(NostrState.selectors.selectToken);
  useEffect(() => {
    satlantisClient.setJwt(token);
    satlantisClient.initClient();
  }, [token]);

  return children;
};

export default SatlantisClient;
