import { HOME_ROUTE, PROFILE_ROUTE } from "./utils/constants/routes";

export const publicRoutes = [
  {
    path: PROFILE_ROUTE + "/userId",
    Component: <Profile />,
  },
  {
    path: HOME_ROUTE,
    Component: <Main />,
  },
];
