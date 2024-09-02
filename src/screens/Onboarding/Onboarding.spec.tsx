import { fireEvent, render, screen } from "@testing-library/react-native";

import { SCREENS } from "src/navigation/routes";
import Onboarding from "./Onboarding";

jest.mock("src/shared/components", () => {
  const { Text } =
    jest.requireActual<typeof import("react-native")>("react-native");
  return {
    DefaultBackground: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
    Button: ({ text, onPress }: { text: string; onPress(): void }) => (
      <Text onPress={onPress}>{text}</Text>
    ),
    InteractiveText: ({
      text,
      prefix,
      onPress,
    }: {
      text: string;
      prefix: string;
      onPress(): void;
    }) => (
      <Text onPress={onPress}>
        {prefix}
        {text}
      </Text>
    ),
    LogoTitle: ({ title }: { title: string }) => <Text>{title}</Text>,
  };
});

const mockNavigation: any = {
  navigate: jest.fn(),
};
const mockRoute: any = {
  name: "Onboarding",
};

describe("Onboarding", () => {
  beforeEach(() => {
    render(<Onboarding navigation={mockNavigation} route={mockRoute} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should match snapshot", () => {
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it("should render logo title", () => {
    expect(screen.getByText("Sign Up")).toBeOnTheScreen();
  });

  it("should render Using Email button", () => {
    expect(screen.getByText("Using Email")).toBeOnTheScreen();
  });

  it("should navigate to Sign Up when tapped", () => {
    const button = screen.getByText("Using Email");
    fireEvent.press(button);
    expect(mockNavigation.navigate).toHaveBeenCalledTimes(1);
    expect(mockNavigation.navigate).toHaveBeenCalledWith(SCREENS.SIGN_UP);
  });

  it("should render nsec button", () => {
    expect(screen.getByText("Using Nostr")).toBeOnTheScreen();
  });

  it("should navigate to NostrUp when tapped", () => {
    const button = screen.getByText("Using Nostr");
    fireEvent.press(button);
    expect(mockNavigation.navigate).toHaveBeenCalledTimes(1);
    expect(mockNavigation.navigate).toHaveBeenCalledWith(SCREENS.NOSTR_UP);
  });

  it("should render sign in text", () => {
    expect(
      screen.getByText("Already have an account?Sign in"),
    ).toBeOnTheScreen();
  });

  it("should navigate to Login when tapped", () => {
    const button = screen.getByText("Already have an account?Sign in");
    fireEvent.press(button);
    expect(mockNavigation.navigate).toHaveBeenCalledTimes(1);
    expect(mockNavigation.navigate).toHaveBeenCalledWith(SCREENS.LOGIN);
  });
});
