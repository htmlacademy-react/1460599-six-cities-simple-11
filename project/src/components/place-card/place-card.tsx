import { memo } from 'react';
import { Link } from 'react-router-dom';

import { AppRoute, RATING_MULTIIER_FOR_STYLES } from '../../const';
import { Room } from '../../types/types';

type PlaceCardProps = {
  room: Room;
  onPlaceCardMouseOver?: () => void;
  onPlaceCardMouseOut?: () => void;
};

function PlaceCard(props: PlaceCardProps): JSX.Element {
  const { id, images, price, rating, title, type, isPremium } = props.room;
  const { onPlaceCardMouseOver, onPlaceCardMouseOut } = props;

  return (
    <article
      className="cities__card place-card"
      onMouseOver={() => {if (onPlaceCardMouseOver) {onPlaceCardMouseOver();} } }
      onMouseOut={() => {if (onPlaceCardMouseOut) {onPlaceCardMouseOut();} } }
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`${AppRoute.Room}/${id}`}>
          <img className="place-card__image" src={images[0]} width="260" height="200" alt="Place" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${Math.round(rating) * RATING_MULTIIER_FOR_STYLES}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Room}/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default memo(PlaceCard);

