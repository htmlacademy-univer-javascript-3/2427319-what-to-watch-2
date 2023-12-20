import { Navigate } from 'react-router-dom';
import { FC } from 'react';
import { RouteLinks } from './consts';

interface PrivateRouteProps {
  children: React.ReactElement;
  hasAccess?: boolean;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ children, hasAccess = false }) => hasAccess ? children : <Navigate to={RouteLinks.LOGIN} />;

export default PrivateRoute;
