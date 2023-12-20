import React, { useCallback, useMemo } from 'react';
import { Logo } from '../logo';
import { Link } from 'react-router-dom';
import { RouteLinks } from '../../router/consts';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { ReducerName } from '../../types/reducer-name';
import { AuthorizationStatus } from '../../types/authorization-status';
import { logout } from '../../store/api-actions';

const enum ImgStyles {
  WIDTH = 63,
  HEIGHT = 63,
}

interface HeaderProps {
  children?: React.ReactNode;
  className?: string;
  isLoginPage?: boolean;
}

const HeaderComponent: React.FC<HeaderProps> = ({
  children,
  className = '',
  isLoginPage = false,
}) => {
  const authorizationStatus = useAppSelector(
    (state) => state[ReducerName.Authorzation].authorizationStatus
  );
  const user = useAppSelector((state) => state[ReducerName.Authorzation].user);

  const hasAccess = authorizationStatus === AuthorizationStatus.AUTHORIZED;

  const dispatch = useAppDispatch();

  const handleClick = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const loginLogoutButton = useMemo(
    () =>
      hasAccess ? (
        <Link
          to={RouteLinks.MAIN}
          onClick={handleClick}
          className="user-block__link"
        >
          Sign out
        </Link>
      ) : (
        <Link to={RouteLinks.LOGIN} className="user-block__link">
          Sign in
        </Link>
      ),
    [handleClick, hasAccess]
  );

  return (
    <header className={`page-header ${className}`}>
      <Logo />

      {children}

      {!isLoginPage && (
        <ul className="user-block">
          {hasAccess && (
            <li className="user-block__item">
              <div className="user-block__avatar">
                <img
                  src={user?.avatarUrl}
                  alt={user?.name}
                  width={ImgStyles.WIDTH}
                  height={ImgStyles.HEIGHT}
                />
              </div>
            </li>
          )}
          <li className="user-block__item">{loginLogoutButton}</li>
        </ul>
      )}
    </header>
  );
};

export const Header = React.memo(HeaderComponent);
