import { useState } from 'react';
import { Room } from '../../types/types';
import PlaceCard from '../place-card/place-card';

type PlaceCardsListProps = {
  rooms: Room[];
}

function PlaceCardsList(props: PlaceCardsListProps) {
  const { rooms } = props;
  const [ , setActiveCard ] = useState<number>();

  return (
    <div className="cities__places-list places__list tabs__content">
      {rooms.map((room) => (
        <PlaceCard
          key={room.id}
          room={room}
          onPlaceCardMouseOver={() => {setActiveCard(room.id);}}
        />
      )
      )}
    </div>
  );
}

export default PlaceCardsList;
