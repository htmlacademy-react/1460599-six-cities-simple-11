import ReviewsItem from '../reviews-item/reviews-item';
import { Comment } from '../../types/types';

type ReviewsListType = {
  comments: Comment[];
}

function ReviewsList({comments} : ReviewsListType) {

  const lastReviews = [...comments].reverse();
  const MAX_NUMBER_OF_COMMENTS = 10;

  return (
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{lastReviews.length}</span></h2>
      <ul className="reviews__list" data-testid="reviews-list-element">
        {lastReviews.map((comment, index) => {
          if (index < MAX_NUMBER_OF_COMMENTS) {
            return (
              <ReviewsItem key={comment.id} comment={comment} />
            );
          }
        })}
      </ul>
    </>
  );
}

export default ReviewsList;
