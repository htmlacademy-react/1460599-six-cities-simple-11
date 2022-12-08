import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/index';

import { SortOptions } from '../../const';
import { getCurrentSortOption } from '../../store/room-process/selectors';
import { setCurrentSortOption } from '../../store/room-process/room-process';

function PlacesSort() {

  const curretSortOption = useAppSelector(getCurrentSortOption);
  const dispatch = useAppDispatch();

  const [isOptionsOpened, setIsOptionsOpened] = useState(false);

  const handlePlaceOptionClick = (value: string) => {
    dispatch(setCurrentSortOption(value));
    setIsOptionsOpened(false);
  };

  const SortOptionsArray = Object.values(SortOptions);

  return (
    <form className="places__sorting" action="#" method="get" data-testid="places-sort-element">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={() => {setIsOptionsOpened(!isOptionsOpened);}}>
        {curretSortOption}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOptionsOpened ? 'places__options--opened' : ''}`}>
        { SortOptionsArray.map((option) => (
          <li
            key={option}
            className={`places__option ${curretSortOption === option ? 'places__option--active' : ''} `}
            tabIndex={0}
            onClick={() => {handlePlaceOptionClick(option);}}
          >
            {option}
          </li>
        ))};
      </ul>
    </form>
  );
}

export default PlacesSort;
