import { SyntheticEvent, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../../components/header/header';
import { AppRoute, AuthorizationStatus, Cities } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loginAction } from '../../store/api-actions';
import { setSelectedCity } from '../../store/room-process/room-process';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

function LoginScreen() {

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      navigate(AppRoute.Root);
    }
  }, [authorizationStatus]);

  const email = useRef<HTMLInputElement | null>(null);
  const password = useRef<HTMLInputElement | null>(null);

  const validatePassword = () => {
    if (password.current?.value.search(/[0-9]/) === -1) { return false; }
    if (password.current?.value.search(/[a-zA-Z]/) === -1) { return false; }
    return true;
  };

  const handleFormSubmit = (evt: SyntheticEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (email.current !== null && password.current !== null) {
      if (!validatePassword()) {
        toast.warn('The password must contain at least one letter and one number.');
        return;
      }
      dispatch(loginAction({
        login: email.current.value,
        password: password.current.value
      }));
    }
  };

  const handleCityButtonClick = (city: string) => {
    dispatch(setSelectedCity(city));
  };

  const cityArray = Object.values(Cities);
  const randomCity = cityArray[Math.floor(Math.random() * cityArray.length)];

  return (
    <div className="page page--gray page--login">
      <Header />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form onSubmit={handleFormSubmit} className="login__form form">

              <div className="login__input-wrapper form__input-wrapper">
                <label htmlFor='email' className="visually-hidden">E-mail</label>
                <input
                  ref={email}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  id='email'
                  data-testid="email"
                  required
                />
              </div>

              <div className="login__input-wrapper form__input-wrapper">
                <label htmlFor='pass' className="visually-hidden">Password</label>
                <input
                  ref={password}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  id='pass'
                  data-testid="password"
                  required
                />
              </div>

              <button className="login__submit form__submit button" type="submit">Sign in</button>

            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">

              <Link className="locations__item-link" to={AppRoute.Root} onClick={() => {handleCityButtonClick(randomCity);}} data-testid="location-item-element">
                <span>{randomCity}</span>
              </Link>

            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginScreen;
