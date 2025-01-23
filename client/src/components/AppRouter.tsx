import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import { authRoutes, publicRoutes } from "../routes";
import ErrorPage from "../pages/Error";
import PrivateRoute from "./PrivateRoute";

const AppRouter = () => {
  return (
    <Routes>
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Layout>{Component}</Layout>} />
      ))}

      {authRoutes.map(({ path, Component }) => (
        <Route
          key={path}
          path={path}
          element={
            <PrivateRoute>
              <Layout>{Component}</Layout>
            </PrivateRoute>
          }
        />
      ))}

      <Route path="*" element={<ErrorPage message="Page not found" />} />
    </Routes>
  );
};

export default AppRouter;
