import { configureStore } from "@reduxjs/toolkit";

import { store } from "./store";

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));
jest.mock("redux-persist-expo-securestore", () => jest.fn());
jest.mock("@reduxjs/toolkit", () => ({
  configureStore: jest.fn(() => "mock_store"),
  combineReducers: jest.fn(),
}));
jest.mock("redux-persist", () => ({
  persistStore: jest.fn(),
  persistReducer: jest.fn(),
  createTransform: jest.fn(),
}));
jest.mock("src/client/satlantisApi", () => null);
jest.mock("./Profile", () => ({
  reducer: "profile-reducer",
}));
jest.mock("./Nostr", () => ({
  reducer: "nostr-reducer",
}));
jest.mock("./Auth", () => ({
  reducer: "auth-reducer",
}));

describe("store", () => {
  it("should call configureStore once with correct store configuration", () => {
    expect(configureStore).toHaveBeenCalledTimes(1);
    expect(configureStore).toHaveBeenCalledWith({
      middleware: expect.any(Function),
      reducer: {
        regular: undefined,
        secure: undefined,
      },
    });
  });

  it("should return given store", () => {
    expect(store).toEqual("mock_store");
  });
});
