import { fireEvent, render, screen } from "@testing-library/react-native";

import { SCREENS } from "src/navigation/routes";
import NostrUp from "./NostrUp";

jest.mock("src/shared/components", () => {
  const { Text } =
    jest.requireActual<typeof import("react-native")>("react-native");
  return {
    DefaultBackground: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
    Button: ({ text, onPress }: { text: string; onPress(): void }) => (
      <Text onPress={onPress}>{`${text}-button`}</Text>
    ),
    LogoTitle: ({ title }: { title: string }) => (
      <Text>{`${title}-title`}</Text>
    ),
    Input: ({ placeholder, label }: { placeholder: string; label: string }) => (
      <>
        {!!label && <Text>{`${label}-label`}</Text>}
        <Text>{`${placeholder}-placeholder`}</Text>
      </>
    ),
  };
});

const mockNavigation: any = {
  navigate: jest.fn(),
};
const mockRoute: any = {
  name: "NostrUp",
};

describe("NostrUp", () => {
  beforeEach(() => {
    render(<NostrUp navigation={mockNavigation} route={mockRoute} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should match snapshot", () => {
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it("should render logo title", () => {
    expect(screen.getByText("Sign Up-title")).toBeOnTheScreen();
  });

  it("should render username input with label", () => {
    expect(screen.getByText("Username-label")).toBeOnTheScreen();
    expect(
      screen.getByText("Enter your username-placeholder"),
    ).toBeOnTheScreen();
  });

  it("should render Next button", () => {
    expect(screen.getByText("Next-button")).toBeOnTheScreen();
  });

  it("should navigate to HomeTabs when tapped", () => {
    const button = screen.getByText("Next-button");
    fireEvent.press(button);
    expect(mockNavigation.navigate).toHaveBeenCalledTimes(1);
    expect(mockNavigation.navigate).toHaveBeenCalledWith(SCREENS.HOME_TABS);
  });
});
