import React from "react";
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";

import HomeTabs from "./HomeTabs";

jest.mock("./TabIcon", () => {
  const { Text } =
    jest.requireActual<typeof import("react-native")>("react-native");
  return function MockTabIcon({ route }: { route: string }) {
    return <Text>{`TabIcon-${route}`}</Text>;
  };
});
jest.mock("src/screens", () => {
  const { Text } =
    jest.requireActual<typeof import("react-native")>("react-native");
  return {
    Home: () => <Text>Home Screen</Text>,
    ProfileHome: () => <Text>ProfileHome Screen</Text>,
    Posting: () => <Text>Posting Screen</Text>,
    Notifications: () => <Text>Notifications Screen</Text>,
    Location: () => <Text>Location Screen</Text>,
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

    it("should render 5 bottom buttons", () => {
      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(5);
    });

    it("should render initial route Home screen", () => {
      expect(screen.getByText("Home Screen")).toBeOnTheScreen();
    });
  });

  describe("when navigate to ProfileHome", () => {
    beforeEach(() => {
      waitFor(() => {
        render(
          <NavigationContainer>
            <HomeTabs />
          </NavigationContainer>,
        );
        const button = screen.getAllByRole("button")[4];
        fireEvent.press(button);
      });
    });

    it("should match snapshot", () => {
      expect(screen.toJSON()).toMatchSnapshot();
    });

    it("should render ProfileHome screen", () => {
      expect(screen.getByText("ProfileHome Screen")).toBeOnTheScreen();
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
        const button = screen.getAllByRole("button")[2];
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

  describe("when navigate to Location", () => {
    beforeEach(() => {
      waitFor(() => {
        render(
          <NavigationContainer>
            <HomeTabs />
          </NavigationContainer>,
        );
        const button = screen.getAllByRole("button")[1];
        fireEvent.press(button);
      });
    });

    it("should match snapshot", () => {
      expect(screen.toJSON()).toMatchSnapshot();
    });

    it("should render Location screen", () => {
      expect(screen.getByText("Location Screen")).toBeOnTheScreen();
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
        const button = screen.getAllByRole("button")[3];
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
