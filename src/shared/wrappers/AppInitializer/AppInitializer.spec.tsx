import React from "react";
import { render, waitFor, screen } from "@testing-library/react-native";
import { Text } from "react-native";
import AppInitializer from "./AppInitializer";

let resolvePromise: (value?: boolean) => void;
const mockPromise = new Promise((resolve: (value?: boolean) => void) => {
  resolvePromise = resolve;
});
const mockHidePlash = jest.fn();
jest.mock("src/shared/hooks", () => ({
  useSplash: jest.fn(() => ({
    prepareSplash: jest.fn().mockResolvedValue(mockPromise),
    hideSplash: mockHidePlash,
  })),
}));

describe("AppInitializer", () => {
  const renderComponent = () => {
    render(
      <AppInitializer>
        <Text>App</Text>
      </AppInitializer>,
    );
  };

  it("should render null initially and then should render children", async () => {
    renderComponent();

    expect(screen.toJSON()).toBeNull();
    expect(screen.toJSON()).toMatchSnapshot();

    await waitFor(async () => {
      resolvePromise();
    });

    await waitFor(() => {
      expect(screen.getByText("App")).toBeOnTheScreen();
      expect(screen.toJSON()).toMatchSnapshot();
    });
  });

  it("should hide splash screen when all data is fetched and layout is ready", async () => {
    renderComponent();

    await waitFor(async () => {
      resolvePromise();
    });

    await waitFor(async () => {
      const safeAreaView = screen.getByTestId("app-initializer-container-id");
      safeAreaView.props.onLayout();

      await waitFor(() => {
        expect(mockHidePlash).toHaveBeenCalledTimes(1);
      });
    });
  });
});
