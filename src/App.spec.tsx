import { render, screen } from "@testing-library/react-native";

import App from "./App";

describe("App", () => {
  beforeEach(() => {
    render(<App />);
  });

  it("should match snapshot", () => {
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it('should render "Hola Mundo" on the screen', () => {
    expect(screen.getByText("Hola Mundo")).toBeOnTheScreen();
  });
});
