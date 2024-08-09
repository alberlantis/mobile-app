import React from "react";
import { render, screen } from "@testing-library/react-native";

import App from "./App";

jest.mock("./navigation", () => {
  const { Text } =
    jest.requireActual<typeof import("react-native")>("react-native");
  return function Root() {
    return <Text>Root</Text>;
  };
});

jest.mock("./store", () => ({
  getState: jest.fn(),
  subscribe: jest.fn(),
}));

describe("App", () => {
  beforeEach(() => {
    render(<App />);
  });

  it("should match snapshot", () => {
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it("should render Root navigator", () => {
    expect(screen.getByText("Root")).toBeOnTheScreen();
  });
});
