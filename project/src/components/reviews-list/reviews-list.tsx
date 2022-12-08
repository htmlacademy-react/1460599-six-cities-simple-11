import ReviewsItem from '../reviews-item/reviews-item';

import { Comment } from '../../types/types';
import { useEffect, useState } from 'react';

type ReviewsListType = {
  comments: Comment[];
}

function ReviewsList({comments} : ReviewsListType) {

  const MAX_NUMBER_OF_COMMENTS = 10;

  const [lastComments, setLastComments] = useState<Comment[]>([]);

  useEffect(() => {
    const commentsArray = [...comments];
    const reversedComments = commentsArray.reverse();
    setLastComments([...reversedComments]);
  }, [comments]);

  return (
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{lastComments.length}</span></h2>
      <ul className="reviews__list" data-testid="reviews-list-element">
        {lastComments.map((comment, index) => {
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
