import { useParams } from 'react-router-dom';

import NotFoundScreen from '../not-found-screen/not-found-screen';
import Header from '../../components/header/header';
import PlaceCardsList from '../../components/place-cards-list/place-cards-list';
import Map from '../../components/map/map';

import { fetchRoomById, fetchCommentsInRoomById, fetchNearbyInRoomById } from '../../store/api-actions';

import { Location } from '../../types/types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Loader from '../../components/loader/loader';
import { useEffect } from 'react';
import RoomInfo from '../../components/room-info/room-info';
import { getCurrentRoom, getIsRoomByIdLoading } from '../../store/data-process/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import Reviews from '../../components/reviews/reviews';

function RoomScreen() {

  const dispatch = useAppDispatch();
  const isRoomLoading = useAppSelector(getIsRoomByIdLoading);

  const { id } = useParams();
  useEffect(() => {
    let isMounted = true;

    if (id && isMounted) {
      const numberId = +id;
      dispatch(fetchRoomById(numberId));
      dispatch(fetchNearbyInRoomById(numberId));
      dispatch(fetchCommentsInRoomById(numberId));
    }

    return () => { isMounted = false; };
  }, [id]);

  const { room, nearby } = useAppSelector(getCurrentRoom);

  const mapPoints: Location[] = [];
  nearby.forEach((roomItem) => mapPoints.push(roomItem.location));
  if (room) {
    mapPoints.push(room.location);
  }

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const MAX_PHOTOS_NUMBER = 6;

  return room === null && !isRoomLoading ? ( <NotFoundScreen /> ) : (

    <div className="page">

      <Header />

      <h1 className='visually-hidden'>Personal room offer</h1>

      { room && !isRoomLoading ? (

        <main className="page__main page__main--property">

          <section className="property">
            <div className="property__gallery-container container">
              <div className="property__gallery">

                { room.images.map((image, index) => {
                  if (index < MAX_PHOTOS_NUMBER) {
                    return (
                      <div key={image} className="property__image-wrapper">
                        <img className="property__image" src={image} alt="studio" />
                      </div>
                    );
                  }
                }) }

              </div>
            </div>
            <div className="property__container container">
              <div className="property__wrapper">

                <RoomInfo roomData={room} />
                <Reviews id={id} authorizationStatus={authorizationStatus} />

              </div>
            </div>
            <section className="property__map map">

              <Map city={room.city.location} points={mapPoints} selectedPoint={room.location}></Map>

            </section>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <div className="near-places__list places__list">

                <PlaceCardsList rooms={nearby} />

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
