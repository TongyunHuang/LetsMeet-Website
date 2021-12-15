import { Navigate } from "react-router-dom";

export default function RequireAuth({ children }) {
  const authed = localStorage.getItem('username') !== null

  return authed === true
    ? children
    : <Navigate to="/login" replace />;
}