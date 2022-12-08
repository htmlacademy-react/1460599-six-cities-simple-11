import { MutableRefObject } from 'react';
import { renderHook } from '@testing-library/react';
import { Map } from 'leaflet';
import useMap from './use-map';

import { mocks } from '../../mocks/offer';

const mapContainer: MutableRefObject<HTMLElement | null> = {current: document.createElement('div')};

describe('Hook: useMap', () => {
  it('should return object type of Map', () => {
    const {result} = renderHook(() => useMap(mapContainer, mocks[0].city.location));

    const map = result.current;

    expect(map).toBeInstanceOf(Map);
  });
});
