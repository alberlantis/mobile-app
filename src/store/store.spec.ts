import { configureStore } from "@reduxjs/toolkit";

import store from "./store";

jest.mock("@reduxjs/toolkit", () => ({
  configureStore: jest.fn(() => "mock_store"),
}));
jest.mock("./Profile", () => ({
  reducer: "profile-reducer",
}));

describe("store", () => {
  it("should call configureStore once with correct store configuration", () => {
    expect(configureStore).toHaveBeenCalledTimes(1);
    expect(configureStore).toHaveBeenCalledWith({
      reducer: {
        profile: "profile-reducer",
      },
    });
  });

  it("should return given store", () => {
    expect(store).toEqual("mock_store");
  });
});
