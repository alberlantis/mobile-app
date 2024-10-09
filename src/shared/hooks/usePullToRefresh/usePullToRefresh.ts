import { useState } from "react";

const usePullToRefresh = (
  callback: () => Promise<void>,
  delay: number = 1000,
) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(async () => {
      await callback();
      setRefreshing(false);
    }, delay);
  };

  return { onRefresh, refreshing };
};

export default usePullToRefresh;
