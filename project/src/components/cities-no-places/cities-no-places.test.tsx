import CitiesNoPlaces from './cities-no-places';
import { render, screen } from '@testing-library/react';

describe('Cities no places component', () => {

  it('should render "CitiesNoPlaces" component', () => {
    render(CitiesNoPlaces());

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
  });

});
