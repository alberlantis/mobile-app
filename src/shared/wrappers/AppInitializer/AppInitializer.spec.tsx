import React from "react";
import { render, waitFor, screen } from "@testing-library/react-native";
import { Text } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import AppInitializer from "./AppInitializer";

jest.mock("expo-splash-screen", () => ({
  preventAutoHideAsync: jest.fn().mockResolvedValueOnce(undefined),
  hideAsync: jest.fn().mockResolvedValueOnce(undefined),
}));

describe("AppInitializer", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  const renderComponent = () => {
    render(
      <AppInitializer>
        <Text>App</Text>
      </AppInitializer>,
    );
  };
  const mockConsoleLog = jest.spyOn(console, "error");
  let resolvePromise: (value?: boolean) => void;
  let rejectPromise: (reason: string) => void;

  beforeEach(() => {
    const mockPromise = new Promise(
      (resolve: (value?: boolean) => void, reject) => {
        resolvePromise = resolve;
        rejectPromise = reject;
      },
    );
    (SplashScreen.preventAutoHideAsync as jest.Mock).mockReturnValueOnce(
      mockPromise,
    );
  });

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

  it("should prevent splash screen to hide", async () => {
    renderComponent();

    await waitFor(() => {
      expect(SplashScreen.preventAutoHideAsync).toHaveBeenCalledTimes(1);
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
        expect(SplashScreen.hideAsync).toHaveBeenCalledTimes(1);
      });
    });
  });

  it("should trigger console error with correct error when prevent splash to hide failed", async () => {
    const error = "Prevent Hide failed with unknown error";
    renderComponent();

    await waitFor(async () => {
      rejectPromise(error);
    });

    expect(mockConsoleLog).toHaveBeenCalledTimes(1);
    expect(mockConsoleLog).toHaveBeenCalledWith(
      "App Initialize failed: ",
      error,
    );
  });
});
