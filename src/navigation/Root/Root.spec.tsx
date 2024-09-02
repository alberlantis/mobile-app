import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";

import { SCREENS } from "src/navigation/routes";
import Root, { RootScreenProps } from "./Root";

let mockIsLogged = false;
jest.mock("src/store", () => ({
  useAppSelector: jest.fn((selector) => selector()),
  AuthState: {
    selectors: {
      selectIsLogged: jest.fn(() => mockIsLogged),
    },
  },
}));
jest.mock("src/shared/components", () => {
  const { Text } =
    jest.requireActual<typeof import("react-native")>("react-native");
  return {
    BackButton: () => <Text>Back Button</Text>,
  };
});
jest.mock("src/navigation/HomeTabs", () => {
  const { Text } =
    jest.requireActual<typeof import("react-native")>("react-native");
  return function HomeTabs() {
    return <Text>HomeTabs</Text>;
  };
});
jest.mock("src/screens", () => {
  const { Text } =
    jest.requireActual<typeof import("react-native")>("react-native");
  return {
    Onboarding: ({ navigation }: RootScreenProps<"Onboarding">) => (
      <Text onPress={(screen: any) => navigation.navigate(screen)}>
        Onboarding Screen
      </Text>
    ),
    Splash: ({ navigation }: RootScreenProps<"Splash">) => (
      <Text onPress={() => navigation.navigate("HomeTabs")}>Splash Screen</Text>
    ),
    SignUp: () => <Text>SignUp Screen</Text>,
    NostrUp: () => <Text>NostrUp Screen</Text>,
    Login: () => <Text>Login Screen</Text>,
    NostrIn: () => <Text>NostrIn Screen</Text>,
  };
});
const platform = {
  IS_EXPO_GO: false,
};
jest.mock("src/shared/constants/platform", () => platform);

describe("Root", () => {
  describe("when not running in expo go", () => {
    it("should render initial route Onboarding screen", () => {
      render(<Root />);
      expect(screen.toJSON()).toMatchSnapshot();
      expect(screen.getByText("Onboarding Screen")).toBeOnTheScreen();
    });
  });

  describe("when running in expo go", () => {
    afterAll(() => {
      platform.IS_EXPO_GO = false;
    });

    it("should render initial route Onboarding screen", () => {
      platform.IS_EXPO_GO = true;
      render(<Root />);
      expect(screen.toJSON()).toMatchSnapshot();
      expect(screen.getByText("Splash Screen")).toBeOnTheScreen();
    });
  });

  describe("when navigate to Home tabs", () => {
    it("should render Home tabs", () => {
      mockIsLogged = true;
      render(<Root />);
      expect(screen.toJSON()).toMatchSnapshot();
      expect(screen.getByText("HomeTabs")).toBeOnTheScreen();
      mockIsLogged = false;
    });
  });

  describe("when navigate to Sign Up", () => {
    it("should render Sign Up with Back button", () => {
      render(<Root />);
      fireEvent.press(screen.getByText("Onboarding Screen"), SCREENS.SIGN_UP);
      expect(screen.toJSON()).toMatchSnapshot();
      expect(screen.getByText("SignUp Screen")).toBeOnTheScreen();
      expect(screen.getByText("Back Button")).toBeOnTheScreen();
    });
  });

  describe("when navigate to Nostr Up", () => {
    it("should render Nostr Up with Back button", () => {
      render(<Root />);
      fireEvent.press(screen.getByText("Onboarding Screen"), SCREENS.NOSTR_UP);
      expect(screen.toJSON()).toMatchSnapshot();
      expect(screen.getByText("NostrUp Screen")).toBeOnTheScreen();
      expect(screen.getByText("Back Button")).toBeOnTheScreen();
    });
  });

  describe("when navigate to Login", () => {
    it("should render Login with Back button", () => {
      render(<Root />);
      fireEvent.press(screen.getByText("Onboarding Screen"), SCREENS.LOGIN);
      expect(screen.toJSON()).toMatchSnapshot();
      expect(screen.getByText("Login Screen")).toBeOnTheScreen();
      expect(screen.getByText("Back Button")).toBeOnTheScreen();
    });
  });

  describe("when navigate to Nostr In", () => {
    it("should render Login with Back button", () => {
      render(<Root />);
      fireEvent.press(screen.getByText("Onboarding Screen"), SCREENS.NOSTR_IN);
      expect(screen.toJSON()).toMatchSnapshot();
      expect(screen.getByText("NostrIn Screen")).toBeOnTheScreen();
      expect(screen.getByText("Back Button")).toBeOnTheScreen();
    });
  });
});
