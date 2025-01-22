import Authorization from "./pages/Authorization";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Registration from "./pages/Registration";
import Room from "./pages/Room";
import Rooms from "./pages/Rooms";
import {
  AUTHORIZATION_ROUTE,
  HOME_ROUTE,
  PROFILE_ROUTE,
  REGISTRATION_ROUTE,
  ROOMS_ROUTE,
} from "./utils/constants/routes";

export const publicRoutes: Array<{ path: string; Component: JSX.Element }> = [
  {
    path: REGISTRATION_ROUTE,
    Component: <Registration />,
  },
  {
    path: AUTHORIZATION_ROUTE,
    Component: <Authorization />,
  },
  {
    path: HOME_ROUTE,
    Component: <Home />,
  },
  {
    path: ROOMS_ROUTE,
    Component: <Rooms />,
  },
  {
    path: ROOMS_ROUTE + "/:roomId",
    Component: <Room />,
  },
];

export const authRoutes: Array<{ path: string; Component: JSX.Element }> = [
  {
    path: PROFILE_ROUTE,
    Component: <Profile />,
  },
];
