import { Entypo, Feather } from "@expo/vector-icons";
import { render, screen } from "@testing-library/react-native";

import colors from "src/theme/colors";
import Icon, { IconProps, IconNames } from "./Icon";

jest.mock("@expo/vector-icons", () => {
  const { Text } =
    jest.requireActual<typeof import("react-native")>("react-native");
  const Entypo = function (props: IconProps<"Entypo">) {
    return (
      <Text
        style={{ fontSize: props.size, color: props.color }}
      >{`Entypo-icon-${props.name}`}</Text>
    );
  };
  Entypo.glyphMap = {
    entypo1: "entypo1",
    entypo2: "entypo2",
    entypo3: "entypo3",
    entypo4: "entypo4",
  };
  const Feather = function (props: IconProps<"Feather">) {
    return (
      <Text
        style={{ fontSize: props.size, color: props.color }}
      >{`Feather-icon-${props.name}`}</Text>
    );
  };
  Feather.glyphMap = {
    feather1: "feather1",
    feather2: "feather2",
    feather3: "feather3",
    feather4: "feather4",
  };
  return {
    Entypo,
    Feather,
  };
});

const renderComponent = <T extends keyof IconNames>(props: IconProps<T>) => {
  render(<Icon {...props} />);
};

describe("Icon", () => {
  describe("when Entypo Icons", () => {
    it("should render all Entypo icons with default color and size", () => {
      const iconNames = Object.keys(
        Entypo.glyphMap,
      ) as (keyof typeof Entypo.glyphMap)[];
      iconNames.forEach((iconName) => {
        renderComponent<"Entypo">({ type: "Entypo", name: iconName });
        const icon = screen.getByText(`Entypo-icon-${iconName}`);
        expect(screen.toJSON()).toMatchSnapshot();
        expect(icon).toBeOnTheScreen();
        expect(icon).toHaveStyle({
          fontSize: 24,
          color: colors.BLACK,
        });
      });
    });

    it("should render all Entypo icons with given color and size", () => {
      const iconNames = Object.keys(
        Entypo.glyphMap,
      ) as (keyof typeof Entypo.glyphMap)[];
      iconNames.forEach((iconName) => {
        renderComponent<"Entypo">({
          type: "Entypo",
          name: iconName,
          size: 30,
          color: colors.ORANGE_PRIMARY_DARK,
        });
        const icon = screen.getByText(`Entypo-icon-${iconName}`);
        expect(screen.toJSON()).toMatchSnapshot();
        expect(icon).toBeOnTheScreen();
        expect(icon).toHaveStyle({
          fontSize: 30,
          color: colors.ORANGE_PRIMARY_DARK,
        });
      });
    });
  });

  describe("when Feather Icons", () => {
    it("should render all Feather icons with default color and size", () => {
      const iconNames = Object.keys(
        Feather.glyphMap,
      ) as (keyof typeof Feather.glyphMap)[];
      iconNames.forEach((iconName) => {
        renderComponent<"Feather">({ type: "Feather", name: iconName });
        const icon = screen.getByText(`Feather-icon-${iconName}`);
        expect(screen.toJSON()).toMatchSnapshot();
        expect(icon).toBeOnTheScreen();
        expect(icon).toHaveStyle({
          fontSize: 24,
          color: colors.BLACK,
        });
      });
    });

    it("should render all Feather icons with given color and size", () => {
      const iconNames = Object.keys(
        Feather.glyphMap,
      ) as (keyof typeof Feather.glyphMap)[];
      iconNames.forEach((iconName) => {
        renderComponent<"Feather">({
          type: "Feather",
          name: iconName,
          size: 30,
          color: colors.ORANGE_PRIMARY_DARK,
        });
        const icon = screen.getByText(`Feather-icon-${iconName}`);
        expect(screen.toJSON()).toMatchSnapshot();
        expect(icon).toBeOnTheScreen();
        expect(icon).toHaveStyle({
          fontSize: 30,
          color: colors.ORANGE_PRIMARY_DARK,
        });
      });
    });
  });
});
