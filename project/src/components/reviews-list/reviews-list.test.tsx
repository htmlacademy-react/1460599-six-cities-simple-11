import ReviewsList from './reviews-list';
import { render, screen } from '@testing-library/react';
import { comments } from '../../mocks/comments';

describe('Reviews List component', () => {

  it('should render "ReviewsList" component', () => {
    render(ReviewsList({comments: comments}));

    expect(screen.getByTestId('reviews-list-element')).toBeInTheDocument();
  });

});
