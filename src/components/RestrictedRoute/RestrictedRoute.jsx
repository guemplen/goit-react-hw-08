import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RestrictedRoute = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  return !isLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
};

export default RestrictedRoute;
