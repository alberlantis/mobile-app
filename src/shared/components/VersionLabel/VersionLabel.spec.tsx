import { render, screen } from "@testing-library/react-native";

import VersionLabel from "./VersionLabel";

jest.mock("expo-application", () => ({
  nativeApplicationVersion: "1.5.24",
  nativeBuildVersion: "23",
}));

const platform = {
  IS_EXPO_GO: false,
};
jest.mock("src/shared/constants/platform", () => platform);

jest.mock("src/shared/constants/env", () => ({
  EXPO_PUBLIC_APP_VERSION: "EXPO_PUBLIC_APP_VERSION",
  EXPO_PUBLIC_BUILD_VERSION: "EXPO_PUBLIC_BUILD_VERSION",
}));

describe("VersionLabel", () => {
  describe("when is bare", () => {
    beforeAll(() => {
      platform.IS_EXPO_GO = false;
    });

    beforeEach(() => {
      render(<VersionLabel />);
    });

    it("should match snapshot", () => {
      expect(screen.toJSON()).toMatchSnapshot();
    });

    it("should render correct app version and build number from native code", () => {
      expect(screen.getByText("1.5.24 (23)")).toBeOnTheScreen();
    });
  });

  describe("when is expo go", () => {
    beforeAll(() => {
      platform.IS_EXPO_GO = true;
    });

    beforeEach(() => {
      render(<VersionLabel />);
    });

    it("should match snapshot", () => {
      expect(screen.toJSON()).toMatchSnapshot();
    });

    it("should render correct app version and build number from env variables", () => {
      expect(
        screen.getByText("EXPO_PUBLIC_APP_VERSION (EXPO_PUBLIC_BUILD_VERSION)"),
      ).toBeOnTheScreen();
    });
  });
});
