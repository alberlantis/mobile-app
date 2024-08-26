import { fireEvent, render, screen } from "@testing-library/react-native";

import InteractiveText from "./InteractiveText";
import colors from "src/theme/colors";
import s from "./InteractiveText.style";

const mockOnPress = jest.fn();

describe("InteractiveText", () => {
  describe("general functionality", () => {
    beforeEach(() => {
      render(
        <InteractiveText
          onPress={mockOnPress}
          prefix="prefix-test"
          text="text-test"
        />,
      );
    });

    it("should match snapshot", () => {
      expect(screen.toJSON()).toMatchSnapshot();
    });

    it("should render interactive text with default white color", () => {
      const prefixAndMain = screen.getByText("prefix-test text-test");
      const mainText = screen.getByText("text-test");
      expect(prefixAndMain).toBeOnTheScreen();
      expect(prefixAndMain).toHaveStyle({
        ...s.container,
        color: colors.WHITE_BOLD,
      });
      expect(mainText).toBeOnTheScreen();
      expect(mainText).toHaveStyle({
        ...s.interactiveText,
        color: colors.WHITE,
      });
    });

    it("should trigger onPress when tapped", () => {
      const mainText = screen.getByText("text-test");
      fireEvent.press(mainText);
      expect(mockOnPress).toHaveBeenCalledTimes(1);
    });
  });

  describe("when color prop is given", () => {
    beforeEach(() => {
      render(
        <InteractiveText
          onPress={mockOnPress}
          prefix="prefix-test"
          text="text-test"
          color={colors.BLACK}
        />,
      );
    });

    it("should match snapshot", () => {
      expect(screen.toJSON()).toMatchSnapshot();
    });

    it("should render interactive text with given color", () => {
      const prefixAndMain = screen.getByText("prefix-test text-test");
      expect(prefixAndMain).toBeOnTheScreen();
      expect(prefixAndMain).toHaveStyle({
        ...s.container,
        color: colors.WHITE_BOLD,
      });
    });
  });
});
