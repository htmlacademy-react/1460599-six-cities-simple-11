import { useAppDispatch } from '../../hooks';

import PlaceCard from '../place-card/place-card';

import { Room } from '../../types/types';
import { setActiveRoomId } from '../../store/action';

type PlaceCardsListProps = {
  rooms: Room[] | null;
}

function PlaceCardsList(props: PlaceCardsListProps) {

  const { rooms } = props;

  const dispatch = useAppDispatch();

  const onPlaceCardMouseHandler = (id: number | null) => {
    dispatch(setActiveRoomId(id));
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {rooms && rooms.map((room) => (
        <PlaceCard
          key={room.id}
          room={room}
          onPlaceCardMouseOver={() => {onPlaceCardMouseHandler(room.id);}}
          onPlaceCardMouseOut={() => {onPlaceCardMouseHandler(null);}}
        />
      )
      )}
    </div>
  );
}

export default PlaceCardsList;
