import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import leaflet from 'leaflet';
import useMap from '../../hooks/use-map/use-map';

import { Location } from '../../types/types';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../consts';

type MapProps = {
  city: Location;
  points: Location[];
  selectedPoint?: Location | null;
}

function Map({city, points, selectedPoint} : MapProps) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  const defaultCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_DEFAULT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const currentCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_CURRENT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  useEffect(() => {
    if (map) {
      points.forEach((point) => {
        if (selectedPoint && selectedPoint === point) {
          leaflet
            .marker({
              lat: point.latitude,
              lng: point.longitude,
            }, {
              icon: currentCustomIcon
            })
            .addTo(map);
        } else {

          leaflet
            .marker({
              lat: point.latitude,
              lng: point.longitude,
            }, {
              icon: defaultCustomIcon
            })
            .addTo(map);
        }
      });
    }
  }, [map, points, selectedPoint]);

  useEffect(() => {
    if (map) {
      map.flyTo([city.latitude, city.longitude], city.zoom);
    }
  }, [city, map]);

  return (
    <div
      style={{height: '100%'}}
      ref={mapRef}
    >
    </div>
  );
}

export default Map;

