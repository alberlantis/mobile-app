import { fireEvent, render, screen } from "@testing-library/react-native";

import type { IconProps } from "../Icon";
import colors from "src/theme/colors";
import BackButton from "./BackButton";

jest.mock("../Icon", () => {
  const { Text } =
    jest.requireActual<typeof import("react-native")>("react-native");
  return function MockIcon(props: IconProps<"Entypo">) {
    return <Text {...props}>{props.name}</Text>;
  };
});

const mockNavigation = {
  goBack: jest.fn(),
};
jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(() => mockNavigation),
}));

describe("BackButton", () => {
  beforeEach(() => {
    render(<BackButton />);
  });

  it("should render back button", () => {
    const button = screen.getByText("chevron-thin-left");
    expect(screen.toJSON()).toMatchSnapshot();
    expect(button).toBeOnTheScreen();
    expect(button).toHaveProp("color", colors.WHITE);
    expect(button).toHaveProp("type", "Entypo");
  });

  it("should navigate go back when tapped", () => {
    const button = screen.getByText("chevron-thin-left");
    fireEvent.press(button);
    expect(mockNavigation.goBack).toHaveBeenCalledTimes(1);
  });
});
