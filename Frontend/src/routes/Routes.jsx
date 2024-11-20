import {
  BrowserRouter as Router,
  Route,
  Routes,
  HashRouter
  //Navigate
} from "react-router-dom";
import { basicRoutes, authenticationRoutes, protectedRoutes } from "./index";
import PrimaryLayout from "../components/layout/PrimaryLayout";
import AuthenticationLayout from "../components/layout/AuthenticationLayout";
import ProtectedRoute from "../authGuard/ProtectedRoute";
import NotFound from "../components/notFound";

const childRoutes = (Layout, routes) => {
  return routes.map(({ children, path, component: Component, name }, index) => {
    return children ? (
      // Route item with children
      children.map(({ path, component: Component, name }, index) => {
        return (
          <Route
            key={index}
            path={path}
            element={
              <Layout>
                <Component ComponentName={name} />
              </Layout>
            }
          />
        );
      })
    ) : (
      // Route item without children
      <Route
        key={index}
        path={path}
        element={
          <Layout>
            <Component ComponentName={name} />
          </Layout>
        }
      />
    );
  });
};

const protectedChildRoutes = (Layout, routes) => {
  return (routes.map(({ children, path, component: Component, name, isAdmin }, index) => {
    return (children ? (
      // Route item with children
      children.map(({ path, component: Component, name }, index) => {
        return (<Route
          key={index}
          path={path}
          element={
            <ProtectedRoute>
              <Layout>
                <Component ComponentName={name} />
              </Layout>
            </ProtectedRoute>
          }
        />);
      })
    ) : (
      // Route item without children
      <Route
        key={index}
        path={path}
        element={
          <ProtectedRoute>
            <Layout>
              <Component ComponentName={name} />
            </Layout>
          </ProtectedRoute>
        }
      />
    ));
  })
  )
};

const AppRoutes = () => {
  return (
    < HashRouter hashType = "hashbang">
      <Routes>
        {childRoutes(PrimaryLayout, basicRoutes)}
        {childRoutes(AuthenticationLayout, authenticationRoutes)}
        {protectedChildRoutes(PrimaryLayout, protectedRoutes)}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
};

export default AppRoutes;
