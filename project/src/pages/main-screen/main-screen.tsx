import { useEffect, useState } from 'react';

import Header from '../../components/header/header';
import PlaceCardList from '../../components/place-cards-list/place-cards-list';
import Map from '../../components/map/map';
import CitiesList from '../../components/cities-list/cities-list';

import { Room, Location } from '../../types/types';
import { useAppSelector } from '../../hooks';

function MainScreen() {

  const rooms = useAppSelector((state) => state.rooms);
  const currentCity = useAppSelector((state) => state.currentCity);
  const [currentCityRooms, setCurrentCityRooms] = useState<Room[]>();

  useEffect(() => {
    const filteredRooms = rooms.filter((room) => room.city.name === currentCity);
    setCurrentCityRooms(filteredRooms);
  }, [currentCity, rooms]);

  const [mapPoints, setMapPoints] = useState<Location[]>([]);
  const [currentCityLocation, setCurrentCityLocation] = useState<Location | null>();

  useEffect(() => {
    const points: Location[] = [];
    currentCityRooms?.forEach((room) => points.push(room.location));
    setMapPoints(points);
    if (currentCityRooms && currentCityRooms[0]) {
      setCurrentCityLocation(currentCityRooms[0].city.location);
    } else {
      setCurrentCityLocation(null);
    }
  }, [currentCityRooms]);

  return (
    <main className="page__main page__main--index">

      <Header />

      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">

          <CitiesList />

        </section>
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">
              {currentCityRooms ? currentCityRooms.length : '0'} places to stay in {currentCity}
            </b>
            <form className="places__sorting" action="#" method="get">
              <span className="places__sorting-caption">Sort by</span>
              <span className="places__sorting-type" tabIndex={0}>
                  Popular
                <svg className="places__sorting-arrow" width="7" height="4">
                  <use xlinkHref="#icon-arrow-select"></use>
                </svg>
              </span>
              <ul className="places__options places__options--custom"> {/*places__options--opened */}
                <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                <li className="places__option" tabIndex={0}>Price: low to high</li>
                <li className="places__option" tabIndex={0}>Price: high to low</li>
                <li className="places__option" tabIndex={0}>Top rated first</li>
              </ul>
            </form>

            { currentCityRooms && currentCityRooms.length > 0 ? (
              <PlaceCardList rooms={currentCityRooms} />
            ) : <p>No offefs founded</p>}

          </section>
          <div className="cities__right-section">
            <section className="cities__map map">

              { currentCityRooms && currentCityLocation && <Map city={currentCityLocation} points={mapPoints}></Map>}

            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MainScreen;
