import { useAppDispatch, useAppSelector } from '../../hooks/index';

import { Cities } from '../../consts';
import { selectCity } from '../../store/action';

function CitiesList() {

  const currentCity = useAppSelector((state) => state.currentCity);
  const dispatch = useAppDispatch();

  const selectCityHandle = (evt: React.SyntheticEvent<HTMLAnchorElement>, city: string) => {
    evt.preventDefault();
    dispatch(selectCity(city));
  };

  return (
    <ul className="locations__list tabs__list">
      { Cities.map((city) => (
        <li key={city} className="locations__item">
          <a
            className={`locations__item-link tabs__item ${city === currentCity ? 'tabs__item--active' : ''}`}
            href="##"
            onClick={(evt) => {selectCityHandle(evt, city);}}
          >
            <span>{city}</span>
          </a>
        </li>
      )
      )}
    </ul>
  );
}

export default CitiesList;
