import { useEffect, useState } from 'react';

import Header from '../../components/header/header';
import CitiesList from '../../components/cities-list/cities-list';
import CitiesMap from '../../components/cities-map/cities-map';
import CitiesPlaces from '../../components/cities-places/cities-places';
import CitiesNoPlaces from '../../components/cities-no-places/cities-no-paces';
import Loader from '../../components/loader/loader';

import { Room } from '../../types/types';
import { useAppSelector } from '../../hooks';
import { getIsRoomsLoading, getRooms } from '../../store/data-process/selectors';
import { getCurrentCity } from '../../store/room-process/selectors';

function MainScreen() {

  const isRoomsLoading = useAppSelector(getIsRoomsLoading);

  const rooms = useAppSelector(getRooms);
  const currentCity = useAppSelector(getCurrentCity);

  const [currentCityRooms, setCurrentCityRooms] = useState<Room[]>([]);

  useEffect(() => {
    const filteredRooms: Room[] = rooms.filter((room: Room) => room.city.name === currentCity);
    setCurrentCityRooms(filteredRooms);
  }, [currentCity, rooms]);

  return (

    <main className={`page page--gray page--main ${ currentCityRooms.length > 0 ? '' : 'page__main--index-empty'}`}>
      <Header />
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <CitiesList />
        </section>
      </div>

      {isRoomsLoading ? (

        <div style={{height: 'calc(100vh - 186px)', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Loader/>
        </div>

      ) : (

        <div className="cities">

          { currentCityRooms.length > 0 ? (

            <div className="cities__places-container container">
              <CitiesPlaces currentCityRooms={currentCityRooms} />
              <CitiesMap currentCityRooms={currentCityRooms} />
            </div>

          ) : (<CitiesNoPlaces />)}

        </div>

      )}

    </main>
  );
}

export default MainScreen;
