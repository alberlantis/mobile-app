import React from "react";
import { render, waitFor, screen } from "@testing-library/react-native";
import { Text } from "react-native";
import AppInitializer from "./AppInitializer";

let resolveSplashPromise: (value?: boolean) => void;
const mockPrepareSplashPromise = new Promise(
  (resolve: (value?: boolean) => void) => {
    resolveSplashPromise = resolve;
  },
);
let resolvePreloadImageAssetsPromse: (value?: boolean) => void;
const mockPreloadImageAssetsPromise = new Promise(
  (resolve: (value?: boolean) => void) => {
    resolvePreloadImageAssetsPromse = resolve;
  },
);
const mockPreloadImageAssets = jest
  .fn()
  .mockResolvedValue(mockPreloadImageAssetsPromise);
const mockPrepareSplash = jest.fn().mockResolvedValue(mockPrepareSplashPromise);
const mockHidePlash = jest.fn();
jest.mock("src/shared/hooks", () => ({
  useSplash: jest.fn(() => ({
    prepareSplash: mockPrepareSplash,
    hideSplash: mockHidePlash,
  })),
  useImageAssets: jest.fn(() => ({
    preloadImagesAssets: mockPreloadImageAssets,
  })),
}));

describe("AppInitializer", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

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
      resolvePreloadImageAssetsPromse();
      resolveSplashPromise();
    });

    await waitFor(() => {
      expect(screen.getByText("App")).toBeOnTheScreen();
      expect(screen.toJSON()).toMatchSnapshot();
    });
  });

  it("should prepare splash when initialize app", async () => {
    renderComponent();

    await waitFor(() => {
      expect(mockPrepareSplash).toHaveBeenCalledTimes(1);
    });
  });

  it("should prepare image assets when initialize app", async () => {
    renderComponent();

    await waitFor(() => {
      expect(mockPreloadImageAssets).toHaveBeenCalledTimes(1);
    });
  });

  it("should hide splash screen when all data is fetched and layout is ready", async () => {
    renderComponent();

    await waitFor(async () => {
      resolvePreloadImageAssetsPromse();
      resolveSplashPromise();
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
