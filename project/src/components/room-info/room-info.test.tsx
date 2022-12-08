import { render, screen } from '@testing-library/react';
import { mocks } from '../../mocks/offer';
import RoomInfo from './room-info';

describe('Room info component', () => {

  it('should render "RoomInfo"', () => {

    render(RoomInfo({roomData: mocks[0]}));

    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
  });

});
