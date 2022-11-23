import { SyntheticEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../consts';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { getUserEmail } from '../../services/user-email';
import { logoutAction } from '../../store/api-actions';

function Header() {

  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const dispatch = useAppDispatch();

  const signOutOnClick = (evt : SyntheticEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  const userEmail = getUserEmail();

  const location = useLocation();

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to={AppRoute.Root} className="header__logo-link header__logo-link--active">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          <nav className="header__nav">
            {authorizationStatus === AuthorizationStatus.Auth ? (
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <div className="header__nav-profile">
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">{userEmail}</span>
                  </div>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="##" onClick={signOutOnClick}>
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            ) : (
              <ul className="header__nav-list">
                { location.pathname !== AppRoute.Login && (
                  <li className="header__nav-item user">
                    <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__login">Sign in</span>
                    </Link>
                  </li>
                ) }
              </ul>
            ) }
            {}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
