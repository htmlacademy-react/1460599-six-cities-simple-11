import ReviewsItem from '../reviews-item/reviews-item';

import { Comment } from '../../types/types';

type ReviewsListType = {
  comments: Comment[];
}

function ReviewsList({comments} : ReviewsListType) {
  return (
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
      <ul className="reviews__list">
        {comments.map((comment) => (
          <ReviewsItem key={comment.id} comment={comment} />
        ))}
      </ul>
    </>
  );
}

export default ReviewsList;
