import { useAppDispatch } from '../../hooks';

import PlaceCard from '../place-card/place-card';

import { Room } from '../../types/types';
import { useCallback } from 'react';
import { setActiveRoomId } from '../../store/room-process/room-process';

type PlaceCardsListProps = {
  rooms: Room[] | null;
}

function PlaceCardsList(props: PlaceCardsListProps) {

  const { rooms } = props;

  const dispatch = useAppDispatch();

  const onPlaceCardMouseHandler = useCallback(
    (id: number | null) => {
      dispatch(setActiveRoomId(id));
    },
    [rooms],
  );

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
