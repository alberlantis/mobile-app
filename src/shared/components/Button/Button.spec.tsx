import { fireEvent, render, screen } from "@testing-library/react-native";
import { StyleSheet } from "react-native";

import s from "./Button.style";
import Button, { type IButtonProps } from "./Button";

const renderComponent = (props: IButtonProps) => {
  render(<Button {...props} />);
};

const mockOnPress = jest.fn();

describe("Button", () => {
  it("should render primary large button", () => {
    renderComponent({
      theme: "primary",
      size: "large",
      text: "primary large",
      onPress: mockOnPress,
    });

    const button = screen.getByTestId("button-pressable-id");
    expect(screen.toJSON()).toMatchSnapshot();
    expect(screen.getByText("primary large")).toBeOnTheScreen();
    expect(button).toBeOnTheScreen();
    expect(button).toHaveStyle(
      StyleSheet.flatten([
        s.container,
        { width: 300, height: 50 },
        { marginTop: undefined, marginBottom: undefined },
      ]),
    );
  });

  it("should render primary extra-large button", () => {
    renderComponent({
      theme: "primary",
      size: "extra-large",
      text: "primary large",
      onPress: mockOnPress,
    });

    const button = screen.getByTestId("button-pressable-id");
    expect(screen.toJSON()).toMatchSnapshot();
    expect(screen.getByText("primary large")).toBeOnTheScreen();
    expect(button).toBeOnTheScreen();
    expect(button).toHaveStyle(
      StyleSheet.flatten([
        s.container,
        { width: "100%", height: 50 },
        { marginTop: undefined, marginBottom: undefined },
      ]),
    );
  });

  it("should render secondary large button", () => {
    renderComponent({
      theme: "secondary",
      size: "large",
      text: "secondary large",
      onPress: mockOnPress,
    });

    const button = screen.getByTestId("button-pressable-id");
    expect(screen.toJSON()).toMatchSnapshot();
    expect(screen.getByText("secondary large")).toBeOnTheScreen();
    expect(button).toBeOnTheScreen();
    expect(button).toHaveStyle(
      StyleSheet.flatten([
        s.container,
        { width: 300, height: 50 },
        { marginTop: undefined, marginBottom: undefined },
      ]),
    );
  });

  it("should render secondary extra-large button", () => {
    renderComponent({
      theme: "secondary",
      size: "extra-large",
      text: "secondary large",
      onPress: mockOnPress,
    });

    const button = screen.getByTestId("button-pressable-id");
    expect(screen.toJSON()).toMatchSnapshot();
    expect(screen.getByText("secondary large")).toBeOnTheScreen();
    expect(button).toBeOnTheScreen();
    expect(button).toHaveStyle(
      StyleSheet.flatten([
        s.container,
        { width: "100%", height: 50 },
        { marginTop: undefined, marginBottom: undefined },
      ]),
    );
  });

  it("should trigger onPress when is tapped", () => {
    renderComponent({
      theme: "primary",
      size: "large",
      text: "secondary large",
      onPress: mockOnPress,
    });
    const button = screen.getByTestId("button-pressable-id");
    fireEvent.press(button);
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
