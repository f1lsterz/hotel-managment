import RegistrationPage from "./pages/Registration";
import {
  HOME_ROUTE,
  PROFILE_ROUTE,
  REGISTRATION_ROUTE,
} from "./utils/constants/routes";

export const publicRoutes: Array<{ path: string; Component: JSX.Element }> = [
  {
    path: REGISTRATION_ROUTE,
    Component: <RegistrationPage />,
  },
];
