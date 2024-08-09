import { useDispatch, useSelector } from "react-redux";
import { createAsyncThunk, configureStore } from "@reduxjs/toolkit";

import store from "./store";

jest.mock("react-redux", () => ({
  useDispatch: {
    withTypes: jest.fn(),
  },
  useSelector: {
    withTypes: jest.fn(),
  },
}));

jest.mock("@reduxjs/toolkit", () => ({
  configureStore: jest.fn(() => "mock_store"),
  createAsyncThunk: {
    withTypes: jest.fn(),
  },
}));

describe("store", () => {
  it("should call configureStore once with correct store configuration", () => {
    expect(configureStore).toHaveBeenCalledTimes(1);
    expect(configureStore).toHaveBeenCalledWith({
      reducer: {},
    });
  });

  it("should return given store", () => {
    expect(store).toEqual("mock_store");
  });

  it("should call once useDispatch withTypes", () => {
    expect(useDispatch.withTypes).toHaveBeenCalledTimes(1);
  });

  it("should call once useSelector withTypes", () => {
    expect(useSelector.withTypes).toHaveBeenCalledTimes(1);
  });

  it("should call once createAsyncThunk withTypes", () => {
    expect(createAsyncThunk.withTypes).toHaveBeenCalledTimes(1);
  });
});
