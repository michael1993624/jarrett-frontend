import { Navigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";
import { ACCESS_TOKEN } from "../libs/contants";

const PrivateRoute = ({ child }) => {
  const token = localStorage.getItem(ACCESS_TOKEN);

  return token ? (
    <>
      <SideBar />
      <TopBar />
      {child}
    </>
  ) : (
    <Navigate replace to="/signin" />
  );
};

export default PrivateRoute;
