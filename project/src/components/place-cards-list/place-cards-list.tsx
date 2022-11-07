import { useState } from 'react';
import { Hotel } from '../../mocks/offer';
import PlaceCard from '../place-card/place-card';

type PlaceCardsListProps = {
  hotels: Hotel[];
}

function PlaceCardsList(props: PlaceCardsListProps) {
  const { hotels } = props;
  const [ , setActiveCard ] = useState<number>();

  return (
    <div className="cities__places-list places__list tabs__content">
      {hotels.map((hotel) => (
        <PlaceCard
          key={hotel.id}
          hotel={hotel}
          onPlaceCardMouseOver={() => {setActiveCard(hotel.id);}}
        />
      )
      )}
    </div>
  );
}

export default PlaceCardsList;
