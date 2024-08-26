import { render, screen } from "@testing-library/react-native";
import { Text } from "react-native";

import DefaultBackground, { BlurPosition } from "./DefaultBackground";

const renderComponent = (position?: BlurPosition) => {
  render(
    <DefaultBackground blurPos={position} style={{ width: 80, height: 80 }}>
      <Text>Background children</Text>
    </DefaultBackground>,
  );
};

describe("DefaultBackground", () => {
  it("should render children with blur position at center on the screen", () => {
    renderComponent();
    expect(screen.toJSON()).toMatchSnapshot();
    expect(screen.getByText("Background children")).toBeOnTheScreen();
  });

  it("should render children with blur position at top on the screen", () => {
    renderComponent("top");
    expect(screen.toJSON()).toMatchSnapshot();
    expect(screen.getByText("Background children")).toBeOnTheScreen();
  });

  it("should render children with blur position at bottom on the screen", () => {
    renderComponent("bottom");
    expect(screen.toJSON()).toMatchSnapshot();
    expect(screen.getByText("Background children")).toBeOnTheScreen();
  });
});
