import PlacesSort from '../places-sort/places-sort';
import PlaceCardsList from '../place-cards-list/place-cards-list';
import { useEffect, useState } from 'react';
import { Room } from '../../types/types';
import { SORT_OPTIONS } from '../../consts';
import { useAppSelector } from '../../hooks';
import { getCurrentSortOption } from '../../store/room-process/selectors';

type CitiesPlacesType = {
  currentCityRooms: Room[];
}

function CitiesPlaces({currentCityRooms}: CitiesPlacesType) {

  const curretSortOption = useAppSelector(getCurrentSortOption);
  const [sortedCurrentCityRooms, setSortedCurrentCityRooms] = useState<Room[]>([]);

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

  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">
        {currentCityRooms.length} places to stay in {currentCityRooms[0].city.name}
      </b>

      <PlacesSort />
      <PlaceCardsList rooms={sortedCurrentCityRooms} />

    </section>
  );
}

export default CitiesPlaces;
