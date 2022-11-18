import { useParams } from 'react-router-dom';

import NotFoundScreen from '../not-found-screen/not-found-screen';
import Header from '../../components/header/header';
import ReviewsForm from '../../components/reviews-form/reviews-form';
import ReviewsList from '../../components/reviews-list/reviews-list';
import PlaceCardsList from '../../components/place-cards-list/place-cards-list';
import Map from '../../components/map/map';

import { RATING_MULTIIER_FOR_STYLES } from '../../consts';
import { mocks } from '../../mocks/offer';
import { comments } from '../../mocks/comments';

import { Location } from '../../types/types';

function RoomScreen() {
  const { id } = useParams();
  const roomData = mocks.find((mock) => mock.id === Number(id));

  const tempPoints : Location[] = [];
  mocks.forEach((room) => tempPoints.push(room.location));

  return roomData ? (
    <div className="page">

      <Header />

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
                <span className="property__rating-value rating__value">4.8</span>
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
                <ReviewsList comments={comments}/>
                <ReviewsForm />
              </section>
            </div>
          </div>
          <section className="property__map map">
            <Map city={mocks[0].city.location} points={tempPoints}></Map>
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <PlaceCardsList rooms={mocks} />
            </div>
          </section>
        </div>
      </main>

    </div>

  ) : (<NotFoundScreen />);
}

export default RoomScreen;
