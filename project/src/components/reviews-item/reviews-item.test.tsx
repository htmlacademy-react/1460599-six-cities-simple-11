import ReviewsItem from './reviews-item';
import { render, screen } from '@testing-library/react';
import { comments } from '../../mocks/comments';

describe('Reviews Item component', () => {

  it('should render "ReviewsItem" component', () => {
    render(ReviewsItem({comment: comments[0]}));

    expect(screen.getByText(`${comments[0].comment}`)).toBeInTheDocument();
  });

});
