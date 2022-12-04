import { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks';
import { getActiveRoomId } from '../../store/room-process/selectors';
import { Location, Room } from '../../types/types';

import Map from '../map/map';

type CitiesMapType = {
  currentCityRooms: Room[];
}

function CitiesMap ({currentCityRooms}: CitiesMapType) {

  const activeRoomId = useAppSelector(getActiveRoomId);
  const [activeRoomLocation, setActiveRoomLocation] = useState<Location | null>(null);

  useEffect(() => {
    if (activeRoomId) {
      const selectedRoom = currentCityRooms?.find((room) => room.id === activeRoomId);
      if (selectedRoom) {
        setActiveRoomLocation(selectedRoom.location);
      }
    } else {
      setActiveRoomLocation(null);
    }
  }, [activeRoomId, currentCityRooms]);

  const [mapPoints, setMapPoints] = useState<Location[]>([]);
  const [currentCityLocation, setCurrentCityLocation] = useState<Location | null>(null);

  useEffect(() => {
    const points: Location[] = [];
    currentCityRooms?.forEach((room) => points.push(room.location));
    setMapPoints(points);
    if (currentCityRooms && currentCityRooms[0]) {
      setCurrentCityLocation(currentCityRooms[0].city.location);
    } else {
      setCurrentCityLocation(null);
    }
  }, [currentCityRooms]);

  return (
    <div className="cities__right-section">
      <section className="cities__map map">
        { currentCityRooms && currentCityLocation && <Map city={currentCityLocation} points={mapPoints} selectedPoint={activeRoomLocation} /> }
      </section>
    </div>
  );
}

export default CitiesMap;
