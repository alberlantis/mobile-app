import { UserResolver } from "@satlantis/api-client";
import { useEffect, useState } from "react";

const useFetchProfileInterests = (profile: UserResolver | undefined) => {
  const [interests, setInterests] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!profile) return;
    (async () => {
      setLoading(true);
      const profileIntersts = await profile.getInterests();
      if (profileIntersts instanceof Error) {
        throw new Error("Error getting profile interests", profileIntersts);
      }

      setInterests(profileIntersts);
      setLoading(false);
    })();
  }, [profile, setLoading, setInterests]);

  return { loading, interests };
};

export default useFetchProfileInterests;
