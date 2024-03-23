import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const Layout = ({ isAuthenticated, child }) => {
  return isAuthenticated ? (
    <PrivateRoute child={child} />
  ) : (
    <PublicRoute child={child} />
  );
};

export default Layout;
