import { Navigate } from "react-router-dom";
import { useUserStore } from "../stores/user";
import { ReactNode } from "react";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const isAuth = useUserStore((state) => state.isAuth);

  return isAuth ? <>{children}</> : <Navigate to="/authorization" replace />;
};

export default PrivateRoute;
