import { useEffect, useState } from 'react';

import Header from '../../components/header/header';
import PlaceCardList from '../../components/place-cards-list/place-cards-list';
import Map from '../../components/map/map';
import CitiesList from '../../components/cities-list/cities-list';
import PlacesSort from '../../components/places-sort/places-sort';

import { Room, Location } from '../../types/types';
import { useAppSelector } from '../../hooks';

import { SORT_OPTIONS } from '../../consts';
import Loader from '../../components/loader/loader';

function MainScreen() {

  const isRoomsLoaded = useAppSelector((state) => state.isRoomsLoaded);

  const rooms = useAppSelector((state) => state.rooms);
  const curretSortOption = useAppSelector((state) => state.currentSortOption);
  const currentCity = useAppSelector((state) => state.currentCity);

  const [currentCityRooms, setCurrentCityRooms] = useState<Room[]>();

  useEffect(() => {
    const filteredRooms: Room[] = rooms.filter((room) => room.city.name === currentCity);
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

  const [sortedCurrentCityRooms, setSortedCurrentCityRooms] = useState<Room[]>();

  useEffect(() => {
    if (currentCityRooms) {
      const arrayForSort = [...currentCityRooms];
      switch (curretSortOption) {
        case SORT_OPTIONS[1]:
          setSortedCurrentCityRooms([...arrayForSort.sort((a, b) => a.price - b.price)]);
          break;
        case SORT_OPTIONS[2]:
          setSortedCurrentCityRooms([...arrayForSort.sort((a, b) => b.price - a.price)]);
          break;
        case SORT_OPTIONS[3]:
          setSortedCurrentCityRooms([...arrayForSort.sort((a, b) => b.rating - a.rating)]);
          break;
        default:
          setSortedCurrentCityRooms([...arrayForSort]);
          break;
      }
    }
  }, [currentCityRooms, curretSortOption]);

  const activeRoomId = useAppSelector((state) => state.activeRoomId);
  const [activeRoomLocation, setActiveRoomLocation] = useState<Location | null>(null);

  useEffect(() => {
    if (activeRoomId) {
      const selectedRoom = currentCityRooms?.find((room) => room.id === activeRoomId);
      if (selectedRoom) {
        setActiveRoomLocation(selectedRoom.location);
      }
    } else {
      setActiveRoomLocation(null);
    }
  }, [activeRoomId, currentCityRooms]);

  return (
    <main className="page page--gray page--main">

      <Header />

      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">

          <CitiesList />

        </section>
      </div>
      {!isRoomsLoaded ? (<Loader/>) : (
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {currentCityRooms ? currentCityRooms.length : '0'} places to stay in {currentCity}
              </b>

              <PlacesSort />

              { sortedCurrentCityRooms && sortedCurrentCityRooms.length > 0 ? (
                <PlaceCardList rooms={sortedCurrentCityRooms} />
              ) : <p>No places to stay available</p>}

            </section>
            <div className="cities__right-section">
              <section className="cities__map map">

                { currentCityRooms && currentCityLocation && <Map city={currentCityLocation} points={mapPoints} selectedPoint={activeRoomLocation}></Map> }

              </section>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}

export default MainScreen;
