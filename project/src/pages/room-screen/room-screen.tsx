import { useParams } from 'react-router-dom';

import NotFoundScreen from '../not-found-screen/not-found-screen';
import Header from '../../components/header/header';
import ReviewsForm from '../../components/reviews-form/reviews-form';
import ReviewsList from '../../components/reviews-list/reviews-list';
import PlaceCardsList from '../../components/place-cards-list/place-cards-list';
import Map from '../../components/map/map';

import { AuthorizationStatus } from '../../consts';
import { fetchRoomById, fetchCommentsInRoomById, fetchNearbyInRoomById } from '../../store/api-actions';

import { Location } from '../../types/types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Loader from '../../components/loader/loader';
import { useEffect, useState } from 'react';
import RoomInfo from '../../components/room-info/room-info';
import { getCurrentRoom, getIsRoomByIdLoading } from '../../store/data-process/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

function RoomScreen() {

  const dispatch = useAppDispatch();
  const isRoomLoading = useAppSelector(getIsRoomByIdLoading);

  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const numberId = +id;
      dispatch(fetchRoomById(numberId));
      dispatch(fetchNearbyInRoomById(numberId));
      dispatch(fetchCommentsInRoomById(numberId));
    }
  }, [id]);

  const { room, nearby, comments } = useAppSelector(getCurrentRoom);

  const [mapPoints, setMapPoints] = useState<Location[]>([]);

  useEffect(() => {
    const points : Location[] = [];
    nearby.forEach((roomItem) => points.push(roomItem.location));
    if (room) {
      points.push(room.location);
    }
    setMapPoints(points);
  }, [nearby, room]);

  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return room === null && !isRoomLoading ? ( <NotFoundScreen /> ) : (

    <div className="page">

      <Header /> 

      { room && !isRoomLoading ? (

        <main className="page__main page__main--property">

          <section className="property">
            <div className="property__gallery-container container">
              <div className="property__gallery">

                { room.images.map((image, index) => {
                  if (index < 6) {
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

                <section className="property__reviews reviews">

                  { comments ? (
                    <ReviewsList comments={comments}/>
                  ) : (
                    <p>There are no comments on this page yet</p>
                  ) }

                  { authorizationStatus === AuthorizationStatus.Auth && id && <ReviewsForm id={+id} /> }

                </section>
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
