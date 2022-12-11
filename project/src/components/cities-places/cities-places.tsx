import PlacesSort from '../places-sort/places-sort';
import PlaceCardsList from '../place-cards-list/place-cards-list';
import { Room } from '../../types/types';
import { SortOptions } from '../../const';
import { useAppSelector } from '../../hooks';
import { getCurrentSortOption } from '../../store/room-process/selectors';

type CitiesPlacesType = {
  currentCityRooms: Room[];
}

function CitiesPlaces({currentCityRooms}: CitiesPlacesType) {

  const curretSortOption = useAppSelector(getCurrentSortOption);
  let sortedCurrentCityRooms: Room[] = [];

  if (currentCityRooms) {
    const forSortRooms = [...currentCityRooms];
    switch (curretSortOption) {
      case SortOptions.LowToHigh:
        sortedCurrentCityRooms = [...forSortRooms.sort((a, b) => a.price - b.price)];
        break;
      case SortOptions.HighToLow:
        sortedCurrentCityRooms = [...forSortRooms.sort((a, b) => b.price - a.price)];
        break;
      case SortOptions.TopRatedFirst:
        sortedCurrentCityRooms = [...forSortRooms.sort((a, b) => b.rating - a.rating)];
        break;
      default:
        sortedCurrentCityRooms = [...forSortRooms];
        break;
    }
  }

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
