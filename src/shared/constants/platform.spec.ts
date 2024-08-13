const getConstants = () =>
  jest.requireActual<typeof import("./platform")>("./platform");

const mockContants = {
  executionEnvironment: "storeClient",
  ExecutionEnvironment: {
    StoreClient: "storeClient",
    Bare: "bare",
  },
};
jest.mock("expo-constants", () => mockContants);

describe("platform", () => {
  afterEach(() => {
    jest.resetModules();
  });

  it("should IS_EXPO_GO be truthy", () => {
    mockContants.executionEnvironment = "storeClient";
    const { IS_EXPO_GO } = getConstants();
    expect(IS_EXPO_GO).toBeTruthy();
  });
  it("should IS_EXPO_GO be falsy", () => {
    mockContants.executionEnvironment = "bare";
    const { IS_EXPO_GO } = getConstants();
    expect(IS_EXPO_GO).toBeFalsy();
  });
});
