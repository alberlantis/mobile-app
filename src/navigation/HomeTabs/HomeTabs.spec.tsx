import React from "react";
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";

import HomeTabs from "./HomeTabs";

jest.mock("screens", () => {
  const { Text } =
    jest.requireActual<typeof import("react-native")>("react-native");
  return {
    Home: () => <Text>Home Screen</Text>,
    Profile: () => <Text>Profile Screen</Text>,
    Posting: () => <Text>Posting Screen</Text>,
    Notifications: () => <Text>Notifications Screen</Text>,
  };
});

describe("Root", () => {
  describe("general functionality", () => {
    beforeEach(() => {
      waitFor(() => {
        render(
          <NavigationContainer>
            <HomeTabs />
          </NavigationContainer>,
        );
      });
    });

    it("should match snapshot", () => {
      expect(screen.toJSON()).toMatchSnapshot();
    });

    it("should render 4 bottom buttons", () => {
      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(4);
    });

    it("should render initial route Home screen", () => {
      expect(screen.getByText("Home Screen")).toBeOnTheScreen();
    });
  });

  describe("when navigate to Profile", () => {
    beforeEach(() => {
      waitFor(() => {
        render(
          <NavigationContainer>
            <HomeTabs />
          </NavigationContainer>,
        );
        const button = screen.getByText("Profile");
        fireEvent.press(button);
      });
    });

    it("should match snapshot", () => {
      expect(screen.toJSON()).toMatchSnapshot();
    });

    it("should render Profile screen", () => {
      expect(screen.getByText("Profile Screen")).toBeOnTheScreen();
    });
  });

  describe("when navigate to Posting", () => {
    beforeEach(() => {
      waitFor(() => {
        render(
          <NavigationContainer>
            <HomeTabs />
          </NavigationContainer>,
        );
        const button = screen.getByText("Posting");
        fireEvent.press(button);
      });
    });

    it("should match snapshot", () => {
      expect(screen.toJSON()).toMatchSnapshot();
    });

    it("should render Posting screen", () => {
      expect(screen.getByText("Posting Screen")).toBeOnTheScreen();
    });
  });

  describe("when navigate to Notifications", () => {
    beforeEach(() => {
      waitFor(() => {
        render(
          <NavigationContainer>
            <HomeTabs />
          </NavigationContainer>,
        );
        const button = screen.getByText("Notifications");
        fireEvent.press(button);
      });
    });

    it("should match snapshot", () => {
      expect(screen.toJSON()).toMatchSnapshot();
    });

    it("should render Notifications screen", () => {
      expect(screen.getByText("Notifications Screen")).toBeOnTheScreen();
    });
  });
});
