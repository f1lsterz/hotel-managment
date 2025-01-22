import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import { authRoutes, publicRoutes } from "../routes";
import ErrorPage from "../pages/Error";

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
            isAuth ? (
              <Layout>{Component}</Layout>
            ) : (
              <Navigate to="/authorization" replace />
            )
          }
        />
      ))}
      <Route path="*" element={<ErrorPage message="Page not found" />} />
    </Routes>
  );
};

export default AppRouter;
