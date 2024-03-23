import "./App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DashBoard from "./pages/Dashboard";
import Account from "./pages/Account";
import Integrations from "./pages/Integrations";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Layout from "./Layout";
import AuthCallBack from "./pages/AuthCallBack";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/signin"
          element={<Layout isAuthenticated={false} child={<Login />} />}
        />
        <Route
          path="/signup"
          element={<Layout isAuthenticated={false} child={<Signup />} />}
        />
        <Route
          path="/dashboard"
          element={<Layout isAuthenticated={true} child={<DashBoard />} />}
        />
        <Route
          path="/account"
          element={<Layout isAuthenticated={true} child={<Account />} />}
        />
        <Route
          path="/integrations"
          element={<Layout isAuthenticated={true} child={<Integrations />} />}
        />
        <Route
          path="/profile"
          element={<Layout isAuthenticated={true} child={<Profile />} />}
        />
        <Route
          path="/access_token_and_refresh_token"
          element={<AuthCallBack />}
        />
        <Route
          path="*"
          element={<Layout isAuthenticated={true} child={<DashBoard />} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
