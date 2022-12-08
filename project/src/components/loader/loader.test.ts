import Loader from './loader';
import { render, screen } from '@testing-library/react';

describe('loader component', () => {

  it('should render "Loader" component', () => {
    render(Loader());

    expect(screen.getByTestId('loader-element')).toBeInTheDocument();
  });

});
