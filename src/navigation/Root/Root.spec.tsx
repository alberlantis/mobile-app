import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";

import Root, { RootScreenProps } from "./Root";

jest.mock("navigation/HomeTabs", () => {
  const { Text } =
    jest.requireActual<typeof import("react-native")>("react-native");
  return function HomeTabs() {
    return <Text>HomeTabs</Text>;
  };
});
jest.mock("screens", () => {
  const { Text } =
    jest.requireActual<typeof import("react-native")>("react-native");
  return {
    Onboarding: ({ navigation }: RootScreenProps<"Onboarding">) => (
      <Text onPress={() => navigation.navigate("HomeTabs")}>
        Onboarding Screen
      </Text>
    ),
  };
});

describe("Root", () => {
  describe("general functionality", () => {
    beforeEach(() => {
      render(<Root />);
    });

    it("should match snapshot", () => {
      expect(screen.toJSON()).toMatchSnapshot();
    });

    it("should render initial route Onboarding screen", () => {
      expect(screen.getByText("Onboarding Screen")).toBeOnTheScreen();
    });
  });

  describe("when navigate to Home tabs", () => {
    beforeEach(() => {
      render(<Root />);
      const button = screen.getByText("Onboarding Screen");
      fireEvent.press(button);
    });

    it("should match snapshot", () => {
      expect(screen.toJSON()).toMatchSnapshot();
    });

    it("should render Home tabs", () => {
      expect(screen.getByText("HomeTabs")).toBeOnTheScreen();
    });
  });
});
