import { render, screen } from "@testing-library/react-native";
import { Platform } from "react-native";

import LogoTitle from "./LogoTitle";
import s from "./LogoTitle.style";

jest.mock("src/shared/hooks", () => ({
  useImageAssets: () => ({
    images: {
      logo: "logo_image",
    },
  }),
}));

describe("LogoTitle", () => {
  describe("general functionality", () => {
    beforeEach(() => {
      Platform.OS = "ios";
      render(<LogoTitle title="test-title" />);
    });

    it("should match snapshot", () => {
      expect(screen.toJSON()).toMatchSnapshot();
    });

    it("should render logo image", () => {
      const image = screen.getByTestId("logo-title-image-id");
      expect(image).toBeOnTheScreen();
      expect(image).toHaveProp("source", "logo_image");
      expect(image).toHaveStyle(s.image);
    });

    it("should render logo without top margin when iOS", () => {
      const container = screen.getByTestId("logo-title-container-id");
      expect(container).toBeOnTheScreen();
      expect(container).toHaveStyle({
        ...s.container,
        marginTop: 0,
      });
    });
  });

  describe("when is android", () => {
    beforeEach(() => {
      Platform.OS = "android";
      render(<LogoTitle title="test-title" />);
    });

    it("should match snapshot", () => {
      expect(screen.toJSON()).toMatchSnapshot();
    });

    it("should render logo with top margin", () => {
      const container = screen.getByTestId("logo-title-container-id");
      expect(container).toBeOnTheScreen();
      expect(container).toHaveStyle({
        ...s.container,
        marginTop: 56,
      });
    });
  });
});
