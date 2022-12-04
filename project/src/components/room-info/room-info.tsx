import { RATING_MULTIIER_FOR_STYLES } from '../../consts';
import { Room } from '../../types/types';

type RoomInfoType = {
  roomData: Room;
}

function RoomInfo({roomData}: RoomInfoType) {
  return (
    <>
      {roomData.isPremium && (
        <div className="property__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="property__name-wrapper">
        <h1 className="property__name">
          {roomData.title}
        </h1>
      </div>
      <div className="property__rating rating">
        <div className="property__stars rating__stars">
          <span style={{width: `${roomData.rating * RATING_MULTIIER_FOR_STYLES}%`}}></span>
          <span className="visually-hidden">Rating</span>
        </div>
        <span className="property__rating-value rating__value">{roomData.rating}</span>
      </div>
      <ul className="property__features">
        <li className="property__feature property__feature--entire">
          {roomData.type}
        </li>
        <li className="property__feature property__feature--bedrooms">
          {roomData.bedrooms} Bedrooms
        </li>
        <li className="property__feature property__feature--adults">
                Max {roomData.maxAdults} adults
        </li>
      </ul>
      <div className="property__price">
        <b className="property__price-value">&euro;{roomData.price}</b>
        <span className="property__price-text">&nbsp;night</span>
      </div>
      <div className="property__inside">
        <h2 className="property__inside-title">What&apos;s inside</h2>
        <ul className="property__inside-list">
          {roomData.goods.map((good) => (
            <li key={good} className="property__inside-item">
              {good}
            </li>
          ))}
        </ul>
      </div>
      <div className="property__host">
        <h2 className="property__host-title">Meet the host</h2>
        <div className="property__host-user user">
          <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
            <img className="property__avatar user__avatar" src={roomData.host.avatarUrl} width="74" height="74" alt="Host avatar" />
          </div>
          <span className="property__user-name">
            {roomData.host.name}
          </span>
          {roomData.host.isPro && (
            <span className="property__user-status">
                    Pro
            </span>
          )}
        </div>
        <div className="property__description">
          <p className="property__text">
            {roomData.description}
          </p>
        </div>
      </div>
    </>
  );
}

export default RoomInfo;
