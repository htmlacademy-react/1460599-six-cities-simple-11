import { useParams } from 'react-router-dom';

import NotFoundScreen from '../not-found-screen/not-found-screen';
import Header from '../../components/header/header';
import ReviewsForm from '../../components/reviews-form/reviews-form';
import ReviewsList from '../../components/reviews-list/reviews-list';
import PlaceCardsList from '../../components/place-cards-list/place-cards-list';
import Map from '../../components/map/map';

import { AuthorizationStatus, RATING_MULTIIER_FOR_STYLES } from '../../consts';
import { fetchRoomByIdAction, fetchRoomByIdComments, fetchRoomByIdNearbyAction } from '../../store/api-actions';

import { Location } from '../../types/types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Loader from '../../components/loader/loader';
import { useEffect, useState } from 'react';

function RoomScreen() {

  const dispatch = useAppDispatch();
  const isRoomLoaded = useAppSelector((state) => state.isRoomLoaded);

  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const numberId = +id;
      dispatch(fetchRoomByIdAction(numberId));
      dispatch(fetchRoomByIdNearbyAction(numberId));
      dispatch(fetchRoomByIdComments(numberId));
    }
  }, [id]);
  const roomData = useAppSelector((state) => state.currentRoom.room);
  const nearbyRooms = useAppSelector((state) => state.currentRoom.nearby);
  const comments = useAppSelector((state) => state.currentRoom.comments);

  const [mapPoints, setMapPoints] = useState<Location[]>([]);

  useEffect(() => {
    const points : Location[] = [];
    nearbyRooms.forEach((room) => points.push(room.location));
    if (roomData) {
      points.push(roomData.location);
    }
    setMapPoints(points);
  }, [nearbyRooms, roomData]);

  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  return roomData === null && isRoomLoaded ? (
    <NotFoundScreen />
  ) : (
    <div className="page">

      <Header />

      { roomData && isRoomLoaded ? (
        <main className="page__main page__main--property">

          <section className="property">
            <div className="property__gallery-container container">
              <div className="property__gallery">

                {roomData.images.map((image, index) => {
                  if (index < 6) {
                    return (
                      <div key={image} className="property__image-wrapper">
                        <img className="property__image" src={image} alt="studio" />
                      </div>
                    );
                  }
                }
                )}

              </div>
            </div>
            <div className="property__container container">
              <div className="property__wrapper">
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
                <section className="property__reviews reviews">
                  {comments ? (
                    <ReviewsList comments={comments}/>
                  ) : (
                    <p>There are no comments on this page yet</p>
                  )}
                  {authorizationStatus === AuthorizationStatus.Auth && id && <ReviewsForm id={+id} />}
                </section>
              </div>
            </div>
            <section className="property__map map">
              <Map city={roomData.city.location} points={mapPoints} selectedPoint={roomData.location}></Map>
            </section>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <div className="near-places__list places__list">
                <PlaceCardsList rooms={nearbyRooms} />
              </div>
            </section>
          </div>
        </main>
      ) : (
        <div style={{width: '100%', height: 'calc(100vh - 80px)', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Loader/>
        </div>
      )}

    </div>
  );
}

export default RoomScreen;
