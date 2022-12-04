import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/index';

import { SORT_OPTIONS } from '../../consts';
import { getCurrentSortOption } from '../../store/room-process/selectors';
import { setCurrentSortOption } from '../../store/room-process/room-process';

function PlacesSort() {

  const curretSortOption = useAppSelector(getCurrentSortOption);
  const dispatch = useAppDispatch();

  const [isOptionsOpened, setIsOptionsOpened] = useState(false);

  const placeOptionClickHandle = (value: string) => {
    dispatch(setCurrentSortOption(value));
    setIsOptionsOpened(false);
  };


  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={() => {setIsOptionsOpened(!isOptionsOpened);}}>
        {curretSortOption}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOptionsOpened ? 'places__options--opened' : ''}`}>
        { SORT_OPTIONS.map((option: string) => (
          <li
            key={option}
            className={`places__option ${curretSortOption === option ? 'places__option--active' : ''} `}
            tabIndex={0}
            onClick={() => {placeOptionClickHandle(option);}}
          >
            {option}
          </li>
        ))};
      </ul>
    </form>
  );
}

export default PlacesSort;
