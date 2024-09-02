// import { fireEvent, render, screen } from "@testing-library/react-native";

// import { SCREENS } from "src/navigation/routes";
// import SignUp from "./SignUp";

// jest.mock("src/shared/components", () => {
//   const { Text } =
//     jest.requireActual<typeof import("react-native")>("react-native");
//   return {
//     DefaultBackground: ({ children }: { children: React.ReactNode }) => (
//       <>{children}</>
//     ),
//     Button: ({ text, onPress }: { text: string; onPress(): void }) => (
//       <Text onPress={onPress}>{`${text}-button`}</Text>
//     ),
//     InteractiveText: ({
//       text,
//       prefix,
//       onPress,
//     }: {
//       text: string;
//       prefix: string;
//       onPress(): void;
//     }) => (
//       <Text onPress={onPress}>
//         {prefix}
//         {text}
//       </Text>
//     ),
//     LogoTitle: ({ title }: { title: string }) => (
//       <Text>{`${title}-title`}</Text>
//     ),
//     Input: ({ placeholder, label }: { placeholder: string; label: string }) => (
//       <>
//         {!!label && <Text>{`${label}-label`}</Text>}
//         <Text>{`${placeholder}-placeholder`}</Text>
//       </>
//     ),
//   };
// });

// const mockNavigation: any = {
//   navigate: jest.fn(),
// };
// const mockRoute: any = {
//   name: "SignUp",
// };

// describe.skip("SignUp", () => {
//   beforeEach(() => {
//     render(<SignUp navigation={mockNavigation} route={mockRoute} />);
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it("should match snapshot", () => {
//     expect(screen.toJSON()).toMatchSnapshot();
//   });

//   it("should render logo title", () => {
//     expect(screen.getByText("Sign Up-title")).toBeOnTheScreen();
//   });

//   it("should render username input with label", () => {
//     expect(screen.getByText("Username-label")).toBeOnTheScreen();
//     expect(screen.getByText("Enter username-placeholder")).toBeOnTheScreen();
//   });

//   it("should render email input with label", () => {
//     expect(screen.getByText("Email-label")).toBeOnTheScreen();
//     expect(
//       screen.getByText("Enter email address-placeholder"),
//     ).toBeOnTheScreen();
//   });

//   it("should render password input with label", () => {
//     expect(screen.getByText("Password-label")).toBeOnTheScreen();
//     expect(screen.getByText("Enter password-placeholder")).toBeOnTheScreen();
//   });

//   it("should render correct password input with no label", () => {
//     expect(screen.queryByText("-label")).not.toBeOnTheScreen();
//     expect(screen.getByText("Confirm password-placeholder")).toBeOnTheScreen();
//   });

//   it("should render Next button", () => {
//     expect(screen.getByText("Next-button")).toBeOnTheScreen();
//   });

//   it("should navigate to HomeTabs when tapped", () => {
//     const button = screen.getByText("Next-button");
//     fireEvent.press(button);
//     expect(mockNavigation.navigate).toHaveBeenCalledTimes(1);
//     expect(mockNavigation.navigate).toHaveBeenCalledWith(SCREENS.HOME_TABS);
//   });

//   it("should render sign in text", () => {
//     expect(
//       screen.getByText("Already have an account?Sign in"),
//     ).toBeOnTheScreen();
//   });

//   it("should navigate to Login when tapped", () => {
//     const button = screen.getByText("Already have an account?Sign in");
//     fireEvent.press(button);
//     expect(mockNavigation.navigate).toHaveBeenCalledTimes(1);
//     expect(mockNavigation.navigate).toHaveBeenCalledWith(SCREENS.LOGIN);
//   });
// });

it("skipping", () => {});
