import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../features/auth/stores/auth";

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  let { isAuthorized } = useAuthStore();
  let location = useLocation();

  
  if (!isAuthorized) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
};
