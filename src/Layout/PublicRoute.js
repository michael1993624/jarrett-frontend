import { Navigate } from "react-router-dom";
import { ACCESS_TOKEN } from "../libs/contants";

const PublicRoute = ({ child }) => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  return token ? <Navigate to="/dashboard" replace /> : child;
};

export default PublicRoute;
