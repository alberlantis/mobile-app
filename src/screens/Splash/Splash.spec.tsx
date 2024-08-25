import React from "react";
import { render, screen } from "@testing-library/react-native";

import s from "./Splash.style";
import { SCREENS } from "src/navigation/routes";
import Splash from "./Splash";

jest.useFakeTimers();
jest.mock("src/shared/hooks", () => ({
  useImageAssets: jest.fn(() => ({
    images: {
      splash: {
        testUri: "../../../assets/splash/splash.png",
      },
    },
  })),
}));

const mockNavigation: any = {
  navigate: jest.fn(),
};
const mockRoute: any = {};
const setTimeoutSpy = jest.spyOn(global, "setTimeout");
const clearTimeoutSpy = jest.spyOn(global, "clearTimeout");

describe("Splash", () => {
  beforeEach(() => {
    render(<Splash navigation={mockNavigation} route={mockRoute} />);
  });

  it("should render splash image", () => {
    const image = screen.getByTestId("splash-screen-image-id");
    expect(screen.toJSON()).toMatchSnapshot();
    expect(image).toHaveProp("source", {
      testUri: "../../../assets/splash/splash.png",
    });
    expect(image).toHaveStyle(s.image);
    expect(image).toBeOnTheScreen();
  });

  it("should navigate to Onboarding screen after 3 seconds", () => {
    jest.advanceTimersByTime(3000);
    expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), 3000);
    expect(clearTimeoutSpy).toHaveBeenCalled();
    expect(mockNavigation.navigate).toHaveBeenCalledTimes(1);
    expect(mockNavigation.navigate).toHaveBeenCalledWith(SCREENS.ONBOARDING);
  });
});
