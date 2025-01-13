import { HOME_ROUTE, PROFILE_ROUTE } from "./utils/constants/routes";

export const publicRoutes: Array<{ path: string; Component: JSX.Element }> = [
  {
    path: PROFILE_ROUTE + "/userId",
    Component: <Profile />,
  },
  {
    path: HOME_ROUTE,
    Component: <Main />,
  },
];
