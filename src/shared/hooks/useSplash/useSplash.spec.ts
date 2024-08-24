import { renderHook, waitFor } from "@testing-library/react-native";
import * as SplashScreen from "expo-splash-screen";
import useSplash from "./useSplash";

jest.mock("expo-splash-screen", () => ({
  preventAutoHideAsync: jest.fn(),
  hideAsync: jest.fn(),
}));

const consoleErrorSpy = jest
  .spyOn(console, "error")
  .mockImplementation(() => {});

describe("useSplash", () => {
  const runHook = () => {
    const {
      result: {
        current: { prepareSplash, hideSplash },
      },
    } = renderHook(useSplash);
    return { prepareSplash, hideSplash };
  };

  describe("when prepareSplash is called", () => {
    it("should prevent splash screen to hide", async () => {
      const { prepareSplash } = runHook();

      prepareSplash();

      await waitFor(() => {
        expect(SplashScreen.preventAutoHideAsync).toHaveBeenCalledTimes(1);
      });
    });

    it("should trigger console error with given error when failed", async () => {
      const error = "Prevent Hide failed with unknown error";
      (SplashScreen.preventAutoHideAsync as jest.Mock).mockRejectedValueOnce(
        error,
      );
      const { prepareSplash } = runHook();
      await prepareSplash();

      expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
      expect(consoleErrorSpy).toHaveBeenCalledWith("Splash Failed: ", error);
    });
  });

  describe("when hidePlash is called", () => {
    it("should hide splash screen", async () => {
      const { hideSplash } = runHook();
      hideSplash();

      await waitFor(() => {
        expect(SplashScreen.hideAsync).toHaveBeenCalledTimes(1);
      });
    });
  });
});
