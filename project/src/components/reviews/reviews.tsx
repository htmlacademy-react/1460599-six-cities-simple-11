import { useAppSelector } from '../../hooks';
import { getCurrentRoom } from '../../store/data-process/selectors';

import ReviewsList from '../reviews-list/reviews-list';
import ReviewsForm from '../reviews-form/reviews-form';

import { AuthorizationStatus } from '../../const';

type ReviewsType = {
  id: string | undefined;
  authorizationStatus: string;
}

function Reviews({ id, authorizationStatus }: ReviewsType) {

  const { comments } = useAppSelector(getCurrentRoom);

  return (
    <section className="property__reviews reviews" data-testid="reviews-element">

      { comments ? (
        <ReviewsList comments={comments}/>
      ) : (
        <p>There are no comments on this page yet</p>
      ) }

      { authorizationStatus === AuthorizationStatus.Auth && id && <ReviewsForm id={+id} /> }

    </section>
  );
}

export default Reviews;
