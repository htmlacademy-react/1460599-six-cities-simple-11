import React, { SyntheticEvent, useEffect, useState } from 'react';
import Loader from '../loader/loader';
import { CommentLength } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postCommentInRoomById } from '../../store/api-actions';
import { getIsFormLoading } from '../../store/data-process/selectors';
import { toast } from 'react-toastify';

type ReviewsFormType = {
  id: number;
};

function ReviewsForm({id}: ReviewsFormType) {

  const dispatch = useAppDispatch();
  const isFormLoading = useAppSelector(getIsFormLoading);

  const initialReviewFormData = {
    rating: 0,
    comment: ''
  };

  const [reviewFormData, setReviewFormData] = useState(initialReviewFormData);

  const handleReviewFormOnchange = (evt: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = evt.target;
    if (name === 'rating') {
      setReviewFormData({...reviewFormData, [name]: +value});
    } else {setReviewFormData({...reviewFormData, [name]: value});}
  };

  const [isSumbitDisabled, setIsSumbitDisabled] = useState(true);

  const formDataValidate = () => {
    if (reviewFormData.rating === 0) {return true;}
    if (reviewFormData.comment.length < CommentLength.Min) {return true;}
    if (reviewFormData.comment.length > CommentLength.Max) {return true;}
    return false;
  };

  useEffect(() => {
    setIsSumbitDisabled(formDataValidate());
  }, [reviewFormData]);

  const handleSubmitButtonClick = (evt: SyntheticEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setIsSumbitDisabled(true);
    dispatch(postCommentInRoomById({id, commentData: reviewFormData}))
      .unwrap()
      .then(() => {setReviewFormData(initialReviewFormData);})
      .catch(() => {toast.warn('Oh no! Review was not sent, please try again later :|');})
      .finally(() => {setIsSumbitDisabled(false);});
  };

  const NUMBER_OF_STARS = 5;
  const radioStars = Array.from({length: NUMBER_OF_STARS});

  return(
    <form className="reviews__form form" style={{position: 'relative'}} data-testid="reviews-form-element">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">

        { radioStars.map((star, index, arr) => {
          const starValue = arr.length - index;
          return (
            <React.Fragment key={starValue}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                value={starValue}
                id={`${starValue}-stars`}
                type="radio"
                onChange={handleReviewFormOnchange}
                checked={reviewFormData.rating === starValue}
                disabled={isFormLoading}
              />
              <label htmlFor={`${starValue}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </React.Fragment>
          );
        }) }

      </div>

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="comment"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleReviewFormOnchange}
        value={reviewFormData.comment}
        disabled={isFormLoading}
        data-testid="textarea-element"
      />

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
        To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>

        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isSumbitDisabled}
          onClick={handleSubmitButtonClick}
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
