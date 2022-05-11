import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Login } from "../components";
import { Register } from "../components/register";
import { useAuthStore } from "../stores/auth";
type LocationProps = {
  state: {
    from: Location;
  };
};

export const AuthRoutes = () => {
  const { isAuthorized } = useAuthStore();
  let location = useLocation() as unknown as LocationProps;

  let from = location.state?.from?.pathname || "/";

  return !isAuthorized ? (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Routes>
  ) : (
    <Navigate to={from} />
  );
};
