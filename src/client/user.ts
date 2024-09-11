import satlantisApi from "./satlantisApi";

export const getInterestsPool = async () => {
  const client = satlantisApi.getClient();
  const response = await client.getInterests();

  if (response instanceof Error) {
    console.error(
      `Getting Interests Pool Failed: ${response.message}`,
      response.cause,
    );
    throw new Error(
      `Error fetching interests pool. Reason: ${response.message}`,
    );
  }

  return response;
};
