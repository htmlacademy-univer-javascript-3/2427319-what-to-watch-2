import { Navigate } from 'react-router-dom';
import { FC } from 'react';
import { useAppSelector } from '../hooks/store';
import { AuthorizationStatus } from '../types/authorization-status';
import { ReducerName } from '../types/reducer-name';

interface PrivateRouteProps {
  children: React.ReactElement;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
  const authorizationStatus = useAppSelector(
    (state) => state[ReducerName.Authorzation].authorizationStatus
  );
  const hasAccess = authorizationStatus === AuthorizationStatus.AUTHORIZED;

  return hasAccess ? children : <Navigate to={'/login'} />;
};

export default PrivateRoute;
