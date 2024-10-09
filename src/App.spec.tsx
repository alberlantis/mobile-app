// import React from "react";
// import { render, screen } from "@testing-library/react-native";

// import App from "./App";

// jest.mock("redux-persist/integration/react", () => ({
//   PersistGate: ({ children }: { children: React.ReactNode }) => <>{children}</>,
// }));
// jest.mock("./navigation", () => {
//   const { Text } =
//     jest.requireActual<typeof import("react-native")>("react-native");
//   return function Root() {
//     return <Text>Root</Text>;
//   };
// });

// jest.mock("./shared/wrappers", () => ({
//   AppInitializer: ({ children }: { children: React.ReactNode }) => (
//     <>{children}</>
//   ),
//   SatlantisClient: ({ children }: { children: React.ReactNode }) => (
//     <>{children}</>
//   ),
// }));

// jest.mock("./store", () => ({
//   store: {
//     getState: jest.fn(),
//     subscribe: jest.fn(),
//   },
//   persistor: {},
// }));

// describe("App", () => {
//   beforeEach(() => {
//     render(<App />);
//   });

//   it("should match snapshot", () => {
//     expect(screen.toJSON()).toMatchSnapshot();
//   });

//   it("should render Root navigator", () => {
//     expect(screen.getByText("Root")).toBeOnTheScreen();
//   });
// });
it("", () => {});
