import { useDispatch, useSelector } from "react-redux";
import { createAsyncThunk } from "@reduxjs/toolkit";

import "./tools";

jest.mock("react-redux", () => ({
  useDispatch: {
    withTypes: jest.fn(),
  },
  useSelector: {
    withTypes: jest.fn(),
  },
}));

jest.mock("@reduxjs/toolkit", () => ({
  createAsyncThunk: {
    withTypes: jest.fn(),
  },
}));

describe("tools", () => {
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
