import React, { useCallback, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { RouteLinks } from '../../router/consts';
import { logout } from '../../store/api-actions';
import { AuthorizationStatus } from '../../types/authorization-status';
import { HeaderImageStyles } from '../../types/image';
import { ReducerName } from '../../types/reducer-name';
import { Logo } from '../logo';

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
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(
    (state) => state[ReducerName.Authorzation].authorizationStatus
  );
  const user = useAppSelector((state) => state[ReducerName.Authorzation].user);

  const hasAccess = authorizationStatus === AuthorizationStatus.Authorized;

  const dispatch = useAppDispatch();

  const handleClick = useCallback(() => {
    dispatch(logout());
    navigate(RouteLinks.MAIN);
  }, [dispatch, navigate]);

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
              <Link to={RouteLinks.MY_LIST}>
                <div className="user-block__avatar">
                  <img
                    src={user?.avatarUrl}
                    alt={user?.name}
                    width={HeaderImageStyles.Widht}
                    height={HeaderImageStyles.Height}
                  />
                </div>
              </Link>
            </li>
          )}
          <li className="user-block__item">{loginLogoutButton}</li>
        </ul>
      )}
    </header>
  );
};

export const Header = React.memo(HeaderComponent);
