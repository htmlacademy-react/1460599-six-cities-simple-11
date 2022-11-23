import { SyntheticEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postCommentByRoomId } from '../../store/api-actions';
import Loader from '../loader/loader';

type ReviewsFormType = {
  id: number;
};

function ReviewsForm({id}: ReviewsFormType) {

  const dispatch = useAppDispatch();
  const isFormLoading = useAppSelector((state) => state.isFormLoading);

  const [reviewFormData, setReviewFormData] = useState({
    rating: 0,
    comment: ''
  });

  const handleReviewFormOnchange = (evt: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = evt.target;
    if (name === 'rating') {
      setReviewFormData({...reviewFormData, [name]: +value});
    } else {setReviewFormData({...reviewFormData, [name]: value});}
  };

  const [isSumbitDisabled, setIsSumbitDisabled] = useState(true);

  const formDataValidate = () => {
    if (reviewFormData.rating === 0) {return true;}
    if (reviewFormData.comment.length < 50) {return true;}
    return false;
  };

  useEffect(() => {
    setIsSumbitDisabled(formDataValidate());
  }, [reviewFormData]);

  const onClickSubmitButton = (evt: SyntheticEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatch(postCommentByRoomId({id, commentData: reviewFormData}));
  };

  return(
    <form className="reviews__form form" style={{position: 'relative'}}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="5"
          id="5-stars"
          type="radio"
          onChange={handleReviewFormOnchange}
          checked={reviewFormData.rating === 5}
        />
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="4"
          id="4-stars"
          type="radio"
          onChange={handleReviewFormOnchange}
          checked={reviewFormData.rating === 4}
        />
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="3"
          id="3-stars"
          type="radio"
          onChange={handleReviewFormOnchange}
          checked={reviewFormData.rating === 3}
        />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="2"
          id="2-stars"
          type="radio"
          onChange={handleReviewFormOnchange}
          checked={reviewFormData.rating === 2}
        />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="1"
          id="1-star"
          type="radio"
          onChange={handleReviewFormOnchange}
          checked={reviewFormData.rating === 1}
        />
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="comment"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleReviewFormOnchange}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
        To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isSumbitDisabled}
          onClick={onClickSubmitButton}
        >
          Submit
        </button>
      </div>
      {isFormLoading && (
        <div style={{position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(255, 255, 255, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Loader/>
        </div>
      )}
    </form>

  );
}

export default ReviewsForm;
